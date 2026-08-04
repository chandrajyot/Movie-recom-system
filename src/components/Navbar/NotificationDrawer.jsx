import React from 'react';
import { Bell, Mail, Smartphone, AlertCircle, Sparkles, CheckCircle, Clock, Trash2, X } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, clearNotifications } = useBooking();

  if (!isOpen) return null;

  const safeNotifications = Array.isArray(notifications) ? notifications : [];

  return (
    <div 
      style={{
        position: 'absolute',
        top: '65px',
        right: '120px',
        width: '380px',
        maxHeight: '480px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'slideUp 0.15s ease'
      }}
    >
      {/* Header */}
      <div style={{ padding: '0.85rem 1rem', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.92rem' }}>
          <Bell size={16} style={{ color: 'var(--primary-color)' }} /> Notifications & Alerts ({safeNotifications.length})
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button className="icon-btn" style={{ width: 28, height: 28, padding: 0 }} onClick={clearNotifications} title="Clear All">
            <Trash2 size={14} />
          </button>
          <button className="icon-btn" style={{ width: 28, height: 28, padding: 0 }} onClick={onClose}>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {safeNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No new notifications.
          </div>
        ) : (
          safeNotifications.map(n => (
            <div 
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              style={{
                background: n.read ? 'rgba(255,255,255,0.03)' : 'rgba(229, 9, 20, 0.08)',
                border: `1px solid ${n.read ? 'var(--border-color)' : 'var(--primary-color)'}`,
                borderRadius: 10,
                padding: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: n.type === 'REFUND' ? '#ef4444' : (n.type === 'REMINDER' ? '#fbbf24' : '#10b981') }}>
                  {n.channel === 'EMAIL' ? '📧 Email' : n.channel === 'SMS' ? '📱 SMS' : '🔔 Push Alert'} • {n.type}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{n.time}</span>
              </div>
              <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block' }}>{n.title}</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: 1.4 }}>
                {n.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
