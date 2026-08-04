import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CITIES,
  INDIAN_STATES, 
  CITIES_BY_STATE, 
  CINEMA_HALLS_DATABASE, 
  SEAT_CATEGORIES_INR, 
  INITIAL_BOOKINGS, 
  COUPONS 
} from '../data/bookingData';
import { INITIAL_PAYMENT_GATEWAYS, CONVENIENCE_FEE_PERCENT, GST_PERCENT } from '../data/paymentGateways';

const BookingContext = createContext();

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "BOOKING_CONFIRMED",
    channel: "SMS",
    title: "📱 SMS Sent to +91 7319780271: Interstellar Ticket",
    message: "Booking ID BK_889210 confirmed at PVR Curo High Street Jalandhar for 07:00 PM. Gate QR code sent to +91 7319780271.",
    time: "10 mins ago",
    read: false
  },
  {
    id: "n2",
    type: "REMINDER",
    channel: "SMS",
    title: "⏰ Pre-Show Movie SMS Reminder",
    message: "SMS Alert to +91 7319780271: Your show for Interstellar starts in 2 hours at PVR Curo High Street Jalandhar (Screen 1 IMAX).",
    time: "1 hour ago",
    read: false
  },
  {
    id: "n3",
    type: "REFUND",
    channel: "SMS",
    title: "SMS Alert to +91 7319780271: Refund (₹560.00)",
    message: "Refund of ₹560 for booking BK_774102 processed to bank account linked with +91 7319780271.",
    time: "Yesterday",
    read: true
  }
];

