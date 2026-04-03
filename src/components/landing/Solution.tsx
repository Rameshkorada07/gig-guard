import { CalendarDays, ScanSearch, Brain, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const items = [
  { icon: CalendarDays, title: "Weekly Plans", desc: "Pay weekly, stay protected weekly. No long lock-ins." },
  { icon: ScanSearch, title: "Auto Detection", desc: "We detect disruptions automatically — no manual filing." },
  { icon: Brain, title: "AI Risk Engine", desc: "Smart algorithms personalize your coverage." },
  { icon: Zap, title: "Instant Payouts", desc: "Estimated payouts the moment a disruption is detected." },
];

const Solution = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="container" ref={ref}>
        {/* Hero feature + supporting features layout */}
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">The Solution</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Protection that actually works for you
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.3fr,1fr] gap-6">
            {/* Large hero feature card */}
            <div
              className={`row-span-2 rounded-2xl border border-primary/20 bg-card p-8 md:p-10 flex flex-col justify-between glow-border transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
            >
              <div>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">AI-Powered Risk Assessment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI engine analyzes weather patterns, traffic data, air quality indices, and platform status in real-time to calculate your exact risk level and protection needs.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">&lt;5min</p>
                  <p className="text-xs text-muted-foreground">Detection</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-xs text-muted-foreground">Monitoring</p>
                </div>
              </div>
            </div>

            {/* Stacked supporting features */}
            {items.filter(i => i.icon !== Brain).map((item, i) => (
              <div
                key={item.title}
                className={`flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: isVisible ? `${i * 120 + 300}ms` : "0ms" }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
