import React, { useState } from 'react';
import { X, QrCode, CheckCircle, ShieldAlert, Search, Sparkles, Building2, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const StaffScannerModal = ({ isOpen, onClose }) => {
  const { bookings } = useBooking();
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  if (!isOpen) return null;

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    const query = scanInput.trim().toUpperCase();
    const found = (Array.isArray(bookings) ? bookings : []).find(b => 
      b.id.toUpperCase() === query || 
      (b.bookingToken && b.bookingToken.toUpperCase() === query) ||
      query.includes(b.id.toUpperCase())
    );

    if (found) {
      setScanResult({
        success: true,
        ticket: found,
        message: `VALID TICKET! Entry Granted for ${found.ticketCount} Person(s).`
      });
    } else {
      setScanResult({
        success: false,
        message: `INVALID OR UNRECOGNIZED TICKET TOKEN (${query}). Entry Denied.`
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: 50, height: 50, background: 'var(--primary-color)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '0.5rem' }}>
            <QrCode size={26} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Theatre Staff Ticket Validator</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Scan QR Code or enter Booking Token to validate multiplex gate entry
          </p>
        </div>

        <form onSubmit={handleScanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
              Scan QR / Enter Booking Token or ID
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="e.g. BK_889210 or TK-99812"
                value={scanInput}
                onChange={e => setScanInput(e.target.value)}
                required
                style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 8, fontSize: '0.9rem', outline: 'none' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.2rem' }}>
                <Search size={16} /> Validate
              </button>
            </div>
          </div>
        </form>

        {/* Scan Result Output Banner */}
        {scanResult && (
          <div 
            style={{
              padding: '1.25rem',
              borderRadius: 14,
              background: scanResult.success ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              border: `1px solid ${scanResult.success ? '#10b981' : '#ef4444'}`,
              color: scanResult.success ? '#10b981' : '#ef4444',
              textAlign: 'center'
            }}
          >
            {scanResult.success ? (
              <>
                <CheckCircle size={36} style={{ margin: '0 auto 0.4rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{scanResult.message}</h3>
                
                <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: 10, textAlign: 'left', color: '#fff', fontSize: '0.84rem' }}>
                  <div>Movie: <strong>{scanResult.ticket.movieTitle}</strong></div>
                  <div>Theatre: <strong>{scanResult.ticket.theatreName} ({scanResult.ticket.city})</strong></div>
                  <div>Showtime: <strong>{scanResult.ticket.showDate} @ {scanResult.ticket.showTime}</strong></div>
                  <div>Seats: <strong style={{ color: '#10b981' }}>{scanResult.ticket.seats.join(', ')}</strong> ({scanResult.ticket.ticketCount} Person)</div>
                  <div>Token: <span style={{ color: 'var(--primary-color)' }}>{scanResult.ticket.bookingToken || scanResult.ticket.id}</span></div>
                </div>
              </>
            ) : (
              <>
                <ShieldAlert size={36} style={{ margin: '0 auto 0.4rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{scanResult.message}</h3>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
