import { Video, Film, Camera, Mic } from "lucide-react";

const services = [
  { icon: Video, title: "Short Videos", description: "Professional corporate content that elevates your brand presence.", price: "From $299" },
  { icon: Film, title: "Music Videos", description: "Creative direction and cinematic production for artists.", price: "From $499" },
  { icon: Camera, title: "Event Coverage", description: "Multi-camera event filming with same-day highlights.", price: "From $399" },
  { icon: Mic, title: "Interviews & Podcasts", description: "Studio-quality recording with professional lighting.", price: "From $199" },
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">What We Offer</p>
        <h2 className="text-4xl md:text-5xl font-heading font-bold">Our Services</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="glass-card rounded-xl p-6 hover:border-primary/40 transition-all duration-300 group animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{s.description}</p>
            <p className="text-primary font-semibold">{s.price}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
