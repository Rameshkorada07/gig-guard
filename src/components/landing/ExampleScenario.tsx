import { CloudRain, TrendingDown, Wallet, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ExampleScenario = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 bg-secondary/30 overflow-hidden">
      <div className="container" ref={ref}>
        {/* Side-by-side: narrative left, visual right */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr,1.4fr] gap-12 lg:gap-16 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">See It In Action</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From disruption to payout in <span className="text-primary">minutes</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Here's what happens when heavy rain hits your delivery zone. No claim forms, no phone calls — everything is automatic.
            </p>
          </div>

          {/* Vertical flow card */}
          <div
            className={`rounded-2xl border border-primary/20 bg-card p-6 md:p-8 glow-border transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
          >
            <div className="space-y-0">
              {[
                {
                  icon: CloudRain,
                  label: "Disruption Detected",
                  detail: "Heavy rain in your area for 2+ hours",
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  icon: TrendingDown,
                  label: "Income Loss Estimated",
                  detail: "₹200 potential earnings affected",
                  color: "text-destructive",
                  bg: "bg-destructive/10",
                },
                {
                  icon: Wallet,
                  label: "Instant Payout",
                  detail: "₹200 credited automatically",
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
              ].map((step, i, arr) => (
                <div key={step.label}>
                  <div className="flex items-center gap-4 py-4">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-xl ${step.bg} flex items-center justify-center`}>
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.detail}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex items-center gap-4 py-1">
                      <div className="flex-shrink-0 w-12 flex justify-center">
                        <ChevronRight className="h-4 w-4 text-muted-foreground rotate-90" />
                      </div>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                <span className="text-primary font-semibold">Fully automatic</span> — powered by real-time data
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleScenario;
