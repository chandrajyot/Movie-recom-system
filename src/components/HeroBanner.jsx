import React, { useState } from 'react';
import { Play, Plus, Check, Star, Sparkles, ChevronRight, Info } from 'lucide-react';
import { useMovie } from '../context/MovieContext';

export const HeroBanner = () => {
  const { movies, watchlist, toggleWatchlist, setSelectedMovieModal } = useMovie();
  const safeMovies = Array.isArray(movies) ? movies.filter(m => m && m.id) : [];
  const featuredMovies = safeMovies.filter(m => m.trending).slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const movie = featuredMovies[currentIndex] || safeMovies[0];
  if (!movie) return null;

  const safeWatchlist = Array.isArray(watchlist) ? watchlist : [];
  const isBookmarked = safeWatchlist.includes(movie.id);
  const safeGenres = Array.isArray(movie.genres) ? movie.genres : [];

  return (
    <div 
      className="hero-banner"
      style={{ backgroundImage: `url(${movie.backdrop})` }}
    >
      <div className="hero-overlay" />

      <div className="hero-content">
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge-pill">
            <Sparkles size={12} /> #1 TRENDING TODAY
          </span>
          <span className="badge-pill match-badge">
            {movie.matchScore || 95}% AI MATCH
          </span>
        </div>

        <h1 className="hero-title">{movie.title}</h1>

        <div className="hero-meta">
          <div className="hero-meta-item">
            <Star size={16} fill="#fbbf24" color="#fbbf24" />
            <strong style={{ color: '#fff' }}>{movie.imdbRating}</strong> / 10
          </div>
          <span>•</span>
          <span>{movie.releaseYear}</span>
          <span>•</span>
          <span>{movie.runtime}</span>
          <span>•</span>
          <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{safeGenres.join(', ')}</span>
        </div>

        <p className="hero-overview">{movie.overview}</p>

        <div className="hero-actions">
          <button 
            className="btn-primary" 
            onClick={() => setSelectedMovieModal(movie)}
          >
            <Play size={18} fill="#fff" /> Watch Trailer
          </button>

          <button 
            className="btn-secondary" 
            onClick={() => toggleWatchlist(movie.id)}
          >
            {isBookmarked ? <Check size={18} style={{ color: '#10b981' }} /> : <Plus size={18} />}
            {isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}
          </button>

          <button 
            className="btn-secondary"
            onClick={() => setSelectedMovieModal(movie)}
            title="More Details"
          >
            <Info size={18} /> Details
          </button>
        </div>

        {/* Carousel indicators */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1.5rem' }}>
          {featuredMovies.map((m, idx) => (
            <div 
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: idx === currentIndex ? 'var(--primary-color)' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
