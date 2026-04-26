import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const REVIEWS_KEY = "quickshoot_reviews";

const getReviews = (): Review[] => {
  const stored = localStorage.getItem(REVIEWS_KEY);
  if (stored) return JSON.parse(stored);
  return [
    { id: "1", name: "Sarah M.", rating: 5, comment: "Absolutely stunning work! The team captured our corporate event perfectly. Highly recommend QuickShoot.", date: "2026-03-20" },
    { id: "2", name: "James K.", rating: 4, comment: "Great music video production. Creative direction was on point and delivery was fast.", date: "2026-03-15" },
    { id: "3", name: "Priya R.", rating: 5, comment: "Professional, punctual, and the quality exceeded our expectations. Will book again!", date: "2026-03-10" },
  ];
};

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={18}
        className={`${star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"} ${interactive ? "cursor-pointer hover:text-primary transition-colors" : ""}`}
        onClick={() => interactive && onRate?.(star)}
      />
    ))}
  </div>
);

const ReviewsSection = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(getReviews);
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.comment) {
      toast({ title: "Missing fields", description: "Please fill in all fields and select a rating.", variant: "destructive" });
      return;
    }
    const newReview: Review = { id: crypto.randomUUID(), ...form, date: new Date().toISOString().split("T")[0] };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
    setForm({ name: "", rating: 0, comment: "" });
    toast({ title: "Review submitted! ⭐", description: "Thank you for your feedback." });
  };

  return (
    <section id="reviews" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Client Reviews</h2>
          <div className="flex items-center justify-center gap-3">
            <StarRating rating={Math.round(Number(avgRating))} />
            <span className="text-2xl font-bold text-primary">{avgRating}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {reviews.slice(0, 6).map((review, i) => (
            <div key={review.id} className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <StarRating rating={review.rating} />
              <p className="text-foreground/80 mt-3 mb-4 text-sm leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          <h3 className="text-2xl font-heading font-semibold text-center mb-6">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
            <Input placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50 border-border/50" />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your Rating *</p>
              <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} interactive />
            </div>
            <Textarea placeholder="Share your experience... *" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className="bg-background/50 border-border/50 min-h-[80px]" />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Submit Review</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
