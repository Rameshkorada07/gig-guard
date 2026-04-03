import { UserPlus, LayoutDashboard, ShieldCheck, Bell, CreditCard, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const features = [
  { icon: UserPlus, title: "Worker Onboarding", desc: "Simple registration with work profile setup", size: "normal" },
  { icon: LayoutDashboard, title: "Policy Dashboard", desc: "View and manage your active protection plans", size: "wide" },
  { icon: ShieldCheck, title: "Coverage Visualization", desc: "See what you're covered for at a glance", size: "normal" },
  { icon: Bell, title: "Disruption Alerts", desc: "Real-time notifications for events in your area", size: "normal" },
  { icon: CreditCard, title: "Claim & Payout Tracking", desc: "Track claims and payouts transparently", size: "normal" },
  { icon: BarChart3, title: "Admin Analytics", desc: "Powerful dashboards for partners and admins", size: "wide" },
];

const Features = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="container" ref={ref}>
        {/* Left-aligned heading with accent line */}
        <div className={`max-w-4xl mx-auto mb-14 flex items-end gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need,<br />nothing you don't</h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-border mb-2" />
        </div>

        {/* Bento grid layout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-500 group ${
                f.size === "wide" ? "sm:col-span-2 lg:col-span-2" : ""
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{ transitionDelay: isVisible ? `${i * 80 + 150}ms` : "0ms" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
