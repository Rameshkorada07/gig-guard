import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Admin = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/api/admin/stats`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load stats");
        setStats(data);
      } catch (err: any) {
        toast.error(err.message || "Admin fetch error");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container max-w-4xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Quick metrics for user base and claims.</p>
          </div>
          <Button size="sm" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-primary/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold">{stats?.totalUsers ?? "-"}</p>
          </div>
          <div className="bg-slate-900 border border-primary/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Active Policies</p>
            <p className="text-3xl font-bold">{stats?.activePolicies ?? "-"}</p>
          </div>
          <div className="bg-slate-900 border border-primary/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Claims</p>
            <p className="text-3xl font-bold">{stats?.totalClaims ?? "-"}</p>
          </div>
          <div className="bg-slate-900 border border-primary/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Flagged Claims</p>
            <p className="text-3xl font-bold">{stats?.flaggedClaims ?? "-"}</p>
          </div>
        </div>

        {loading && <p className="text-muted-foreground">Loading...</p>}
      </div>
    </div>
  );
};

export default Admin;
