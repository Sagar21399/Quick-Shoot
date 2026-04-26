import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Star, Trash2, Calendar, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Booking, getBookings } from "@/utils/bookings";

const serviceLabels: Record<string, string> = {
  corporate: "Corporate Videos",
  music: "Music Videos",
  event: "Event Coverage",
  interview: "Interviews & Podcasts",
};

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.service === filter);

  const removeBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("quickshoot_bookings", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/30 glass-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft size={18} className="mr-1" /> Back
              </Button>
            </Link>
            <h1 className="text-xl font-heading font-bold text-gradient-gold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="text-primary" size={20} />
            <Badge className="bg-primary text-primary-foreground">{bookings.length}</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings.length, color: "text-primary" },
            { label: "This Month", value: bookings.filter((b) => new Date(b.createdAt).getMonth() === new Date().getMonth()).length, color: "text-primary" },
            { label: "Avg Rating", value: bookings.filter((b) => b.rating).length ? (bookings.filter((b) => b.rating).reduce((s, b) => s + (b.rating || 0), 0) / bookings.filter((b) => b.rating).length).toFixed(1) : "N/A", color: "text-primary" },
            { label: "New Today", value: bookings.filter((b) => new Date(b.createdAt).toDateString() === new Date().toDateString()).length, color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-muted-foreground mr-2">Filter:</span>
          {["all", "corporate", "music", "event", "interview"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className={filter === f ? "bg-primary text-primary-foreground" : "border-border/50 text-muted-foreground"}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : serviceLabels[f]}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <Bell className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground text-lg">No bookings yet. They will appear here when customers submit the booking form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => (
              <div key={booking.id} className="glass-card rounded-xl p-6 animate-fade-up hover:border-primary/30 transition-colors" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold">{booking.name}</h3>
                      <Badge className="bg-primary/10 text-primary border-primary/20">{serviceLabels[booking.service] || booking.service}</Badge>
                      {booking.rating && (
                        <span className="flex items-center gap-1 text-sm text-primary">
                          <Star size={14} className="fill-primary" /> {booking.rating}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail size={14} /> {booking.email}</span>
                      {booking.phone && <span className="flex items-center gap-1"><Phone size={14} /> {booking.phone}</span>}
                      <span className="flex items-center gap-1"><Calendar size={14} /> {booking.date}</span>
                    </div>
                    {booking.message && (
                      <p className="text-sm text-foreground/70 flex items-start gap-1 mt-1">
                        <MessageSquare size={14} className="mt-0.5 shrink-0" /> {booking.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{new Date(booking.createdAt).toLocaleDateString()}</span>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80" onClick={() => removeBooking(booking.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
