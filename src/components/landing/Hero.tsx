import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundImage: "var(--gradient-hero)" }}>
    <div className="container text-center py-20 md:py-32">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8 animate-fade-in-up">
        <Shield className="h-4 w-4" />
        AI-Powered Income Protection
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] animate-fade-in-up-delay-1">
        Smart Weekly Income Protection for{" "}
        <span className="text-gradient">Delivery Partners</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-2">
        GigGuard protects your earnings when real-world disruptions stop you from working. No paperwork. No waiting. Just protection.
      </p>

      <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto animate-fade-in-up-delay-2">
        Millions of delivery workers lose daily income due to rain, heat, pollution, or platform outages — with zero safety net. GigGuard changes that.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up-delay-3">
        <Button variant="hero" size="lg" className="text-base px-8 py-6">
          Get Started
        </Button>
        <Button variant="heroOutline" size="lg" className="text-base px-8 py-6" asChild>
          <a href="#how-it-works">View How It Works</a>
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;
