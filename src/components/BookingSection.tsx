import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveBooking, type Booking } from "@/utils/bookings";

const BookingSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.date) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    toast({ title: "Booking Submitted! 🎬", description: "We'll get back to you shortly. Check the admin panel for updates." });
    setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" });
  };

  return (
    <section id="booking" className="py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">Book a Session</h2>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5 glow-gold">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50 border-border/50 focus:border-primary" />
            <Input placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background/50 border-border/50 focus:border-primary" />
          </div>
          <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background/50 border-border/50 focus:border-primary" />
          <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
            <SelectTrigger className="bg-background/50 border-border/50">
              <SelectValue placeholder="Select Service *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corporate">Short Videos</SelectItem>
              <SelectItem value="music">Music Videos</SelectItem>
              <SelectItem value="event">Event Coverage</SelectItem>
              <SelectItem value="interview">Interviews & Podcasts</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-background/50 border-border/50 focus:border-primary" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
          </div>
          <Textarea placeholder="Any special requests or details..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-background/50 border-border/50 focus:border-primary min-h-[100px]" />
          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">
            <Send className="mr-2" size={20} />
            Submit Booking
          </Button>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
