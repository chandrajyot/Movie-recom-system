import React, { useEffect, useState } from 'react';
import { Bell, Smartphone, X, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const LiveNotificationToast = () => {
  const { liveToastNotification, setLiveToastNotification } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (liveToastNotification) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setLiveToastNotification(null), 300);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [liveToastNotification]);

  if (!liveToastNotification || !visible) return null;

  const notif = liveToastNotification;

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '25px',
        maxWidth: '380px',
        width: '100%',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        border: '2px solid #10b981',
        borderRadius: '16px',
        padding: '1rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(16,185,129,0.3)',
        zIndex: 99999,
        color: '#ffffff',
        animation: 'slideInRight 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: '#10b981', color: '#fff', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Smartphone size={18} />
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              📱 LIVE SMS NOTIFICATION
            </span>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>To: +91 7319780271</div>
          </div>
        </div>

        <button 
          onClick={() => setVisible(false)}
          style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
        >
          <X size={16} />
        </button>
      </div>

      <strong style={{ fontSize: '0.92rem', color: '#fff', display: 'block', marginBottom: '0.2rem' }}>
        {notif.title}
      </strong>

      <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, margin: 0 }}>
        {notif.message}
      </p>
    </div>
  );
};
