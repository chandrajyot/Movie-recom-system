import React from 'react';
import { Filter, RotateCcw, Star, Calendar, Clock, Globe, Tv } from 'lucide-react';
import { GENRES, LANGUAGES, STREAMING_PROVIDERS } from '../data/moviesData';
import { useMovie } from '../context/MovieContext';

export const AdvancedFilterDrawer = () => {
  const { filters, setFilters, resetFilters, filteredMovies } = useMovie();

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Filter size={20} style={{ color: 'var(--primary-color)' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Advanced Filters & Refinements</h3>
          <span style={{ fontSize: '0.82rem', background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.6rem', borderRadius: 12, color: 'var(--text-muted)' }}>
            {filteredMovies.length} movies found
          </span>
        </div>

        <button className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }} onClick={resetFilters}>
          <RotateCcw size={14} /> Reset Filters
        </button>
      </div>

      {/* Genre Pills */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Genre</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          <button
            className={`chip-btn ${filters.genre === 'All' ? 'active' : ''}`}
            style={{ background: filters.genre === 'All' ? 'var(--primary-color)' : 'rgba(255,255,255,0.06)' }}
            onClick={() => setFilters(prev => ({ ...prev, genre: 'All' }))}
          >
            All Genres
          </button>
          {GENRES.map(g => (
            <button
              key={g}
              className={`chip-btn ${filters.genre === g ? 'active' : ''}`}
              style={{ background: filters.genre === g ? 'var(--primary-color)' : 'rgba(255,255,255,0.06)' }}
              onClick={() => setFilters(prev => ({ ...prev, genre: g }))}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {/* IMDb Rating Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={14} fill="#fbbf24" color="#fbbf24" /> Min IMDb Rating</span>
            <strong style={{ color: 'var(--primary-color)' }}>{filters.minRating}+ IMDb</strong>
          </div>
          <input 
            type="range" 
            min="0" 
            max="9" 
            step="0.5"
            value={filters.minRating}
            onChange={e => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
            style={{ width: '100%', accentColor: 'var(--primary-color)', cursor: 'pointer' }}
          />
        </div>

        {/* Max Runtime Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> Max Runtime</span>
            <strong style={{ color: 'var(--primary-color)' }}>{filters.maxRuntime === 300 ? 'Any Runtime' : `< ${filters.maxRuntime} min`}</strong>
          </div>
          <input 
            type="range" 
            min="90" 
            max="300" 
            step="10"
            value={filters.maxRuntime}
            onChange={e => setFilters(prev => ({ ...prev, maxRuntime: Number(e.target.value) }))}
            style={{ width: '100%', accentColor: 'var(--primary-color)', cursor: 'pointer' }}
          />
        </div>

        {/* Language Dropdown */}
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', gap: '0.3rem' }}>
            <Globe size={14} style={{ display: 'inline', marginRight: 4 }} /> Language
          </label>
          <select
            value={filters.language}
            onChange={e => setFilters(prev => ({ ...prev, language: e.target.value }))}
            style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem', borderRadius: 8, outline: 'none' }}
          >
            <option value="All" style={{ background: '#181820' }}>All Languages</option>
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang} style={{ background: '#181820' }}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Streaming Service */}
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            <Tv size={14} style={{ display: 'inline', marginRight: 4 }} /> Streaming Platform
          </label>
          <select
            value={filters.platform}
            onChange={e => setFilters(prev => ({ ...prev, platform: e.target.value }))}
            style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem', borderRadius: 8, outline: 'none' }}
          >
            <option value="All" style={{ background: '#181820' }}>All Platforms</option>
            {STREAMING_PROVIDERS.map(p => (
              <option key={p} value={p} style={{ background: '#181820' }}>{p}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
