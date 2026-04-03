import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const planMap = {
  starter: { label: "Starter", premium: 29, coverage: 10 },
  standard: { label: "Standard", premium: 49, coverage: 20 },
  pro: { label: "Pro", premium: 79, coverage: 40 },
};

const events = [
  { key: "rain", label: "Heavy Rain" },
  { key: "heat", label: "Extreme Heat" },
  { key: "aqi", label: "High AQI" },
  { key: "traffic", label: "Traffic slowdown" },
  { key: "outage", label: "Platform outage" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [policy, setPolicy] = useState<any>(null);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gigguard-user");
    const token = localStorage.getItem("gigguard-token");
    if (!stored || !token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
    loadPolicyAndClaims(token);
  }, [navigate]);

  const profile = useMemo(() => {
    if (!user) return null;
    return user.riskProfile;
  }, [user]);

  const getAuthHeader = () => {
    const token = localStorage.getItem("gigguard-token");
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  };

  async function loadPolicyAndClaims(token: string) {
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
    try {
      const [policyResp, claimsResp] = await Promise.all([
        fetch(`${apiBase}/api/policy/`, { headers }).then((res) => res.json()),
        fetch(`${apiBase}/api/claims/`, { headers }).then((res) => res.json()),
      ]);
      setPolicy(policyResp.policy);
      setClaims(claimsResp.claims || []);
    } catch (error) {
      console.error("Error loading policy/claims:", error);
    }
  }

  const activatePlan = async (plan: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const resp = await fetch(`${apiBase}/api/policy/activate`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ plan, weatherForecast: "rain", pastDisruption: 1 }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to activate plan");
      setPolicy(data.policy);
      const updated = { ...user, riskProfile: data.riskProfile };
      setUser(updated);
      localStorage.setItem("gigguard-user", JSON.stringify(updated));
      toast.success(`${planMap[plan as keyof typeof planMap].label} activated`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Policy activation failed");
    } finally {
      setLoading(false);
    }
  };

  const triggerEvent = async (eventKey: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const resp = await fetch(`${apiBase}/api/claims/trigger/${eventKey}?zone=${user.zone}`);
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Trigger failed");
      const token = localStorage.getItem("gigguard-token");
      if (token) {
        const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
        const claimsResp = await fetch(`${apiBase}/api/claims/`, { headers }).then((res) => res.json());
        setClaims(claimsResp.claims || []);
      }
      toast.success(`${events.find((e) => e.key === eventKey)?.label} detected, claims created: ${data.createdClaims}`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Trigger failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("gigguard-user");
    localStorage.removeItem("gigguard-token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!user) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container max-w-6xl space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "User"}</p>
          </div>
          <div className="space-x-2">
            <Button size="sm" onClick={() => navigate("/admin")}>Admin Panel</Button>
            <Button size="sm" variant="destructive" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-xl border border-primary/30 p-5">
            <h2 className="text-xl font-semibold mb-3">Risk Scoring Engine</h2>
            <p>Zone selected: {user?.zone}</p>
            <p>Risk Score: {profile?.score ?? "—"}</p>
            <p>Recommended Premium: ₹{profile?.recommendedPremium ?? "—"}</p>
            {profile?.warning ? <p className="text-amber-300">Warning: {profile.warning}</p> : null}
          </div>

          <div className="bg-slate-900 rounded-xl border border-primary/30 p-5">
            <h2 className="text-xl font-semibold mb-3">Active Policy</h2>
            {policy ? (
              <div className="space-y-1">
                <p>Plan: {policy.plan}</p>
                <p>Premium: ₹{policy.premium}</p>
                <p>Coverage: {policy.coverageHours} hrs/week</p>
                <p>Status: {policy.active ? "Active" : "Paused"}</p>
                <p>Activated at: {new Date(policy.activatedAt).toLocaleString()}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">No active plan. Activate below.</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(planMap).map(([key, value]) => (
            <div key={key} className="bg-slate-900 rounded-xl border border-primary/30 p-5">
              <h3 className="font-semibold text-lg">{value.label}</h3>
              <p>Premium ₹{value.premium}</p>
              <p>Coverage {value.coverage} hrs</p>
              <Button size="sm" disabled={loading} onClick={() => activatePlan(key)} className="mt-3">Activate</Button>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-xl border border-primary/30 p-5">
          <h2 className="text-xl font-semibold mb-3">Auto-trigger Claims</h2>
          <p className="text-sm text-muted-foreground">Zero-touch claim flow. No forms or uploads.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
            {events.map((s) => (
              <Button key={s.key} size="sm" onClick={() => triggerEvent(s.key)} disabled={loading}>
                Simulate {s.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-primary/30 p-5">
          <h2 className="text-xl font-semibold mb-3">Claim History</h2>
          {claims.length === 0 ? (
            <p className="text-muted-foreground">No claims yet.</p>
          ) : (
            <div className="space-y-3">
              {claims.map((c: any) => (
                <div key={c._id} className="bg-slate-800 p-3 rounded-md">
                  <p><strong>{c.event}</strong> (status: {c.status})</p>
                  <p>Lost hours: {c.lostHours}, Payout: ₹{c.payout}</p>
                  <p>{new Date(c.createdAt).toLocaleString()}</p>
                  {c.flagged && <p className="text-amber-300">Anti-spoofing: flagged</p>}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
