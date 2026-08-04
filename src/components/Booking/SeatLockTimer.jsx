import React from 'react';
import { Clock, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const SeatLockTimer = () => {
  const { seatLockSeconds, releaseSeats, bookingStep } = useBooking();

  if (!seatLockSeconds || seatLockSeconds <= 0 || !['seats', 'payment'].includes(bookingStep)) {
    return null;
  }

  const minutes = Math.floor(seatLockSeconds / 60);
  const seconds = seatLockSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isLowTime = seatLockSeconds < 120;

  return (
    <div 
      style={{
        background: isLowTime 
          ? 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)' 
          : 'linear-gradient(90deg, #10b981 0%, #047857 100%)',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        animation: isLowTime ? 'pulse 1s infinite' : 'none',
        fontSize: '0.88rem',
        fontWeight: 600
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {isLowTime ? <AlertTriangle size={18} /> : <Clock size={18} />}
        <span>
          {isLowTime ? '⚠️ Seats Expiring Soon!' : '🔒 Seats Temporarily Locked'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '1px' }}>
          {formattedTime}
        </span>
        <button
          onClick={releaseSeats}
          style={{
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.4)',
            color: '#fff',
            fontSize: '0.72rem',
            padding: '0.2rem 0.5rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Release Seats
        </button>
      </div>
    </div>
  );
};
