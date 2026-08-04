import React, { useState } from 'react';
import { Building2, Film, DollarSign, Users, Plus, Check, Clock, Calendar, BarChart2 } from 'lucide-react';
import { useMovie } from '../../context/MovieContext';
import { useBooking } from '../../context/BookingContext';

export const TheatreOwnerDashboard = () => {
  const { movies } = useMovie();
  const { THEATRES, showToast } = useBooking();
  
  const [showModalOpen, setShowModalOpen] = useState(false);
  const [newShowMovieId, setNewShowMovieId] = useState(1);
  const [newShowTime, setNewShowTime] = useState('07:00 PM');
  const [newShowScreen, setNewShowScreen] = useState('Screen 1 (IMAX)');

  const handleAddShow = (e) => {
    e.preventDefault();
    const movie = movies.find(m => m.id === Number(newShowMovieId));
    setShowModalOpen(false);
    showToast(`Added new showtime for "${movie?.title || 'Movie'}" at ${newShowTime}!`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building2 size={28} style={{ color: 'var(--primary-color)' }} />
            Theatre Owner Management Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage screen show schedules, update seat prices, and monitor live occupancy metrics.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setShowModalOpen(true)}>
          <Plus size={16} /> Add New Show Slot
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <DollarSign size={18} /> Today's Revenue
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>$4,850.00</h2>
          <span style={{ fontSize: '0.78rem', color: '#10b981' }}>+14.2% vs yesterday</span>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <Users size={18} /> Today's Tickets Sold
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>284 Seats</h2>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Across 12 shows</span>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            <BarChart2 size={18} /> Seat Occupancy Rate
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>78.4%</h2>
          <span style={{ fontSize: '0.78rem', color: '#fbbf24' }}>Peak hours 6PM - 10PM</span>
        </div>
      </div>

      {/* Active Shows Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Active Screen Schedule (Cineplex IMAX Grand)</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Movie Title</th>
                <th style={{ padding: '0.75rem' }}>Screen</th>
                <th style={{ padding: '0.75rem' }}>Show Time</th>
                <th style={{ padding: '0.75rem' }}>Seats Booked</th>
                <th style={{ padding: '0.75rem' }}>Revenue</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {movies.slice(0, 4).map((m, idx) => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={m.poster} alt={m.title} style={{ width: 30, height: 45, borderRadius: 4, objectFit: 'cover' }} />
                    {m.title}
                  </td>
                  <td style={{ padding: '0.75rem' }}>Screen {idx + 1} (IMAX)</td>
                  <td style={{ padding: '0.75rem', color: 'var(--primary-color)', fontWeight: 600 }}>07:00 PM</td>
                  <td style={{ padding: '0.75rem' }}>{85 + idx * 12} / 120</td>
                  <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 700 }}>${(1850 + idx * 300).toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: 12, fontSize: '0.75rem', fontWeight: 700 }}>
                      Active Show
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Show Modal */}
      {showModalOpen && (
        <div className="modal-overlay" onClick={() => setShowModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '450px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>Schedule New Show</h3>
            
            <form onSubmit={handleAddShow} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Select Movie</label>
                <select 
                  value={newShowMovieId}
                  onChange={e => setNewShowMovieId(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem', borderRadius: 8, outline: 'none' }}
                >
                  {movies.map(m => (
                    <option key={m.id} value={m.id} style={{ background: '#181820' }}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Screen</label>
                <input type="text" value={newShowScreen} onChange={e => setNewShowScreen(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem', borderRadius: 8, outline: 'none' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Timing</label>
                <input type="text" value={newShowTime} onChange={e => setNewShowTime(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem', borderRadius: 8, outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Show</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
