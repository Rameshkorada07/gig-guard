import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const CTA = () => {
  const { ref, isVisible } = useScrollAnimation();
  const token = localStorage.getItem("gigguard-token");

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container" ref={ref}>
        <div
          className={`max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-card p-10 md:p-16 text-center glow-border transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold max-w-xl mx-auto">
            Protect Your <span className="text-gradient">Weekly Income</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Join thousands of delivery partners who never worry about lost earnings again.
          </p>
          {token ? (
            <a href="/dashboard"><Button variant="hero" size="lg" className="mt-8 text-base px-10 py-6">
              Go to Dashboard
            </Button></a>
          ) : (
            <a href="/register"><Button variant="hero" size="lg" className="mt-8 text-base px-10 py-6">
              Sign Up / Get Started
            </Button></a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
