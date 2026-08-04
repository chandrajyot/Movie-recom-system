import { INDIAN_STATES, CITIES_BY_STATE, CINEMA_HALLS_DATABASE } from './indianCinemaData';

export { INDIAN_STATES, CITIES_BY_STATE, CINEMA_HALLS_DATABASE };

export const CITIES = [
  { id: "phg", name: "Phagwara", state: "Punjab", country: "India" },
  { id: "jal", name: "Jalandhar", state: "Punjab", country: "India" },
  { id: "lud", name: "Ludhiana", state: "Punjab", country: "India" },
  { id: "asr", name: "Amritsar", state: "Punjab", country: "India" },
  { id: "chd", name: "Chandigarh", state: "Punjab", country: "India" },
  { id: "mum", name: "Mumbai", state: "Maharashtra", country: "India" },
  { id: "del", name: "New Delhi", state: "Delhi NCR", country: "India" },
  { id: "blr", name: "Bengaluru", state: "Karnataka", country: "India" },
  { id: "ny", name: "New York", state: "International", country: "USA" }
];

export const THEATRES = CINEMA_HALLS_DATABASE;

export const SEAT_CATEGORIES_INR = [
  { type: "Normal", price: 200, color: "#60a5fa" },
  { type: "Premium", price: 280, color: "#a78bfa" },
  { type: "VIP", price: 450, color: "#fbbf24" },
  { type: "Recliner", price: 600, color: "#f472b6" },
  { type: "Couple", price: 750, color: "#34d399" }
];

export const INITIAL_BOOKINGS = [
  {
    id: "BK_889210",
    movieId: 1,
    movieTitle: "Interstellar",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    theatreName: "PVR Curo High Street Jalandhar",
    city: "Jalandhar",
    state: "Punjab",
    screenNo: "Screen 1 (IMAX)",
    showTime: "07:00 PM",
    showDate: "2026-08-05",
    seats: ["F5", "F6"],
    seatType: "VIP",
    ticketCount: 2,
    totalAmount: 900.00,
    currencySymbol: "₹",
    bookingDate: "2026-08-02",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK_889210_JALANDHAR",
    status: "Confirmed"
  },
  {
    id: "BK_774102",
    movieId: 2,
    movieTitle: "Inception",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    theatreName: "PVR Cally Plaza Phagwara",
    city: "Phagwara",
    state: "Punjab",
    screenNo: "Screen 1 (4K Laser)",
    showTime: "09:30 PM",
    showDate: "2026-07-28",
    seats: ["D3", "D4"],
    seatType: "Recliner",
    ticketCount: 2,
    totalAmount: 560.00,
    currencySymbol: "₹",
    bookingDate: "2026-07-25",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK_774102_PHAGWARA",
    status: "Completed"
  }
];

export const COUPONS = [
  { code: "CINEAI20", discountPercent: 20, description: "20% off on all tickets" },
  { code: "PUNJABOFFER", flatDiscount: 100, description: "₹100 flat discount for Punjab region" },
  { code: "FIRSTBOOK", discountPercent: 15, description: "15% off for first booking" }
];
