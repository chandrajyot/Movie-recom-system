# 🎬 AI-Powered Movie Recommendation & Ticket Booking System (CineAI)

An intelligent, full-stack movie recommendation and ticket booking platform powered by AI, featuring personalized recommendations, an AI chatbot, real-time seat booking, secure online payments, QR-code ticket generation, and customizable dynamic themes.

---

## 📌 Project Overview

The **AI-Powered Movie Recommendation & Ticket Booking System** is a modern web application that combines artificial intelligence with a complete movie ticket booking experience. The platform recommends movies based on user preferences, watch history, mood, favorite genres, actors, directors, and ratings. It also enables users to search for movies, book tickets, choose seats, make secure online payments (Razorpay, UPI, Credit/Debit Cards), receive booking confirmations, get SMS alerts to `+91 7319780271`, and interact with CineBot AI assistant for personalized assistance.

The system is designed with scalability, security, and user experience in mind, following industry-standard architecture and best practices (BookMyShow, Netflix, Amazon).

---

## 🚀 Key Features

### 🎯 AI Movie Recommendation
- **Personalized Movie Recommendations**: Content-Based Filtering & Collaborative Vectors.
- **Mood-Based Recommendations**: Match movies with user emotional state.
- **Trending & Top-Rated IMDb 8.5+ Picks**: Real-time curation algorithms.
- **Similar Movie Suggestions**: Instant vector matching.

### 🤖 CineBot AI Chatbot
- Instant natural language assistance for movie suggestions & auto-booking.
- Search movies by genre, actor (*Leonardo DiCaprio*), or director (*Christopher Nolan*).
- Auto-book VIP Recliner seats directly inside the chatbot with 3D Secure Banking OTP authentication!

### 🎬 Movie Booking Engine & Seat Locking
- Indian State & City Selection: **Punjab (Phagwara, Jalandhar, Ludhiana, Amritsar, Chandigarh)**, Maharashtra, Delhi NCR, etc.
- Local Multiplexes: *PVR Cally Plaza Phagwara*, *PVR Curo High Street Jalandhar*, *INox Reliance Mall*, *Surya Cinema*, *Grand Multiplex*.
- **10-Minute Seat Locking**: Prevents double booking during checkout (`🔒 Seats Temporarily Locked 09:59`).
- Interactive seat matrix grid (VIP Recliner, Premium, Executive).

### 💳 Secure Payment & Refund System
- Multi-gateway support: **Razorpay**, **Stripe**, **PayPal**, **Google Pay (UPI)**, **PhonePe**, **Paytm**, **Amazon Pay**, **Apple Pay**, **Debit/Credit Cards**, **Net Banking**.
- Official UPI Gateway: **Chandra jyot Kumar** (`chandrajyotkumar-1@oksbi` - State Bank of India 4513) with embedded QR code.
- 3D Secure 2.0 Banking Verification & HMAC signature verification.
- Full/Partial Refund processing with real-time stage tracking (`Refund Requested` -> `Completed`).
- **Digital Tax Invoice Generator**: View & download PDF invoices with GST breakdown.

### 🎟️ Ticket Management & Theatre Staff Scanner
- UUID Booking Tokens (`TK-8a9f-412e-9901`) & QR-code ticket passes.
- Theatre Staff Scanner UI for gate entry validation.

### 🔔 Multi-Channel Notification System
- Live SMS Alerts & OTP verifications sent to **`+91 7319780271`**.
- Email confirmation passes & 2-Hour Pre-Show Movie Reminders.

### 🎨 Dynamic Theme Customization
- 10 Dynamic Color Palettes: Light, Dark, Blue, Purple, Green, Red, Orange, Pink, AMOLED Black, Gold.

---

## 🏗️ System Architecture

```
                    React Frontend
                           │
                           │ REST API
                           ▼
                  Spring Boot Backend
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
     MySQL DB        Razorpay API      AI Chatbot API
        │                  │                  │
        └──────────────┬───┴──────────────┬───┘
                       ▼                  ▼
                 QR Ticket         Email & SMS Service
```

---

## 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Java 21, Spring Boot, Spring Security, Hibernate, REST APIs
- **Database**: MySQL, Redis (Seat Locking & Caching)
- **AI & ML**: OpenAI GPT API / Google Gemini API, Content-Based & Collaborative Vectors
- **Payment Gateways**: Razorpay, Stripe, Google Pay UPI (`chandrajyotkumar-1@oksbi`)
- **Security**: JWT Authentication, PCI-DSS Compliance, HMAC Signatures, AES-256 Tokenization

---

## 📁 Project Structure

```
movie-recommendation-system
│
├── frontend
│   ├── src
│   │   ├── components       # React UI Components (Booking, Payment, Dashboards)
│   │   ├── context          # Context Providers (BookingContext, MovieContext, AuthContext, ChatContext)
│   │   ├── data             # Data stores & Gateway configurations
│   │   ├── styles           # CSS Themes & Animations
│   │   └── App.jsx          # Root App Component
│   ├── public               # Assets (Google Pay QR code)
│   └── package.json
│
├── backend                  # Spring Boot Java REST Services
├── database                 # MySQL Relational Schema Scripts
└── README.md
```

---

## ⚙️ Installation & Running Locally

### Clone Repository
```bash
git clone https://github.com/chandrajyot/Movie-recom-system.git
cd Movie-recom-system
```

### Frontend Setup
```bash
npm install
npm run dev
```
Application will launch at **`http://localhost:5189/`**.

---

## 👨‍💻 Author

**Chandrajyot Kumar**  
🎓 **Degree**: B.Tech Computer Science Engineering (AI & ML)  
🏛️ **Institution**: Lovely Professional University (LPU)  
📌 **Project**: AI-Powered Movie Recommendation & Ticket Booking System (CineAI)  
📧 **Email**: chandrajyotkumar@gmail.com  
🐙 **GitHub**: [https://github.com/chandrajyot](https://github.com/chandrajyot)

---

## 📄 License

This project is released under the **MIT License**. You are free to use, modify, and distribute it in accordance with the license terms.
