import React from 'react';
import { Smile } from 'lucide-react';
import { MOODS } from '../data/moviesData';
import { useMovie } from '../context/MovieContext';

export const MoodSelector = ({ onSelectMood }) => {
  const { filters, setFilters } = useMovie();

  const handleMoodClick = (moodId) => {
    const nextMood = filters.mood === moodId ? 'All' : moodId;
    setFilters(prev => ({ ...prev, mood: nextMood }));
    if (onSelectMood) onSelectMood(nextMood);
  };

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div className="section-header" style={{ marginBottom: '1.2rem' }}>
        <h2 className="section-title">
          <Smile size={22} style={{ color: 'var(--primary-color)' }} /> 
          AI Mood Detection — How are you feeling today?
        </h2>
        {filters.mood !== 'All' && (
          <button 
            className="btn-secondary" 
            style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => handleMoodClick('All')}
          >
            Clear Mood Filter ({filters.mood})
          </button>
        )}
      </div>

      <div className="mood-grid">
        {MOODS.map(mood => {
          const isActive = filters.mood === mood.id;
          return (
            <div
              key={mood.id}
              className={`mood-card ${isActive ? 'active' : ''}`}
              onClick={() => handleMoodClick(mood.id)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label" style={{ color: isActive ? 'var(--primary-color)' : 'var(--text-main)' }}>
                {mood.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
