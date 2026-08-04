import React, { useState } from 'react';
import { Film, Sparkles, Search, Palette, User, Bookmark, BarChart2, Bot, MapPin, Shield, Building2, Ticket, Bell, QrCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMovie } from '../context/MovieContext';
import { useBooking } from '../context/BookingContext';
import { CITIES } from '../data/bookingData';
import { NotificationDrawer } from './Navbar/NotificationDrawer';
import { StaffScannerModal } from './Booking/StaffScannerModal';

export const Navbar = ({ activeTab, setActiveTab, onOpenThemeModal }) => {
  const { user, openAuth } = useAuth();
  const { filters, setFilters } = useMovie();
  const { userRole, setUserRole, selectedCity, setSelectedCity, loyaltyPoints, notifications } = useBooking();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const safeCities = Array.isArray(CITIES) ? CITIES : [
    { id: "phg", name: "Phagwara" },
    { id: "jal", name: "Jalandhar" },
    { id: "mum", name: "Mumbai" },
    { id: "del", name: "New Delhi" }
  ];

  const safeNotifications = Array.isArray(notifications) ? notifications : [];
  const unreadCount = safeNotifications.filter(n => !n.read).length;

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      <div className="brand-logo" onClick={() => setActiveTab('home')}>
        <div className="icon-box">
          <Film size={22} />
        </div>
        <span>CineAI <span style={{ color: 'var(--primary-color)' }}>Booking</span></span>
      </div>

      {/* Role Switcher Pill */}
      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <button 
          onClick={() => setUserRole('customer')}
          style={{ background: userRole === 'customer' ? 'var(--primary-color)' : 'transparent', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 14, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
        >
          <User size={12} style={{ display: 'inline', marginRight: 3 }} /> Customer
        </button>
        <button 
          onClick={() => setUserRole('owner')}
          style={{ background: userRole === 'owner' ? 'var(--primary-color)' : 'transparent', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 14, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
        >
          <Building2 size={12} style={{ display: 'inline', marginRight: 3 }} /> Owner
        </button>
        <button 
          onClick={() => setUserRole('admin')}
          style={{ background: userRole === 'admin' ? 'var(--primary-color)' : 'transparent', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: 14, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
        >
          <Shield size={12} style={{ display: 'inline', marginRight: 3 }} /> Admin
        </button>
      </div>

      <ul className="nav-links">
        <li>
          <button 
            className={`nav-link-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Film size={16} /> Home
          </button>
        </li>
        <li>
          <button 
            className={`nav-link-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            <Sparkles size={16} /> AI Picks
          </button>
        </li>
        <li>
          <button 
            className={`nav-link-btn ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <Search size={16} /> Search
          </button>
        </li>
        <li>
          <button 
            className={`nav-link-btn ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            <Bookmark size={16} /> My List & Tickets
          </button>
        </li>
        <li>
          <button 
            className={`nav-link-btn ${activeTab === 'chatbot' ? 'active' : ''}`}
            onClick={() => setActiveTab('chatbot')}
          >
            <Bot size={16} /> CineBot
          </button>
        </li>
        <li>
          <button 
            className={`nav-link-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart2 size={16} /> Analytics
          </button>
        </li>
      </ul>

      <div className="nav-actions">
        {/* Staff Gate Scanner Trigger Button */}
        {['owner', 'admin'].includes(userRole) && (
          <button
            className="chip-btn"
            style={{ background: 'rgba(16,185,129,0.15)', borderColor: '#10b981', color: '#6ee7b7' }}
            onClick={() => setIsScannerOpen(true)}
            title="Scan Gate Ticket"
          >
            <QrCode size={14} style={{ marginRight: 3 }} /> Staff Scanner
          </button>
        )}

        {/* City Indicator Selector */}
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
        >
          {safeCities.map(c => (
            <option key={c.id} value={c.name} style={{ background: '#181820' }}>📍 {c.name}</option>
          ))}
        </select>

        {/* Notifications Icon with Unread Counter */}
        <button
          className="icon-btn"
          style={{ position: 'relative' }}
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          title="Notifications & Alerts"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span style={{ position: 'absolute', top: -3, right: -3, background: '#ef4444', color: '#fff', fontSize: '0.65rem', fontWeight: 800, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* Loyalty Points Pill */}
        <div style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid #fbbf24', color: '#fbbf24', padding: '0.35rem 0.65rem', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          ⭐ {loyaltyPoints || 850} Pts
        </div>

        <button 
          className="icon-btn" 
          title="Customize Theme & Colors"
          onClick={onOpenThemeModal}
        >
          <Palette size={18} />
        </button>

        {user?.isLoggedIn ? (
          <button 
            className="nav-link-btn"
            style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '20px' }}
            onClick={() => setActiveTab('profile')}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover' }} 
            />
            <span>{user.name.split(' ')[0]}</span>
          </button>
        ) : (
          <button className="btn-primary" onClick={() => openAuth('login')}>
            <User size={16} /> Sign In
          </button>
        )}
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

      {/* Theatre Staff Gate Scanner Modal */}
      <StaffScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </nav>
  );
};
