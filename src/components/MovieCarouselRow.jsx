import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './MovieCard';

export const MovieCarouselRow = ({ title, icon, movies }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="carousel-row">
      <div className="section-header">
        <h2 className="section-title">
          {icon} {title}
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>
            ({movies.length})
          </span>
        </h2>

        <div className="carousel-controls">
          <button className="icon-btn" onClick={() => scroll('left')} title="Previous">
            <ChevronLeft size={18} />
          </button>
          <button className="icon-btn" onClick={() => scroll('right')} title="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="carousel-grid" ref={scrollRef}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
