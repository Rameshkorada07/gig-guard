import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  { num: "01", title: "Register & Set Profile", desc: "Sign up and tell us your work zone, platform, and schedule." },
  { num: "02", title: "Get Your Weekly Plan", desc: "Receive a personalized protection plan based on your risk profile." },
  { num: "03", title: "We Monitor Disruptions", desc: "Our system tracks weather, air quality, traffic, and platform status in real-time." },
  { num: "04", title: "Automatic Claim & Payout", desc: "When you're affected, claims are triggered automatically — no paperwork needed." },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="py-20 md:py-28 overflow-hidden">
      <div className="container" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold">Four simple steps</h2>
        </div>

        {/* Vertical timeline layout */}
        <div className="max-w-2xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-2">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative flex gap-6 md:gap-8 items-start pl-0 transition-all duration-600 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
                style={{ transitionDelay: isVisible ? `${i * 150 + 200}ms` : "0ms" }}
              >
                {/* Step number on timeline */}
                <div className="relative z-10 flex-shrink-0 h-12 w-12 md:h-16 md:w-16 rounded-full border-2 border-primary/40 bg-background flex items-center justify-center">
                  <span className="text-primary font-mono font-bold text-sm md:text-base">{step.num}</span>
                </div>

                {/* Content */}
                <div className="pb-10 pt-2">
                  <h3 className="font-semibold text-lg mb-1.5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
