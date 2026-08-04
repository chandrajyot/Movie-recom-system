import React, { useState } from 'react';
import { X, MapPin, Tv, Clock, Star, Ticket, ChevronRight, Navigation, Map, Plus, Search, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useMovie } from '../../context/MovieContext';

export const TheatreShowSelector = () => {
  const { 
    selectedBookingMovie, 
    selectedState,
    setSelectedState,
    selectedCity, 
    setSelectedCity,
    currencySymbol,
    setCurrencySymbol,
    INDIAN_STATES, 
    customCitiesByState,
    addCustomCity,
    CINEMA_HALLS_DATABASE, 
    selectTheatreAndShow, 
    closeBookingModal 
  } = useBooking();

  const [activeMapTheatreId, setActiveMapTheatreId] = useState(null);
  const [newCityInput, setNewCityInput] = useState('');
  const [showAddCityInput, setShowAddCityInput] = useState(false);

  if (!selectedBookingMovie) return null;

  const movie = selectedBookingMovie;

  // Cities for currently selected state
  const availableCities = customCitiesByState[selectedState] || ["Phagwara", "Jalandhar", "Ludhiana"];

  // Filter cinema halls for selected city
  let cityTheatres = CINEMA_HALLS_DATABASE.filter(t => 
    t.city.toLowerCase() === selectedCity.toLowerCase()
  );

  // Dynamic fallback for custom user-added cities
  if (cityTheatres.length === 0) {
    cityTheatres = [
      {
        id: `th_custom_${selectedCity}`,
        name: `PVR Grand Multiplex ${selectedCity}`,
        city: selectedCity,
        state: selectedState,
        address: `Main GT Road, Center Mall, ${selectedCity}, ${selectedState}`,
        distance: "0.8 km from City Center",
        rating: 4.8,
        facilities: ["4K RGB Laser", "Dolby Atmos 7.1", "Gourmet Food Court", "Recliner Lounge", "Parking"],
        mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(selectedCity + ' ' + selectedState)}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
        screens: [
          { screenNo: "Screen 1 (4K Laser)", screenType: "Dolby Atmos" },
          { screenNo: "Screen 2 (VIP)", screenType: "Recliner Lounge" }
        ]
      },
      {
        id: `th_custom2_${selectedCity}`,
        name: `INOX Prime Cinema ${selectedCity}`,
        city: selectedCity,
        state: selectedState,
        address: `Model Town Market, ${selectedCity}, ${selectedState}`,
        distance: "1.5 km away",
        rating: 4.7,
        facilities: ["Dolby Atmos", "Food Court", "Arcade Zone", "Free Parking"],
        mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(selectedCity + ' Punjab')}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
        screens: [
          { screenNo: "Auditorium 1", screenType: "Dolby Digital" }
        ]
      }
    ];
  }

  // Dynamic Movie Shows & Formats
  const movieShows = Array.isArray(movie.shows) && movie.shows.length > 0 ? movie.shows : [
    { time: "10:15 AM", format: "2D", type: "Morning Show", price: "₹180" },
    { time: "01:45 PM", format: "Dolby 7.1", type: "Matinee Show", price: "₹250" },
    { time: "05:30 PM", format: "4K Laser", type: "Evening Prime", price: "₹380" },
    { time: "09:15 PM", format: "VIP Recliner", type: "Night Show", price: "₹450" }
  ];

  const handleAddCitySubmit = (e) => {
    e.preventDefault();
    if (!newCityInput.trim()) return;
    addCustomCity(selectedState, newCityInput.trim());
    setNewCityInput('');
    setShowAddCityInput(false);
  };

  return (
    <div className="modal-overlay" onClick={closeBookingModal}>
      <div className="modal-content" style={{ maxWidth: '920px', padding: '2rem', background: 'var(--bg-card)' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeBookingModal}>
          <X size={20} />
        </button>

        {/* Movie Header Spotlight */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
          <img src={movie.poster} alt={movie.title} style={{ width: 75, height: 105, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border-color)' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
              <span className="badge-pill" style={{ margin: 0, padding: '0.2rem 0.6rem', fontSize: '0.72rem', background: 'var(--primary-color)' }}>
                🎟️ SELECT THEATRE & SHOWTIME
              </span>
              <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                {movie.language} ({movie.country}) • {movie.runtime}
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{movie.title}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {Array.isArray(movie.genres) ? movie.genres.join(', ') : 'Cinema'} • IMDb ⭐ {movie.imdbRating}
            </p>
          </div>
        </div>

        {/* State & City Filter Suite Bar */}
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 14, border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            {/* Indian State Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} style={{ color: 'var(--primary-color)' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>State:</span>
              <select
                value={selectedState}
                onChange={e => {
                  const stateVal = e.target.value;
                  setSelectedState(stateVal);
                  const firstCity = (customCitiesByState[stateVal] || ["Phagwara"])[0];
                  setSelectedCity(firstCity);
                  setActiveMapTheatreId(null);
                }}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--primary-color)', color: '#fff', padding: '0.4rem 0.75rem', borderRadius: 20, fontSize: '0.88rem', fontWeight: 700, outline: 'none', cursor: 'pointer' }}
              >
                {INDIAN_STATES.map(st => (
                  <option key={st.id} value={st.name} style={{ background: '#181820' }}>
                    {st.name === "Punjab" ? "🇮🇳 Punjab (Phagwara, Jalandhar...)" : st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.5rem', borderRadius: 16, border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Currency:</span>
              <button 
                className={`chip-btn ${currencySymbol === '₹' ? 'active' : ''}`}
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem', background: currencySymbol === '₹' ? 'var(--primary-color)' : 'transparent' }}
                onClick={() => setCurrencySymbol('₹')}
              >
                ₹ INR
              </button>
              <button 
                className={`chip-btn ${currencySymbol === '$' ? 'active' : ''}`}
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem', background: currencySymbol === '$' ? 'var(--primary-color)' : 'transparent' }}
                onClick={() => setCurrencySymbol('$')}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* City Selection Pills Carousel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cities in {selectedState}:</span>
            
            {availableCities.map(city => (
              <button
                key={city}
                className={`chip-btn ${selectedCity.toLowerCase() === city.toLowerCase() ? 'active' : ''}`}
                style={{ 
                  background: selectedCity.toLowerCase() === city.toLowerCase() ? 'var(--primary-color)' : 'rgba(255,255,255,0.06)',
                  fontWeight: selectedCity.toLowerCase() === city.toLowerCase() ? 700 : 500
                }}
                onClick={() => { setSelectedCity(city); setActiveMapTheatreId(null); }}
              >
                📍 {city}
              </button>
            ))}

            {/* Add Custom City Trigger */}
            {!showAddCityInput ? (
              <button
                className="chip-btn"
                style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981', color: '#6ee7b7' }}
                onClick={() => setShowAddCityInput(true)}
              >
                <Plus size={12} style={{ marginRight: 3 }} /> Add City / Search
              </button>
            ) : (
              <form onSubmit={handleAddCitySubmit} style={{ display: 'inline-flex', gap: '0.3rem' }}>
                <input 
                  type="text"
                  placeholder="Enter city (e.g. Phagwara)..."
                  value={newCityInput}
                  onChange={e => setNewCityInput(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--primary-color)', color: '#fff', padding: '0.25rem 0.6rem', borderRadius: 12, fontSize: '0.78rem', outline: 'none' }}
                  autoFocus
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}>Add</button>
                <button type="button" className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => setShowAddCityInput(false)}>X</button>
              </form>
            )}
          </div>
        </div>

        {/* Recommended Multiplex Cinema Halls List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} style={{ color: 'var(--primary-color)' }} />
              Recommended Cinema Halls in {selectedCity}, {selectedState} ({cityTheatres.length})
            </h3>
          </div>

          {cityTheatres.map(theatre => {
            const isMapVisible = activeMapTheatreId === theatre.id;
            return (
              <div 
                key={theatre.id} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 16, 
                  padding: '1.25rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
                      {theatre.name}
                      <span style={{ fontSize: '0.78rem', color: '#fbbf24', background: 'rgba(251,191,36,0.15)', border: '1px solid #fbbf24', padding: '0.1rem 0.5rem', borderRadius: 12, fontWeight: 700 }}>
                        ⭐ {theatre.rating}
                      </span>
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <MapPin size={14} style={{ color: 'var(--primary-color)' }} /> {theatre.address} • <strong>{theatre.distance}</strong>
                    </p>
                  </div>

                  <button 
                    className="btn-secondary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderColor: isMapVisible ? 'var(--primary-color)' : 'var(--border-color)' }}
                    onClick={() => setActiveMapTheatreId(isMapVisible ? null : theatre.id)}
                  >
                    <Map size={15} style={{ color: 'var(--primary-color)' }} />
                    {isMapVisible ? "Hide Google Map" : "Google Map Location"}
                  </button>
                </div>

                {/* Embedded Google Map */}
                {isMapVisible && (
                  <div style={{ marginBottom: '1.25rem', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--primary-color)', height: 230, boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }}>
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={theatre.mapEmbedUrl}
                      allowFullScreen
                      title={theatre.name}
                    />
                  </div>
                )}

                {/* Facility Badges */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                  {theatre.facilities.map((fac, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.08)', padding: '0.25rem 0.55rem', borderRadius: 6, color: 'rgba(255,255,255,0.85)', border: '1px solid var(--border-color)' }}>
                      {fac}
                    </span>
                  ))}
                </div>

                {/* Show Timing Slots Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.75rem' }}>
                  {movieShows.map((st, idx) => (
                    <button
                      key={idx}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 12,
                        padding: '0.75rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                      onClick={() => selectTheatreAndShow(theatre, { time: st.time, screen: st.format || "Standard", date: new Date().toISOString().split('T')[0] })}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <strong style={{ fontSize: '1rem', color: 'var(--primary-color)' }}>{st.time}</strong>
                        <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 800 }}>{st.price || '₹280'}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 700 }}>{st.format}</div>
                      <div style={{ fontSize: '0.7rem', color: '#fbbf24', marginTop: '0.2rem', fontWeight: 600 }}>{st.type}</div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
