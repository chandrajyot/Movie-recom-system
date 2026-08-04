import React, { useState } from 'react';
import { X, Star, Play, Heart, Bookmark, Check, ThumbsUp, Flag, Send, Tv, Film } from 'lucide-react';
import { useMovie } from '../context/MovieContext';

export const MovieDetailsModal = () => {
  const { 
    selectedMovieModal, 
    setSelectedMovieModal, 
    watchlist, 
    favorites, 
    watchedHistory, 
    toggleWatchlist, 
    toggleFavorite, 
    markAsWatched,
    reviews,
    addReview,
    upvoteReview,
    movies
  } = useMovie();

  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');

  if (!selectedMovieModal) return null;

  const movie = selectedMovieModal;
  const isBookmarked = watchlist.includes(movie.id);
  const isFav = favorites.includes(movie.id);
  const isWatched = watchedHistory.some(i => i.id === movie.id);
  const movieReviews = reviews[movie.id] || [];

  const similarMovies = movies.filter(m => 
    m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))
  ).slice(0, 3);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(movie.id, {
      author: authorName || 'Anonymous Cinephile',
      rating: newRating,
      comment: newComment
    });
    setNewComment('');
  };

  return (
    <div className="modal-overlay" onClick={() => { setIsPlayingTrailer(false); setSelectedMovieModal(null); }}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={() => { setIsPlayingTrailer(false); setSelectedMovieModal(null); }}
        >
          <X size={20} />
        </button>

        {/* Video Trailer or Backdrop Header */}
        <div style={{ position: 'relative', width: '100%', height: '360px', background: '#000' }}>
          {isPlayingTrailer ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movie.trailerYoutubeId}?autoplay=1`}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img 
                src={movie.backdrop} 
                alt={movie.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--bg-card) 0%, transparent 80%)' }} />

              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button 
                  className="btn-primary" 
                  style={{ borderRadius: '50%', width: 70, height: 70, padding: 0, justifyContent: 'center' }}
                  onClick={() => setIsPlayingTrailer(true)}
                >
                  <Play size={30} fill="#fff" style={{ marginLeft: 4 }} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Details Content */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <img 
              src={movie.poster} 
              alt={movie.title} 
              style={{ width: 140, height: 210, borderRadius: 12, objectFit: 'cover', border: '1px solid var(--border-color)', marginTop: '-80px', position: 'relative', zindex: 5 }} 
            />

            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{movie.title}</h1>
                <div style={{ background: '#10b981', color: '#fff', fontSize: '0.8rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: 6 }}>
                  {movie.matchScore || 95}% Match
                </div>
              </div>

              {movie.tagline && (
                <p style={{ fontStyle: 'italic', color: 'var(--primary-color)', marginBottom: '0.8rem', fontSize: '0.92rem' }}>
                  "{movie.tagline}"
                </p>
              )}

              <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontWeight: 700 }}>
                  <Star size={16} fill="#fbbf24" /> {movie.imdbRating} / 10 IMDb
                </span>
                <span>•</span>
                <span>🍅 Rotten Tomatoes: {movie.rottenTomatoes}</span>
                <span>•</span>
                <span>{movie.releaseYear}</span>
                <span>•</span>
                <span>{movie.runtime}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button className="btn-primary" onClick={() => setIsPlayingTrailer(true)}>
                  <Play size={16} fill="#fff" /> Watch Trailer
                </button>
                <button className="btn-secondary" onClick={() => toggleWatchlist(movie.id)}>
                  <Bookmark size={16} fill={isBookmarked ? '#fff' : 'none'} />
                  {isBookmarked ? 'In Watchlist' : 'Add Watchlist'}
                </button>
                <button className="btn-secondary" onClick={() => toggleFavorite(movie.id)}>
                  <Heart size={16} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : '#fff'} />
                </button>
                <button className="btn-secondary" onClick={() => markAsWatched(movie.id)}>
                  <Check size={16} color={isWatched ? '#10b981' : '#fff'} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Overview</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontSize: '0.95rem' }}>{movie.overview}</p>
          </div>

          {/* Cast & Director */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Cast & Director</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              <strong>Director:</strong> {movie.director}
            </p>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {movie.cast?.map((member, idx) => (
                <div key={idx} style={{ flex: '0 0 100px', textAlign: 'center' }}>
                  <img src={member.photo} alt={member.name} style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginBottom: '0.3rem' }} />
                  <p style={{ fontSize: '0.78rem', fontWeight: 600 }}>{member.name}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{member.character}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Streaming Platforms */}
          {movie.streamingPlatforms && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Tv size={18} style={{ color: 'var(--primary-color)' }} /> Streaming Availability
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {movie.streamingPlatforms.map(platform => (
                  <span key={platform} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', padding: '0.35rem 0.75rem', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600 }}>
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* User Reviews & Ratings */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
              User Reviews & Ratings ({movieReviews.length})
            </h3>

            {/* Write Review Form */}
            <form onSubmit={handleSubmitReview} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 12, marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                <input 
                  type="text" 
                  placeholder="Your Name (optional)" 
                  value={authorName} 
                  onChange={e => setAuthorName(e.target.value)} 
                  style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem 0.75rem', borderRadius: 8, outline: 'none' }}
                />
                <select 
                  value={newRating} 
                  onChange={e => setNewRating(Number(e.target.value))} 
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem 0.75rem', borderRadius: 8, outline: 'none' }}
                >
                  <option value="5" style={{ background: '#181820' }}>⭐ 5 - Masterpiece</option>
                  <option value="4" style={{ background: '#181820' }}>⭐ 4 - Great</option>
                  <option value="3" style={{ background: '#181820' }}>⭐ 3 - Average</option>
                  <option value="2" style={{ background: '#181820' }}>⭐ 2 - Poor</option>
                  <option value="1" style={{ background: '#181820' }}>⭐ 1 - Terrible</option>
                </select>
              </div>
              <textarea 
                placeholder="Write your honest review..." 
                rows="2" 
                value={newComment} 
                onChange={e => setNewComment(e.target.value)} 
                style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem', borderRadius: 8, outline: 'none', resize: 'none', marginBottom: '0.5rem' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                <Send size={14} /> Submit Review
              </button>
            </form>

            {/* Existing Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {movieReviews.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No reviews yet. Be the first to review!</p>
              ) : (
                movieReviews.map(rev => (
                  <div key={rev.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <strong style={{ fontSize: '0.9rem' }}>{rev.author}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#fbbf24' }}>{'⭐'.repeat(rev.rating)}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', marginBottom: '0.5rem' }}>{rev.comment}</p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <button onClick={() => upvoteReview(movie.id, rev.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <ThumbsUp size={12} /> {rev.upvotes} Helpful
                      </button>
                      <span>• {rev.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Similar Movies You Might Like</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {similarMovies.map(sim => (
                  <div 
                    key={sim.id} 
                    style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                    onClick={() => setSelectedMovieModal(sim)}
                  >
                    <img src={sim.poster} alt={sim.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                    <div style={{ padding: '0.5rem' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sim.title}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sim.releaseYear} • ⭐ {sim.imdbRating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
