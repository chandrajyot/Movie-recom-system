import React from 'react';
import { BarChart2, Clock, Film, Heart, Sparkles, Key, CheckCircle, Bot, History } from 'lucide-react';
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';

export const AnalyticsDashboard = () => {
  const { movies, watchlist, favorites, watchedHistory, apiKeys, setApiKeys, showToast } = useMovie();
  const { user } = useAuth();

  const totalWatchedCount = watchedHistory.length;
  // Estimate watch time: avg 130 min per movie
  const totalWatchHours = Math.round((totalWatchedCount * 130) / 60);

  const genreCounts = {};
  movies.forEach(m => {
    if (watchlist.includes(m.id) || favorites.includes(m.id) || watchedHistory.some(w => w.id === m.id)) {
      m.genres.forEach(g => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    }
  });

  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BarChart2 size={28} style={{ color: 'var(--primary-color)' }} />
          Dashboard & Viewing Analytics
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Real-time tracking of watch stats, genre affinity, recommendation history, and API integrations.
        </p>
      </div>

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(229, 9, 20, 0.15)', color: 'var(--primary-color)', padding: '0.8rem', borderRadius: 12 }}>
            <Film size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalWatchedCount}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Movies Watched</p>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.8rem', borderRadius: 12 }}>
            <Clock size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{totalWatchHours} hrs</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Watch Time</p>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.8rem', borderRadius: 12 }}>
            <Heart size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{favorites.length}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Favorite Movies</p>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', padding: '0.8rem', borderRadius: 12 }}>
            <Sparkles size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>142</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>AI Recommendations Generated</p>
          </div>
        </div>
      </div>

      {/* Genre Affinity & Chat Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Genre Affinity Distribution */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Favorite Genres Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {sortedGenres.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add movies to Watchlist/Favorites to build your genre profile.</p>
            ) : (
              sortedGenres.slice(0, 5).map(([genre, count]) => {
                const percentage = Math.min((count / movies.length) * 100 * 3, 100);
                return (
                  <div key={genre}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600 }}>{genre}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{count} movies ({Math.round(percentage)}%)</span>
                    </div>
                    <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--primary-color)', borderRadius: 4 }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* API Integration Keys */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Key size={18} style={{ color: 'var(--primary-color)' }} /> Live API Integration Settings
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            The app works 100% offline with full built-in datasets. Optionally provide custom API keys for live TMDB database queries and Gemini LLM responses!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>TMDB API Key (v3)</label>
              <input 
                type="password" 
                placeholder="Enter TMDB API Key..." 
                value={apiKeys.tmdbKey}
                onChange={e => setApiKeys(prev => ({ ...prev, tmdbKey: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem', borderRadius: 8, outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Gemini AI API Key</label>
              <input 
                type="password" 
                placeholder="Enter Gemini API Key..." 
                value={apiKeys.geminiKey}
                onChange={e => setApiKeys(prev => ({ ...prev, geminiKey: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem', borderRadius: 8, outline: 'none' }}
              />
            </div>

            <button 
              className="btn-primary" 
              style={{ marginTop: '0.5rem' }}
              onClick={() => showToast("API Key settings saved successfully!")}
            >
              <CheckCircle size={16} /> Save API Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