export const BookingProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('customer');
  const [selectedState, setSelectedState] = useState('Punjab');
  const [selectedCity, setSelectedCity] = useState('Phagwara');
  const [currencySymbol, setCurrencySymbol] = useState('₹');

  const [customCitiesByState, setCustomCitiesByState] = useState(CITIES_BY_STATE);

  const [paymentGateways, setPaymentGateways] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_payment_gateways');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_PAYMENT_GATEWAYS;
    } catch (e) {
      return INITIAL_PAYMENT_GATEWAYS;
    }
  });

  const [seatLockSeconds, setSeatLockSeconds] = useState(0);

  // Live Toast Notification Popup State
  const [liveToastNotification, setLiveToastNotification] = useState(null);

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_notifications');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_NOTIFICATIONS;
    } catch (e) {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [refunds, setRefunds] = useState([]);
  const [activeInvoiceTicket, setActiveInvoiceTicket] = useState(null);

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_user_bookings');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_BOOKINGS;
    } catch (e) {
      return INITIAL_BOOKINGS;
    }
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_loyalty_points');
      return saved ? Number(JSON.parse(saved)) : 850;
    } catch (e) {
      return 850;
    }
  });

  const [bookingStep, setBookingStep] = useState(null);
  const [selectedBookingMovie, setSelectedBookingMovie] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [completedTicket, setCompletedTicket] = useState(null);

  // Trigger welcome SMS notification popup on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLiveToastNotification({
        title: "📱 SMS Alert Service Active (+91 7319780271)",
        message: "SMS booking confirmations & OTP verifications will be sent to +91 7319780271!"
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (seatLockSeconds > 0) {
      timer = setInterval(() => {
        setSeatLockSeconds(prev => {
          if (prev <= 1) {
            releaseSeats();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [seatLockSeconds]);

  useEffect(() => {
    try {
      localStorage.setItem('cine_user_bookings', JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('cine_loyalty_points', JSON.stringify(loyaltyPoints));
    } catch (e) {}
  }, [loyaltyPoints]);

  useEffect(() => {
    try {
      localStorage.setItem('cine_payment_gateways', JSON.stringify(paymentGateways));
    } catch (e) {}
  }, [paymentGateways]);

  useEffect(() => {
    try {
      localStorage.setItem('cine_notifications', JSON.stringify(notifications));
    } catch (e) {}
  }, [notifications]);

  const toggleGateway = (gatewayId) => {
    setPaymentGateways(prev => prev.map(g => g.id === gatewayId ? { ...g, enabled: !g.enabled } : g));
  };

  const lockSeats = () => {
    setSeatLockSeconds(600);
  };

  const releaseSeats = () => {
    setSeatLockSeconds(0);
    setSelectedSeats([]);
    if (['seats', 'payment'].includes(bookingStep)) {
      setBookingStep(null);
      alert("⏱️ 10-minute seat lock timed out! Seats have been automatically released to prevent double booking.");
    }
  };

  const addCustomCity = (stateName, newCityName) => {
    if (!newCityName.trim()) return;
    const cleanCity = newCityName.trim();
    setCustomCitiesByState(prev => {
      const currentList = prev[stateName] || [];
      if (!currentList.includes(cleanCity)) {
        return {
          ...prev,
          [stateName]: [cleanCity, ...currentList]
        };
      }
      return prev;
    });
    setSelectedCity(cleanCity);
  };

  const initiateBooking = (movie) => {
    setSelectedBookingMovie(movie);
    const matchingHalls = CINEMA_HALLS_DATABASE.filter(t => t.city.toLowerCase() === selectedCity.toLowerCase());
    const targetTheatre = matchingHalls[0] || CINEMA_HALLS_DATABASE[0];

    setSelectedTheatre(targetTheatre);
    setSelectedShow({ time: "07:00 PM", screen: targetTheatre.screens[0]?.screenNo || "Screen 1 (4K Laser)", date: new Date().toISOString().split('T')[0] });
    setSelectedSeats([]);
    setAppliedCoupon(null);
    setBookingStep('schedule');
  };

  const selectTheatreAndShow = (theatre, showInfo) => {
    setSelectedTheatre(theatre);
    setSelectedShow(showInfo);
    lockSeats();
    setBookingStep('seats');
  };

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const applyCouponCode = (code) => {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      return { success: true, message: `Applied ${found.description}!` };
    }
    return { success: false, message: "Invalid coupon code!" };
  };

  const calculateTotalPrice = () => {
    if (selectedSeats.length === 0) return { subtotal: 0, discount: 0, convenienceFee: 0, gst: 0, total: 0 };
    
    const basePrice = currencySymbol === '₹' ? 280 : 15;
    const subtotal = selectedSeats.length * basePrice;
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountPercent) {
        discount = (subtotal * appliedCoupon.discountPercent) / 100;
      } else if (appliedCoupon.flatDiscount) {
        discount = currencySymbol === '₹' ? appliedCoupon.flatDiscount : 5;
      }
    }
    
    const convenienceFee = (subtotal * CONVENIENCE_FEE_PERCENT) / 100;
    const gst = (convenienceFee * GST_PERCENT) / 100;

    const total = Math.max(subtotal - discount + convenienceFee + gst, 0);
    return { subtotal, discount, convenienceFee, gst, total };
  };

  const addNotification = (notif) => {
    const newNotif = { id: `n_${Date.now()}`, ...notif };
    setNotifications(prev => [newNotif, ...(Array.isArray(prev) ? prev : [])]);
    // Trigger floating popup notification instantly on screen!
    setLiveToastNotification(newNotif);
  };

  const processPayment = (paymentMethod) => {
    const { total } = calculateTotalPrice();
    const newBookingId = `BK_${Math.floor(100000 + Math.random() * 900000)}`;
    const randomHex = Math.random().toString(16).substring(2, 6);
    const bookingToken = `TK-${randomHex}-${newBookingId.replace('BK_', '')}`;

    const newTicket = {
      id: newBookingId,
      bookingToken: bookingToken,
      movieId: selectedBookingMovie?.id || 1,
      movieTitle: selectedBookingMovie?.title || 'Movie',
      poster: selectedBookingMovie?.poster || '',
      theatreName: selectedTheatre?.name || 'Multiplex Cinema',
      city: selectedCity,
      state: selectedState,
      screenNo: selectedShow?.screen || 'Screen 1',
      showTime: selectedShow?.time || '07:00 PM',
      showDate: selectedShow?.date || new Date().toISOString().split('T')[0],
      seats: selectedSeats,
      seatType: "VIP & Premium",
      ticketCount: selectedSeats.length,
      totalAmount: total,
      currencySymbol: currencySymbol,
      paymentMethod: paymentMethod || '3D Secure Gateway',
      bookingDate: new Date().toISOString().split('T')[0],
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingToken}_${newBookingId}_${selectedCity.toUpperCase()}`,
      status: "Confirmed"
    };

    setBookings(prev => [newTicket, ...(Array.isArray(prev) ? prev : [])]);
    setLoyaltyPoints(prev => (prev || 0) + Math.round(total * 0.1));
    setCompletedTicket(newTicket);
    setSeatLockSeconds(0);

    // Trigger instant SMS Alert Toast to +91 7319780271!
    addNotification({
      type: "BOOKING_CONFIRMED",
      channel: "SMS",
      title: "📱 SMS Sent to +91 7319780271: Ticket Confirmed!",
      message: `Confirmed ${newTicket.movieTitle} (${newTicket.ticketCount} seats) at ${newTicket.theatreName}. Gate QR pass sent to +91 7319780271.`,
      time: "Just now",
      read: false
    });

    setBookingStep('ticket');
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => (Array.isArray(prev) ? prev : []).map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const initiateRefund = (bookingId, amount, reason = "Customer Cancellation") => {
    setBookings(prev => (Array.isArray(prev) ? prev : []).map(b => b.id === bookingId ? { ...b, status: 'Refunded' } : b));
    
    const newRefund = {
      id: `RF_${Math.floor(100000 + Math.random() * 900000)}`,
      bookingId: bookingId,
      amount: amount,
      currencySymbol: currencySymbol,
      reason: reason,
      status: "Completed",
      date: new Date().toISOString().split('T')[0]
    };

    setRefunds(prev => [newRefund, ...prev]);

    addNotification({
      type: "REFUND",
      channel: "SMS",
      title: `SMS Sent to +91 7319780271: Refund Processed (${currencySymbol}${amount})`,
      message: `Refund of ${currencySymbol}${amount} for booking ${bookingId} processed to bank account linked with +91 7319780271.`,
      time: "Just now",
      read: false
    });
  };

  const cancelBooking = (bookingId) => {
    const ticket = (Array.isArray(bookings) ? bookings : []).find(b => b.id === bookingId);
    if (ticket) {
      initiateRefund(bookingId, ticket.totalAmount, "Customer Requested Cancellation");
    }
  };

  const viewInvoiceModal = (ticket) => {
    setActiveInvoiceTicket(ticket);
  };

  const closeInvoiceModal = () => {
    setActiveInvoiceTicket(null);
  };

  const closeBookingModal = () => {
    setBookingStep(null);
    setSelectedBookingMovie(null);
    setSelectedSeats([]);
  };

  return (
    <BookingContext.Provider value={{
      userRole,
      setUserRole,
      selectedState,
      setSelectedState,
      selectedCity,
      setSelectedCity,
      currencySymbol,
      setCurrencySymbol,
      CITIES,
      INDIAN_STATES,
      customCitiesByState,
      addCustomCity,
      CINEMA_HALLS_DATABASE,
      SEAT_CATEGORIES_INR,
      COUPONS,
      paymentGateways,
      toggleGateway,
      seatLockSeconds,
      lockSeats,
      releaseSeats,
      liveToastNotification,
      setLiveToastNotification,
      notifications,
      addNotification,
      markNotificationRead,
      clearNotifications,
      refunds,
      initiateRefund,
      activeInvoiceTicket,
      viewInvoiceModal,
      closeInvoiceModal,
      bookings,
      loyaltyPoints,
      bookingStep,
      setBookingStep,
      selectedBookingMovie,
      selectedTheatre,
      selectedShow,
      selectedSeats,
      appliedCoupon,
      completedTicket,
      initiateBooking,
      selectTheatreAndShow,
      toggleSeatSelection,
      applyCouponCode,
      calculateTotalPrice,
      processPayment,
      cancelBooking,
      closeBookingModal
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  return context || {
    userRole: 'customer',
    setUserRole: () => {},
    selectedState: 'Punjab',
    setSelectedState: () => {},
    selectedCity: 'Phagwara',
    setSelectedCity: () => {},
    currencySymbol: '₹',
    setCurrencySymbol: () => {},
    CITIES: CITIES,
    INDIAN_STATES: INDIAN_STATES,
    customCitiesByState: CITIES_BY_STATE,
    addCustomCity: () => {},
    CINEMA_HALLS_DATABASE: CINEMA_HALLS_DATABASE,
    SEAT_CATEGORIES_INR: SEAT_CATEGORIES_INR,
    COUPONS: COUPONS,
    paymentGateways: INITIAL_PAYMENT_GATEWAYS,
    toggleGateway: () => {},
    seatLockSeconds: 0,
    lockSeats: () => {},
    releaseSeats: () => {},
    liveToastNotification: null,
    setLiveToastNotification: () => {},
    notifications: INITIAL_NOTIFICATIONS,
    addNotification: () => {},
    markNotificationRead: () => {},
    clearNotifications: () => {},
    refunds: [],
    initiateRefund: () => {},
    activeInvoiceTicket: null,
    viewInvoiceModal: () => {},
    closeInvoiceModal: () => {},
    bookings: INITIAL_BOOKINGS,
    loyaltyPoints: 850,
    bookingStep: null,
    setBookingStep: () => {},
    selectedBookingMovie: null,
    selectedTheatre: null,
    selectedShow: null,
    selectedSeats: [],
    appliedCoupon: null,
    completedTicket: null,
    initiateBooking: () => {},
    selectTheatreAndShow: () => {},
    toggleSeatSelection: () => {},
    applyCouponCode: () => {},
    calculateTotalPrice: () => ({ subtotal: 0, discount: 0, convenienceFee: 0, gst: 0, total: 0 }),
    processPayment: () => {},
    cancelBooking: () => {},
    closeBookingModal: () => {}
  };
};
