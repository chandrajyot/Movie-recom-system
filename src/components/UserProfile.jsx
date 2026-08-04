import React, { useState } from 'react';
import { User, Mail, Calendar, Heart, LogOut, Check, Camera, Edit3, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GENRES } from '../data/moviesData';
import { useMovie } from '../context/MovieContext';

export const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { showToast } = useMovie();

  const [phone, setPhone] = useState(user?.phone || '+91 7319780271');
  const [bio, setBio] = useState(user?.bio || '');
  const [selectedFavGenres, setSelectedFavGenres] = useState(user?.favoriteGenres || []);

  const toggleGenre = (genre) => {
    setSelectedFavGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const handleSave = () => {
    updateProfile({ phone, bio, favoriteGenres: selectedFavGenres });
    showToast("Profile preferences & phone number updated!");
  };

  if (!user || !user.isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2>Please sign in to view your user profile.</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-color)', boxShadow: 'var(--shadow-glow)' }} 
            />
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{user.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <Mail size={14} /> {user.email}
            </p>
            <p style={{ color: '#10b981', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <Phone size={14} /> {user.phone || '+91 7319780271'} (SMS Alerts Verified ✓)
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
              <Calendar size={14} /> Member since {user.joinedDate}
            </p>
          </div>

          <button className="btn-secondary" style={{ color: '#ef4444' }} onClick={logout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Mobile Phone Number */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            Mobile Phone Number for SMS Alerts & OTP Authentication
          </label>
          <input 
            type="text" 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            placeholder="+91 7319780271"
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--primary-color)', color: '#fff', padding: '0.65rem', borderRadius: 8, outline: 'none', fontWeight: 700 }}
          />
        </div>

        {/* Edit Bio */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            About Bio
          </label>
          <input 
            type="text" 
            value={bio} 
            onChange={e => setBio(e.target.value)} 
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem', borderRadius: 8, outline: 'none' }}
          />
        </div>

        {/* Preferred Genres Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Favorite Genres (Drives AI Recommendation Scoring)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {GENRES.map(g => {
              const isSelected = selectedFavGenres.includes(g);
              return (
                <button
                  key={g}
                  className="chip-btn"
                  style={{
                    background: isSelected ? 'var(--primary-color)' : 'rgba(255,255,255,0.06)',
                    borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)'
                  }}
                  onClick={() => toggleGenre(g)}
                >
                  {isSelected && <Check size={12} style={{ marginRight: 4 }} />}
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <button className="btn-primary" onClick={handleSave}>
          Save Profile Preferences
        </button>
      </div>
    </div>
  );
};
