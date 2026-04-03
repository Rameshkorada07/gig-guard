import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import WhyGigGuard from "@/components/landing/WhyGigGuard";
import ExampleScenario from "@/components/landing/ExampleScenario";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Problem />
    <Solution />
    <HowItWorks />
    <Features />
    <WhyGigGuard />
    <ExampleScenario />
    <CTA />
    <Footer />
  </div>
);

export default Index;
