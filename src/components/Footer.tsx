import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border/30">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-heading font-bold text-gradient-gold mb-3">QuickShoot</h3>
          <p className="text-muted-foreground text-sm">Premium video production services for every occasion.</p>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><Mail size={14} className="text-primary" /> noreply@quickshoot.com</p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><Phone size={14} className="text-primary" /> +91 0987654321</p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={14} className="text-primary" /> Jalandhar,punjab,India</p>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold mb-2">Hours</h4>
          <p className="text-sm text-muted-foreground">Mon – Fri: 9am – 7pm</p>
          <p className="text-sm text-muted-foreground">Sat: 10am – 5pm</p>
          <p className="text-sm text-muted-foreground">Sun: By appointment</p>
        </div>
      </div>
      <div className="border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} QuickShoot. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
