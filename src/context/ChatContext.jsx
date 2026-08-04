import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MOVIES } from '../data/moviesData';
import { useBooking } from './BookingContext';

const ChatContext = createContext();

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    sender: 'bot',
    text: "Hello! I am CineBot 🎬, your AI movie & ticket booking assistant. I can **automatically book tickets with payment authentication**! Try asking me:\n• \"Book 2 tickets for Interstellar in Phagwara\"\n• \"Auto book 2 seats for Inception at 7 PM in Jalandhar\"\n• \"Show movie halls in Jalandhar with IMAX\"\n• \"Show my booked tickets\"",
    suggestedQuestions: [
      "⚡ Auto Book 2 Tickets for Interstellar",
      "⚡ Auto Book 2 Seats for Inception",
      "Show movie halls in Phagwara",
      "Show my booked tickets"
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export const ChatProvider = ({ children }) => {
  const bookingCtx = useBooking() || {};
  const { 
    setBookings = () => {}, 
    setLoyaltyPoints = () => {}, 
    selectedCity = 'Phagwara', 
    selectedState = 'Punjab', 
    currencySymbol = '₹' 
  } = bookingCtx;

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_chat_messages');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MESSAGES;
    } catch (e) {
      return INITIAL_MESSAGES;
    }
  });

  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cine_chat_messages', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#•]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const initiateAutoBookingAuth = (query) => {
    let targetMovie = INITIAL_MOVIES.find(m => query.toLowerCase().includes(m.title.toLowerCase())) || INITIAL_MOVIES[0];
    
    let ticketCount = 2;
    if (query.includes('1 ticket') || query.includes('1 seat')) ticketCount = 1;
    if (query.includes('3 ticket') || query.includes('3 seat')) ticketCount = 3;
    if (query.includes('4 ticket') || query.includes('4 seat')) ticketCount = 4;

    const city = query.toLowerCase().includes('phagwara') ? 'Phagwara' : query.toLowerCase().includes('jalandhar') ? 'Jalandhar' : (selectedCity || 'Phagwara');
    const theatreName = city === 'Phagwara' ? 'PVR Cally Plaza Phagwara' : 'PVR Curo High Street Jalandhar';
    
    const seats = ticketCount === 1 ? ["F5"] : ticketCount === 2 ? ["F5", "F6"] : ticketCount === 3 ? ["F4", "F5", "F6"] : ["F4", "F5", "F6", "F7"];
    const basePrice = currencySymbol === '₹' ? 280 : 15;
    const totalAmount = ticketCount * basePrice;
    const bookingId = `BK_AI_${Math.floor(100000 + Math.random() * 900000)}`;

    const pendingTicket = {
      id: bookingId,
      movieId: targetMovie.id,
      movieTitle: targetMovie.title,
      poster: targetMovie.poster,
      theatreName: theatreName,
      city: city,
      state: selectedState || 'Punjab',
      screenNo: 'Screen 1 (4K Laser IMAX)',
      showTime: '07:00 PM',
      showDate: new Date().toISOString().split('T')[0],
      seats: seats,
      seatType: 'VIP Recliner',
      ticketCount: ticketCount,
      totalAmount: totalAmount,
      currencySymbol: currencySymbol || '₹',
      paymentMethod: 'UPI / 3D Secure Verification',
      bookingDate: new Date().toISOString().split('T')[0],
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}_${city.toUpperCase()}`,
      status: 'Pending Verification'
    };

    return {
      text: `🔒 **PAYMENT AUTHENTICATION REQUIRED**\n\nI have locked the best VIP seats for **${targetMovie.title}** at **${theatreName}** (${city})!\n\nPlease authenticate the payment of **${currencySymbol}${totalAmount}** using your 3D Secure OTP sent to +91 7319780271 below:`,
      pendingTicket: pendingTicket,
      actionType: 'PAYMENT_AUTH_REQUIRED'
    };
  };

  const confirmAutoBookingAuth = (ticket) => {
    const confirmedTicket = { ...ticket, status: 'Confirmed' };
    if (typeof setBookings === 'function') setBookings(prev => [confirmedTicket, ...(Array.isArray(prev) ? prev : [])]);
    if (typeof setLoyaltyPoints === 'function') setLoyaltyPoints(prev => (prev || 0) + Math.round(ticket.totalAmount * 0.1));

    const botMsg = {
      id: `bot_${Date.now()}`,
      sender: 'bot',
      text: `🎉 **PAYMENT AUTHENTICATED SUCCESSFULLY!**\n\nSMS Confirmation sent to +91 7319780271! Digital ticket pass issued!`,
      autoTicket: confirmedTicket,
      actionType: 'AUTO_BOOKED',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMsg]);
    speakText("Payment authenticated successfully! Your tickets are confirmed.");
  };

  const parseQueryAndRecommend = (userText) => {
    const query = userText.toLowerCase();

    // Trigger Payment Authentication Request
    if (query.includes('book') || query.includes('ticket') || query.includes('reserve') || query.includes('buy')) {
      return initiateAutoBookingAuth(userText);
    }

    if (query.includes('my ticket') || query.includes('my booking') || query.includes('show ticket')) {
      return {
        text: "📋 You can view, print, or download all active tickets under the **'My List & Tickets'** tab or in your Customer Dashboard!",
        actionType: 'NAVIGATE_WATCHLIST',
        suggestedQuestions: [
          "⚡ Auto Book 2 Tickets for Interstellar",
          "Show theatres in Phagwara"
        ]
      };
    }

    if (query.includes('phagwara') || query.includes('jalandhar') || query.includes('punjab') || query.includes('theatre') || query.includes('cinema') || query.includes('hall')) {
      return {
        text: "📍 Recommended Multiplex Cinema Halls:\n• **PVR Cally Plaza Phagwara** (GT Road, Phagwara) - 4.8⭐\n• **PVR Curo High Street Jalandhar** (66 Feet Road, Jalandhar) - 4.9⭐\n• **INox Reliance Mall Jalandhar** (BMC Chowk, Jalandhar) - 4.8⭐\n• **Grand Multiplex GT Road (Near LPU Phagwara)** - 4.9⭐\n\n*PVR Curo High Street Jalandhar has IMAX 3D & Dolby Atmos.*",
        suggestedQuestions: [
          "⚡ Auto Book 2 Tickets for Interstellar",
          "Recommend sci-fi movies"
        ]
      };
    }

    let matches = [...INITIAL_MOVIES];
    let explanationParts = [];

    if (query.includes('dicaprio') || query.includes('leonardo')) {
      matches = matches.filter(m => m.actors.some(a => a.toLowerCase().includes('dicaprio')));
      explanationParts.push('starring Leonardo DiCaprio');
    } else if (query.includes('nolan')) {
      matches = matches.filter(m => m.director.toLowerCase().includes('nolan'));
      explanationParts.push('directed by Christopher Nolan');
    }

    if (query.includes('action')) {
      matches = matches.filter(m => m.genres.includes('Action'));
      explanationParts.push('Action genre');
    } else if (query.includes('sci-fi') || query.includes('scifi')) {
      matches = matches.filter(m => m.genres.includes('Sci-Fi'));
      explanationParts.push('Sci-Fi genre');
    }

    if (matches.length === 0) matches = INITIAL_MOVIES.slice(0, 3);
    else matches = matches.slice(0, 4);

    const explanationStr = explanationParts.length > 0 ? ` (${explanationParts.join(', ')})` : '';

    return {
      text: `Here are the top movie recommendations for you${explanationStr}:`,
      recommendedMovies: matches,
      suggestedQuestions: [
        "⚡ Auto Book 2 Tickets for " + (matches[0]?.title || "Interstellar"),
        "Show theatres in Phagwara",
        "Top rated IMDb movies"
      ]
    };
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responseData = parseQueryAndRecommend(text);

      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: responseData.text,
        recommendedMovies: responseData.recommendedMovies,
        suggestedQuestions: responseData.suggestedQuestions,
        actionType: responseData.actionType,
        targetMovie: responseData.targetMovie,
        pendingTicket: responseData.pendingTicket,
        autoTicket: responseData.autoTicket,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      speakText(botMsg.text);
    }, 120);
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported by your browser. Try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        sendMessage(transcript);
      }
    };

    recognition.start();
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      confirmAutoBookingAuth,
      isTyping,
      isListening,
      startVoiceInput,
      voiceEnabled,
      setVoiceEnabled,
      clearChat,
      chatDrawerOpen,
      setChatDrawerOpen
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  return ctx || {
    messages: INITIAL_MESSAGES,
    sendMessage: () => {},
    confirmAutoBookingAuth: () => {},
    isTyping: false,
    isListening: false,
    startVoiceInput: () => {},
    voiceEnabled: true,
    setVoiceEnabled: () => {},
    clearChat: () => {},
    chatDrawerOpen: false,
    setChatDrawerOpen: () => {}
  };
};
