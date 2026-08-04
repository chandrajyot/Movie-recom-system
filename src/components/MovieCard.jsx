import React from 'react';
import { Star, Heart, Bookmark, Check, Play, Ticket } from 'lucide-react';
import { useMovie } from '../context/MovieContext';
import { useBooking } from '../context/BookingContext';

export const MovieCard = ({ movie }) => {
  const { 
    watchlist, 
    favorites, 
    watchedHistory, 
    toggleWatchlist, 
    toggleFavorite, 
    markAsWatched, 
    setSelectedMovieModal 
  } = useMovie();

  const { initiateBooking } = useBooking();

  if (!movie || !movie.id) return null;

  const safeWatchlist = Array.isArray(watchlist) ? watchlist : [];
  const safeFavorites = Array.isArray(favorites) ? favorites : [];
  const safeWatched = Array.isArray(watchedHistory) ? watchedHistory : [];

  const isBookmarked = safeWatchlist.includes(movie.id);
  const isFav = safeFavorites.includes(movie.id);
  const isWatched = safeWatched.some(item => item && item.id === movie.id);
  const safeGenres = Array.isArray(movie.genres) ? movie.genres : [];

  return (
    <div className="movie-card" onClick={() => setSelectedMovieModal(movie)}>
      <div className="card-poster-wrapper">
        <img src={movie.poster || ''} alt={movie.title || 'Movie'} className="card-poster" loading="lazy" />

        <div className="card-top-badges">
          <div className="rating-tag">
            <Star size={12} fill="#fbbf24" color="#fbbf24" />
            <span>{movie.imdbRating || '8.0'}</span>
          </div>
          {movie.matchScore && (
            <div className="match-tag">
              {movie.matchScore}% Match
            </div>
          )}
        </div>

        {/* Hover overlay action buttons */}
        <div className="card-overlay-actions" onClick={e => e.stopPropagation()}>
          <button 
            className="icon-btn" 
            style={{ background: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
            onClick={() => initiateBooking(movie)}
            title="Book Ticket"
          >
            <Ticket size={18} fill="#fff" />
          </button>

          <button 
            className="icon-btn" 
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setSelectedMovieModal(movie)}
            title="Play Trailer"
          >
            <Play size={18} fill="#fff" />
          </button>

          <button 
            className="icon-btn" 
            style={{ background: isFav ? '#ef4444' : 'rgba(0,0,0,0.6)' }}
            onClick={() => toggleFavorite(movie.id)}
            title={isFav ? "Remove Favorite" : "Add Favorite"}
          >
            <Heart size={16} fill={isFav ? '#fff' : 'none'} color="#fff" />
          </button>

          <button 
            className="icon-btn" 
            style={{ background: isBookmarked ? 'var(--primary-color)' : 'rgba(0,0,0,0.6)' }}
            onClick={() => toggleWatchlist(movie.id)}
            title={isBookmarked ? "In Watchlist" : "Add Watchlist"}
          >
            <Bookmark size={16} fill={isBookmarked ? '#fff' : 'none'} color="#fff" />
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title" title={movie.title}>{movie.title}</h3>
        
        <div className="card-info">
          <span>{movie.releaseYear}</span>
          <span>•</span>
          <span>{movie.runtime}</span>
          <span>•</span>
          <span style={{ color: '#10b981', fontWeight: 600 }}>{movie.language}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
          <div className="genre-tags" style={{ margin: 0 }}>
            {safeGenres.slice(0, 2).map((g, idx) => (
              <span key={idx} className="mini-genre">{g}</span>
            ))}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); initiateBooking(movie); }}
            style={{
              background: 'var(--primary-color)',
              color: '#fff',
              border: 'none',
              padding: '0.2rem 0.55rem',
              borderRadius: 6,
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <Ticket size={10} /> Book
          </button>
        </div>
      </div>
    </div>
  );
};
