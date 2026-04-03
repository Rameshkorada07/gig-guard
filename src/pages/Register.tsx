import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [zone, setZone] = useState("low_risk");
  const [avgHoursPerDay, setAvgHoursPerDay] = useState(8);
  const [avgWeeklyEarnings, setAvgWeeklyEarnings] = useState(12000);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting registration to:", `${apiBase}/api/auth/register`);
      const response = await fetch(`${apiBase}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password, zone, avgHoursPerDay, avgWeeklyEarnings }),
      });
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      if (!response.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("gigguard-user", JSON.stringify(data.user));
      localStorage.setItem("gigguard-token", data.token);
      toast.success("Registration complete. Risk profile created!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20">
      <div className="container max-w-xl bg-slate-900/80 rounded-2xl p-8 shadow-xl border border-primary/30">
        <h1 className="text-3xl font-bold mb-4">GigGuard Registration</h1>
        <p className="text-sm text-muted-foreground">
          Fast mobile-first onboarding. Submit to create profile + auto risk score.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Work Zone</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="high_risk">High Risk</option>
              <option value="medium_risk">Medium Risk</option>
              <option value="low_risk">Low Risk</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Average working hours/day</label>
            <Input type="number" min={1} max={24} value={avgHoursPerDay} onChange={(e) => setAvgHoursPerDay(Number(e.target.value))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Average weekly earnings (₹)</label>
            <Input type="number" min={1000} value={avgWeeklyEarnings} onChange={(e) => setAvgWeeklyEarnings(Number(e.target.value))} required />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registering..." : "Create Profile"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="text-primary hover:underline">Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
