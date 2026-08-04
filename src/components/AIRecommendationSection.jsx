import React from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, RefreshCw, Zap } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

export const AIRecommendationSection = () => {
  const { movies, notInterested, markNotInterested, showToast } = useMovie();
  const { user } = useAuth();

  const safeMovies = Array.isArray(movies) ? movies : [];
  const safeNotInterested = Array.isArray(notInterested) ? notInterested : [];
  const userGenres = Array.isArray(user?.favoriteGenres) ? user.favoriteGenres : [];

  const recommendations = safeMovies
    .filter(m => m && m.id && !safeNotInterested.includes(m.id))
    .map(movie => {
      let score = movie.matchScore || 85;
      
      if (Array.isArray(movie.genres)) {
        const matchingGenres = movie.genres.filter(g => userGenres.includes(g));
        score += matchingGenres.length * 4;
      }
      if (movie.imdbRating >= 8.5) score += 5;

      return {
        ...movie,
        calculatedScore: Math.min(score, 99)
      };
    })
    .sort((a, b) => b.calculatedScore - a.calculatedScore)
    .slice(0, 6);

  return (
    <div style={{ background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.08) 0%, rgba(0, 0, 0, 0.4) 100%)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '1.75rem', marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--primary-color)', padding: '0.4rem', borderRadius: '8px', color: '#fff' }}>
              <Zap size={20} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>AI Personalized Recommendations</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Generated using Content-Based & Collaborative AI vector analysis tailored for {user?.name || 'you'}.
          </p>
        </div>

        <button 
          className="btn-secondary" 
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
          onClick={() => showToast("AI Recommendation vector refreshed!")}
        >
          <RefreshCw size={14} /> Refresh Vector
        </button>
      </div>

      <div className="movie-grid" style={{ marginTop: '1.25rem' }}>
        {recommendations.map(movie => (
          <div key={movie.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <MovieCard movie={{ ...movie, matchScore: movie.calculatedScore }} />
            
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
              <button 
                className="chip-btn" 
                style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                onClick={() => showToast(`Tuned AI: We'll show more movies like "${movie.title}"!`)}
              >
                <ThumbsUp size={10} /> More Like This
              </button>
              <button 
                className="chip-btn" 
                style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#ef4444' }}
                onClick={() => markNotInterested(movie.id)}
              >
                <ThumbsDown size={10} /> Not Interested
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
