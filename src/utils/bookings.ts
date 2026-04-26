export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  createdAt: string;
  rating?: number;
}

const BOOKINGS_KEY = "quickshoot_bookings";

export const getBookings = (): Booking[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(BOOKINGS_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveBooking = (booking: Booking): Booking[] => {
  const bookings = getBookings();
  const updated = [booking, ...bookings];
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  return updated;
};
