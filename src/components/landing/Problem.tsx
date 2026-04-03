import { CloudRain, Thermometer, Wind, TrafficCone, WifiOff } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const problems = [
  { icon: CloudRain, label: "Heavy Rain", stat: "30%", note: "orders cancelled" },
  { icon: Thermometer, label: "Extreme Heat", stat: "45°C+", note: "unsafe to ride" },
  { icon: Wind, label: "Poor Air Quality", stat: "AQI 300+", note: "health hazard" },
  { icon: TrafficCone, label: "Traffic Jams", stat: "2-3 hrs", note: "stuck daily" },
  { icon: WifiOff, label: "Platform Downtime", stat: "₹0", note: "zero earnings" },
];

const Problem = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container" ref={ref}>
        {/* Asymmetric split layout — text left, visual right */}
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              When the world stops,{" "}
              <span className="text-destructive">so does your income</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Delivery workers face daily disruptions that wipe out their earnings. Traditional insurance doesn't cover short-term, weather-driven income loss.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              <span>No safety net exists — until now</span>
            </div>
          </div>

          {/* Staggered stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {problems.map((p, i) => (
              <div
                key={p.label}
                className={`relative p-5 rounded-xl border border-border bg-card group hover:border-destructive/40 transition-all duration-500 ${
                  i === 2 ? "sm:col-span-1 col-span-2" : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: isVisible ? `${i * 100 + 200}ms` : "0ms" }}
              >
                <p.icon className="h-5 w-5 text-destructive/70 mb-3 group-hover:text-destructive transition-colors" />
                <p className="text-2xl font-bold text-foreground">{p.stat}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.note}</p>
                <p className="text-xs font-medium text-foreground/70 mt-2">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
