import React from 'react';
import { X, CheckCircle, Download, Printer, Share2, Sparkles, MapPin, Calendar, Clock, Ticket, FileText, ShieldCheck, Smartphone } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';

export const TicketConfirmationModal = () => {
  const { completedTicket, closeBookingModal, viewInvoiceModal, addNotification } = useBooking();
  const { user } = useAuth();
  const userPhone = user?.phone || "+91 7319780271";

  if (!completedTicket) return null;

  const ticket = completedTicket;
  const symbol = ticket.currencySymbol || '₹';

  const handlePrint = () => {
    window.print();
  };

  const handleSendSms = () => {
    addNotification({
      type: "SMS_RESENT",
      channel: "SMS",
      title: `📱 Ticket Pass Resent to ${userPhone}`,
      message: `Pass for ${ticket.movieTitle} (${ticket.seats.join(', ')}) at ${ticket.theatreName} resent to ${userPhone}. Gate Token: ${ticket.bookingToken || ticket.id}.`,
      time: "Just now",
      read: false
    });
  };

  return (
    <div className="modal-overlay" onClick={closeBookingModal}>
      <div className="modal-content" style={{ maxWidth: '480px', padding: '0', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
        
        {/* Top Banner */}
        <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', padding: '1.5rem', textAlign: 'center', position: 'relative' }}>
          <button 
            className="modal-close-btn" 
            onClick={closeBookingModal}
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <X size={18} />
          </button>
          
          <CheckCircle size={42} style={{ marginBottom: '0.4rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Ticket Booked Successfully!</h2>
          <p style={{ fontSize: '0.82rem', opacity: 0.9 }}>
            Pass Sent via SMS to <strong>{userPhone}</strong> • +{Math.round(ticket.totalAmount * 0.1)} Points Earned!
          </p>
        </div>

        {/* Digital Ticket Pass Body */}
        <div style={{ padding: '1.5rem', background: 'var(--bg-card)' }}>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
            <img src={ticket.poster} alt={ticket.movieTitle} style={{ width: 65, height: 95, borderRadius: 8, objectFit: 'cover' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{ticket.movieTitle}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 700, marginTop: '0.1rem' }}>
                {ticket.theatreName} ({ticket.city}, {ticket.state || 'Punjab'})
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ticket.screenNo}</p>
            </div>
          </div>

          {/* Ticket Specs Table */}
          <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>DATE & TIME</span>
              <strong style={{ color: '#fff' }}>{ticket.showDate} @ {ticket.showTime}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>SEATS ({ticket.ticketCount})</span>
              <strong style={{ color: '#10b981' }}>{ticket.seats.join(', ')}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>BOOKING ID</span>
              <strong style={{ color: 'var(--primary-color)' }}>{ticket.id}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>BOOKING TOKEN (UUID)</span>
              <strong style={{ color: '#fbbf24', fontSize: '0.78rem' }}>{ticket.bookingToken || `TK-${ticket.id}`}</strong>
            </div>
          </div>

          {/* QR Code Container */}
          <div style={{ textAlign: 'center', background: '#fff', padding: '1rem', borderRadius: 12, marginBottom: '1.25rem' }}>
            <img src={ticket.qrCode} alt="Ticket QR Code" style={{ width: 130, height: 130, margin: '0 auto' }} />
            <p style={{ color: '#111827', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.3rem', letterSpacing: '1px' }}>
              SCAN AT MULTIPLEX GATE ({ticket.city.toUpperCase()})
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={handlePrint}>
              <Printer size={15} /> Print Pass
            </button>

            <button 
              className="btn-secondary" 
              style={{ flex: 1, justifyContent: 'center', borderColor: '#10b981', color: '#10b981' }}
              onClick={handleSendSms}
            >
              <Smartphone size={15} /> Resend SMS
            </button>

            <button 
              className="btn-secondary" 
              style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
              onClick={() => viewInvoiceModal(ticket)}
            >
              <FileText size={15} /> PDF Invoice
            </button>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} onClick={closeBookingModal}>
            Done & View Ticket List
          </button>
        </div>
      </div>
    </div>
  );
};
