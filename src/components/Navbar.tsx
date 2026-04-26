import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="text-2xl font-heading font-bold text-gradient-gold">
          QuickShoot
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["services", "booking", "reviews"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors capitalize"
            >
              {item}
            </button>
          ))}
          <Link to="/admin">
            <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
              Admin Panel
            </Button>
          </Link>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold" onClick={() => scrollTo("booking")}>
            Book Now
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden glass-card border-t border-border/30 p-4 flex flex-col gap-3">
          {["services", "booking", "reviews"].map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className="text-sm text-muted-foreground hover:text-primary capitalize text-left py-2">
              {item}
            </button>
          ))}
          <Link to="/admin" onClick={() => setIsOpen(false)}>
            <Button variant="outline" size="sm" className="w-full border-primary/30 text-primary">Admin Panel</Button>
          </Link>
          <Button size="sm" className="w-full bg-primary text-primary-foreground" onClick={() => scrollTo("booking")}>Book Now</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
