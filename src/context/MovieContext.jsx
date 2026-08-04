import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MOVIES } from '../data/moviesData';

const MovieContext = createContext();

const DEFAULT_FILTERS = {
  searchQuery: '',
  genre: 'All',
  mood: 'All',
  language: 'All',
  minRating: 0,
  maxRuntime: 300,
  yearStart: 1990,
  yearEnd: 2026,
  platform: 'All',
  country: 'All'
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_movies_list');
      const parsed = saved ? JSON.parse(saved) : null;
      return (Array.isArray(parsed) && parsed.length > 0) ? parsed : INITIAL_MOVIES;
    } catch (e) {
      return INITIAL_MOVIES;
    }
  });

  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_watchlist');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [1, 3, 7];
    } catch (e) {
      return [1, 3, 7];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_favorites');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [1, 2, 5];
    } catch (e) {
      return [1, 2, 5];
    }
  });

  const [watchedHistory, setWatchedHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_watched_history');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [
        { id: 2, watchedAt: '2026-08-01' },
        { id: 5, watchedAt: '2026-08-02' }
      ];
    } catch (e) {
      return [{ id: 2, watchedAt: '2026-08-01' }];
    }
  });

  const [notInterested, setNotInterested] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_not_interested');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_movie_reviews');
      const parsed = saved ? JSON.parse(saved) : null;
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (e) {
      return {};
    }
  });

  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_api_keys');
      const parsed = saved ? JSON.parse(saved) : null;
      return (parsed && typeof parsed === 'object') ? parsed : { tmdbKey: '', geminiKey: '', useTmdbLive: false };
    } catch (e) {
      return { tmdbKey: '', geminiKey: '', useTmdbLive: false };
    }
  });

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedMovieModal, setSelectedMovieModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try { localStorage.setItem('cine_watchlist', JSON.stringify(watchlist)); } catch (e) {}
  }, [watchlist]);

  useEffect(() => {
    try { localStorage.setItem('cine_favorites', JSON.stringify(favorites)); } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try { localStorage.setItem('cine_watched_history', JSON.stringify(watchedHistory)); } catch (e) {}
  }, [watchedHistory]);

  useEffect(() => {
    try { localStorage.setItem('cine_not_interested', JSON.stringify(notInterested)); } catch (e) {}
  }, [notInterested]);

  useEffect(() => {
    try { localStorage.setItem('cine_movie_reviews', JSON.stringify(reviews)); } catch (e) {}
  }, [reviews]);

  useEffect(() => {
    try { localStorage.setItem('cine_api_keys', JSON.stringify(apiKeys)); } catch (e) {}
  }, [apiKeys]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleWatchlist = (movieId) => {
    setWatchlist(prev => {
      const list = Array.isArray(prev) ? prev : [];
      const exists = list.includes(movieId);
      const next = exists ? list.filter(id => id !== movieId) : [...list, movieId];
      const movie = (Array.isArray(movies) ? movies : INITIAL_MOVIES).find(m => m.id === movieId);
      showToast(exists ? `Removed "${movie?.title || 'Movie'}" from Watchlist` : `Added "${movie?.title || 'Movie'}" to Watchlist`);
      return next;
    });
  };

  const toggleFavorite = (movieId) => {
    setFavorites(prev => {
      const list = Array.isArray(prev) ? prev : [];
      const exists = list.includes(movieId);
      const next = exists ? list.filter(id => id !== movieId) : [...list, movieId];
      const movie = (Array.isArray(movies) ? movies : INITIAL_MOVIES).find(m => m.id === movieId);
      showToast(exists ? `Removed "${movie?.title || 'Movie'}" from Favorites` : `Added "${movie?.title || 'Movie'}" to Favorites`);
      return next;
    });
  };

  const markAsWatched = (movieId) => {
    setWatchedHistory(prev => {
      const list = Array.isArray(prev) ? prev : [];
      const exists = list.some(item => item.id === movieId);
      if (!exists) {
        const movie = (Array.isArray(movies) ? movies : INITIAL_MOVIES).find(m => m.id === movieId);
        showToast(`Marked "${movie?.title || 'Movie'}" as Watched!`);
        return [{ id: movieId, watchedAt: new Date().toISOString().split('T')[0] }, ...list];
      }
      return list;
    });
  };

  const markNotInterested = (movieId) => {
    setNotInterested(prev => {
      const list = Array.isArray(prev) ? prev : [];
      if (!list.includes(movieId)) {
        showToast("We'll recommend fewer movies like this.");
        return [...list, movieId];
      }
      return list;
    });
  };

  const addReview = (movieId, reviewData) => {
    const newRev = {
      id: `rev_${Date.now()}`,
      author: reviewData.author || 'Anonymous User',
      rating: reviewData.rating || 5,
      comment: reviewData.comment || '',
      upvotes: 0,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => ({
      ...prev,
      [movieId]: [newRev, ...((prev && prev[movieId]) || [])]
    }));
    showToast("Review submitted successfully!");
  };

  const upvoteReview = (movieId, reviewId) => {
    setReviews(prev => {
      const list = (prev && prev[movieId]) || [];
      const updated = list.map(r => r.id === reviewId ? { ...r, upvotes: r.upvotes + 1 } : r);
      return { ...prev, [movieId]: updated };
    });
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // Safe filtered movies calculation
  const safeMovies = Array.isArray(movies) ? movies : INITIAL_MOVIES;
  const safeNotInterested = Array.isArray(notInterested) ? notInterested : [];

  const filteredMovies = safeMovies.filter(movie => {
    if (!movie) return false;
    if (safeNotInterested.includes(movie.id)) return false;
    
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = movie.title?.toLowerCase().includes(q);
      const matchDirector = movie.director?.toLowerCase().includes(q);
      const matchActor = Array.isArray(movie.actors) && movie.actors.some(a => a.toLowerCase().includes(q));
      const matchGenre = Array.isArray(movie.genres) && movie.genres.some(g => g.toLowerCase().includes(q));
      if (!matchTitle && !matchDirector && !matchActor && !matchGenre) return false;
    }

    if (filters.genre !== 'All' && Array.isArray(movie.genres) && !movie.genres.includes(filters.genre)) return false;
    if (filters.mood !== 'All' && Array.isArray(movie.moods) && !movie.moods.includes(filters.mood)) return false;
    if (filters.language !== 'All' && movie.language !== filters.language) return false;
    if (filters.platform !== 'All' && (!movie.streamingPlatforms || !movie.streamingPlatforms.includes(filters.platform))) return false;
    if (movie.imdbRating < filters.minRating) return false;
    if (movie.runtimeMinutes && movie.runtimeMinutes > filters.maxRuntime) return false;
    if (movie.releaseYear < filters.yearStart || movie.releaseYear > filters.yearEnd) return false;

    return true;
  });

  return (
    <MovieContext.Provider value={{
      movies: safeMovies,
      filteredMovies,
      watchlist,
      favorites,
      watchedHistory,
      notInterested: safeNotInterested,
      reviews,
      filters,
      setFilters,
      resetFilters,
      toggleWatchlist,
      toggleFavorite,
      markAsWatched,
      markNotInterested,
      addReview,
      upvoteReview,
      selectedMovieModal,
      setSelectedMovieModal,
      apiKeys,
      setApiKeys,
      toastMessage,
      showToast
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
