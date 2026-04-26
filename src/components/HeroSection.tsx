import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Professional video production studio"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4 animate-fade-up">
          Professional Video Production
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Capture Your
          <span className="block text-gradient-gold">Vision</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Book premium video sessions with top-rated professionals. From corporate to creative — we bring your story to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold text-lg px-8 py-6" onClick={scrollToBooking}>
            Book a Session
          </Button>
          <Button size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 text-lg px-8 py-6" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            View Services
          </Button>
        </div>
      </div>

      <button onClick={scrollToBooking} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce">
        <ArrowDown size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
