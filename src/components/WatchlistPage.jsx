import React, { useState } from 'react';
import { Bookmark, Heart, Check, Download, Upload, Trash2, Film } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { useMovie } from '../context/MovieContext';

export const WatchlistPage = () => {
  const { movies, watchlist, favorites, watchedHistory, showToast } = useMovie();
  const [activeTab, setActiveTab] = useState('watchlist'); // 'watchlist' | 'favorites' | 'history'

  let displayMovies = [];
  if (activeTab === 'watchlist') {
    displayMovies = movies.filter(m => watchlist.includes(m.id));
  } else if (activeTab === 'favorites') {
    displayMovies = movies.filter(m => favorites.includes(m.id));
  } else if (activeTab === 'history') {
    displayMovies = movies.filter(m => watchedHistory.some(w => w.id === m.id));
  }

  const exportData = () => {
    const data = JSON.stringify({ watchlist, favorites, watchedHistory }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cineai_movie_library.json';
    a.click();
    showToast("Offline library exported successfully!");
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bookmark size={28} style={{ color: 'var(--primary-color)' }} />
            My Movie Library
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage your personal Watchlist, Favorites, and Watched History.
          </p>
        </div>

        <button className="btn-secondary" onClick={exportData}>
          <Download size={16} /> Export Offline Backup
        </button>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <button
          className={`nav-link-btn ${activeTab === 'watchlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('watchlist')}
        >
          <Bookmark size={18} /> Watchlist ({watchlist.length})
        </button>
        <button
          className={`nav-link-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={18} /> Favorites ({favorites.length})
        </button>
        <button
          className={`nav-link-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Check size={18} /> Watched History ({watchedHistory.length})
        </button>
      </div>

      {/* Grid */}
      {displayMovies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
          <Film size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>No Movies in this collection</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Explore the catalog and bookmark movies to see them here.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {displayMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
