import React, { useState, Component } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider, useMovie } from './context/MovieContext';
import { ChatProvider } from './context/ChatContext';
import { BookingProvider, useBooking } from './context/BookingContext';

import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieCarouselRow } from './components/MovieCarouselRow';
import { FeedbackSection } from './components/FeedbackSection';
import { AdvancedFilterDrawer } from './components/AdvancedFilterDrawer';
import { AIRecommendationSection } from './components/AIRecommendationSection';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { AuthModal } from './components/AuthModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { WatchlistPage } from './components/WatchlistPage';
import { UserProfile } from './components/UserProfile';
import { Footer } from './components/Footer';

// Booking Modals & Role Dashboards
import { TheatreShowSelector } from './components/Booking/TheatreShowSelector';
import { SeatPickerModal } from './components/Booking/SeatPickerModal';
import { PaymentModal } from './components/Booking/PaymentModal';
import { TicketConfirmationModal } from './components/Booking/TicketConfirmationModal';
import { InvoiceModal } from './components/Booking/InvoiceModal';
import { LiveNotificationToast } from './components/Navbar/LiveNotificationToast';
import { TheatreOwnerDashboard } from './components/Dashboards/TheatreOwnerDashboard';
import { AdminDashboard } from './components/Dashboards/AdminDashboard';

import { Film, Flame, Star, Sparkles, Clock, Compass, RotateCcw, AlertTriangle } from 'lucide-react';
import './styles/index.css';

// React Error Boundary to prevent any blank black screen!
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <div style={{ background: '#181820', border: '1px solid #e50914', borderRadius: '20px', padding: '2.5rem', maxWidth: '500px', width: '100%', boxShadow: '0 10px 30px rgba(229, 9, 20, 0.3)' }}>
            <div style={{ background: 'rgba(229, 9, 20, 0.2)', width: 60, height: 60, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#e50914', marginBottom: '1rem' }}>
              <AlertTriangle size={32} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>Application Diagnostics</h2>
            <p style={{ fontSize: '0.85rem', color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontFamily: 'monospace', textAlign: 'left' }}>
              {this.state.error?.toString()}
            </p>
            <button 
              onClick={this.handleReset}
              style={{ background: '#e50914', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RotateCcw size={16} /> Reset All Storage & Launch Fresh App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainAppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  
  const { movies, filteredMovies, toastMessage } = useMovie();
  const { userRole, bookingStep } = useBooking();

  const safeMovies = Array.isArray(movies) ? movies : [];
  const safeFilteredMovies = Array.isArray(filteredMovies) ? filteredMovies : [];

  const trendingMovies = safeMovies.filter(m => m && m.trending);
  const topRatedMovies = safeMovies.filter(m => m && (m.topRated || m.imdbRating >= 8.5));
  const newReleases = safeMovies.filter(m => m && (m.newRelease || m.releaseYear >= 2022));

  return (
    <div className="app-container">
      {/* Floating Instant Live Notification Toast Popup */}
      <LiveNotificationToast />

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenThemeModal={() => setIsThemeModalOpen(true)} 
      />

      <main className="main-content">
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="toast-banner">
            <Sparkles size={16} style={{ color: 'var(--primary-color)' }} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Role-Based Routing Override */}
        {userRole === 'owner' ? (
          <TheatreOwnerDashboard />
        ) : userRole === 'admin' ? (
          <AdminDashboard />
        ) : (
          /* Customer Role Views */
          <>
            {/* Home Tab */}
            {activeTab === 'home' && (
              <>
                <HeroBanner />
                <AIRecommendationSection />
                <MovieCarouselRow title="Now Showing & Trending" icon={<Flame size={20} style={{ color: '#ef4444' }} />} movies={trendingMovies} />
                <MovieCarouselRow title="Top Rated IMDb 8.5+ Movies" icon={<Star size={20} fill="#fbbf24" color="#fbbf24" />} movies={topRatedMovies} />
                <MovieCarouselRow title="New Releases & Recent Cinema" icon={<Clock size={20} style={{ color: '#10b981' }} />} movies={newReleases} />
                <FeedbackSection />
              </>
            )}

            {/* AI Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Sparkles size={28} style={{ color: 'var(--primary-color)' }} />
                    AI Personalization & Recommendation Engine
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Content-based & Collaborative AI recommendation vectors tailored specifically for your tastes.
                  </p>
                </div>
                <AIRecommendationSection />
                <MovieCarouselRow title="Curated Picks For You" icon={<Compass size={20} style={{ color: 'var(--primary-color)' }} />} movies={safeMovies} />
                <FeedbackSection />
              </>
            )}

            {/* Search & Filter Tab */}
            {activeTab === 'search' && (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Compass size={28} style={{ color: 'var(--primary-color)' }} />
                    Movie Search & Advanced Filter Portal
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Filter movies by actor, director, genre, language, IMDb rating, runtime, and streaming platform.
                  </p>
                </div>
                <AdvancedFilterDrawer />

                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Results ({safeFilteredMovies.length} movies)
                  </h3>
                  {safeFilteredMovies.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 16 }}>
                      <Film size={40} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                      <p style={{ color: 'var(--text-muted)' }}>No movies match your filter criteria. Try resetting filters.</p>
                    </div>
                  ) : (
                    <div className="movie-grid">
                      {safeFilteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Watchlist & Favorites Tab */}
            {activeTab === 'watchlist' && <WatchlistPage />}

            {/* Full Chatbot Tab */}
            {activeTab === 'chatbot' && (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Sparkles size={28} style={{ color: 'var(--primary-color)' }} />
                    CineBot AI Ticket Assistant
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Ask CineBot any question using natural speech or typing to get instant movie suggestions and book tickets.
                  </p>
                </div>
                <ChatbotWidget isFullPage={true} />
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && <AnalyticsDashboard />}

            {/* User Profile Tab */}
            {activeTab === 'profile' && <UserProfile />}
          </>
        )}
      </main>

      <Footer />

      {/* Floating Chatbot Drawer (when not in full chatbot tab) */}
      {activeTab !== 'chatbot' && <ChatbotWidget isFullPage={false} />}

      {/* Booking & Invoice Modals */}
      {bookingStep === 'schedule' && <TheatreShowSelector />}
      {bookingStep === 'seats' && <SeatPickerModal />}
      {bookingStep === 'payment' && <PaymentModal />}
      {bookingStep === 'ticket' && <TicketConfirmationModal />}
      <InvoiceModal />

      {/* General Modals */}
      <MovieDetailsModal />
      <AuthModal />
      <ThemeCustomizerModal 
        isOpen={isThemeModalOpen} 
        onClose={() => setIsThemeModalOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <MovieProvider>
            <BookingProvider>
              <ChatProvider>
                <MainAppContent />
              </ChatProvider>
            </BookingProvider>
          </MovieProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
