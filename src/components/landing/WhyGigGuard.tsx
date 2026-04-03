import { Clock, FileX, Zap, Bike, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const reasons = [
  { icon: Clock, title: "Weekly, Not Yearly", desc: "Pay only for the weeks you work." },
  { icon: FileX, title: "Zero Paperwork", desc: "Everything is automated." },
  { icon: Zap, title: "Fast & Automatic", desc: "Claims processed instantly." },
  { icon: Bike, title: "Built for Riders", desc: "Purpose-built for delivery partners." },
  { icon: Globe, title: "100% Web-Based", desc: "No app download required." },
];

const WhyGigGuard = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container" ref={ref}>
        {/* Right-aligned heading with horizontal icon strip below */}
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="md:max-w-md">
              <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Why GigGuard</p>
              <h2 className="text-3xl md:text-4xl font-bold">Built for the way you work</h2>
            </div>
            <p className="text-muted-foreground md:max-w-sm md:text-right">
              Traditional insurance wasn't designed for gig workers. GigGuard is different.
            </p>
          </div>
        </div>

        {/* Full-width horizontal scrolling strip on mobile, row on desktop */}
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className={`flex-shrink-0 w-48 md:w-auto p-6 rounded-xl border border-border bg-card text-center hover:border-primary/30 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isVisible ? `${i * 100 + 200}ms` : "0ms" }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGigGuard;
