import React from 'react';
import { X, Printer, Download, Film, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const InvoiceModal = () => {
  const { activeInvoiceTicket, closeInvoiceModal } = useBooking();

  if (!activeInvoiceTicket) return null;

  const ticket = activeInvoiceTicket;
  const symbol = ticket.currencySymbol || '₹';

  const basePrice = (ticket.totalAmount * 0.85).toFixed(2);
  const gstAmount = (ticket.totalAmount * 0.15).toFixed(2);
  const totalPaid = ticket.totalAmount.toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={closeInvoiceModal}>
      <div className="modal-content" style={{ maxWidth: '650px', padding: '2.5rem', background: '#ffffff', color: '#111827', borderRadius: '16px' }} onClick={e => e.stopPropagation()}>
        
        <button 
          className="modal-close-btn" 
          onClick={closeInvoiceModal}
          style={{ background: '#f3f4f6', color: '#111' }}
        >
          <X size={18} />
        </button>

        {/* Invoice Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #e5e7eb', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem', fontWeight: 800, color: '#e50914' }}>
              <Film size={26} /> CineAI Multiplex India
            </div>
            <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '0.2rem' }}>
              GSTIN: 03AAAAA0000A1Z5 • Official Tax Invoice
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#059669', background: '#d1fae5', padding: '0.2rem 0.6rem', borderRadius: 12, fontWeight: 700, textTransform: 'uppercase' }}>
              ✓ {ticket.status || 'PAID'}
            </span>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.4rem' }}>
              INV-{ticket.id}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Date: {ticket.bookingDate || ticket.showDate}
            </div>
          </div>
        </div>

        {/* Billed To & Merchant Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>BILLED TO</span>
            <strong style={{ fontSize: '0.95rem', color: '#111' }}>Customer User</strong>
            <p style={{ color: '#4b5563', fontSize: '0.78rem', marginTop: '0.1rem' }}>customer@cineai.com • +91 98765-XXXXX</p>
            <p style={{ color: '#4b5563', fontSize: '0.78rem' }}>{ticket.city}, {ticket.state || 'Punjab'}, India</p>
          </div>

          <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <span style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>MULTIPLEX HALL</span>
            <strong style={{ fontSize: '0.95rem', color: '#111' }}>{ticket.theatreName}</strong>
            <p style={{ color: '#4b5563', fontSize: '0.78rem', marginTop: '0.1rem' }}>{ticket.screenNo}</p>
            <p style={{ color: '#4b5563', fontSize: '0.78rem' }}>Show: {ticket.showDate} @ {ticket.showTime}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb', textAlign: 'left', color: '#374151' }}>
              <th style={{ padding: '0.6rem 0.8rem' }}>Item Description</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'center' }}>Qty</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '0.6rem 0.8rem', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.8rem' }}>
                <strong style={{ color: '#111' }}>{ticket.movieTitle}</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                  Seats: {ticket.seats.join(', ')} ({ticket.seatType || 'VIP'})
                </span>
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center' }}>{ticket.ticketCount}</td>
              <td style={{ padding: '0.8rem', textAlign: 'right' }}>{symbol}{(ticket.totalAmount / ticket.ticketCount).toFixed(2)}</td>
              <td style={{ padding: '0.8rem', textAlign: 'right' }}>{symbol}{basePrice}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.8rem', color: '#4b5563' }}>Convenience Fee & GST (18%)</td>
              <td style={{ padding: '0.8rem', textAlign: 'center' }}>1</td>
              <td style={{ padding: '0.8rem', textAlign: 'right' }}>{symbol}{gstAmount}</td>
              <td style={{ padding: '0.8rem', textAlign: 'right' }}>{symbol}{gstAmount}</td>
            </tr>
          </tbody>
        </table>

        {/* Total Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '1rem 1.25rem', borderRadius: 10, border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>PAYMENT METHOD</span>
            <strong style={{ fontSize: '0.88rem', color: '#111' }}>{ticket.paymentMethod || '3D Secure UPI / Card'}</strong>
            <span style={{ fontSize: '0.72rem', color: '#059669', display: 'block', marginTop: '0.1rem' }}>
              UUID Token: {ticket.bookingToken || `TK-${ticket.id}`}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>TOTAL AMOUNT PAID</span>
            <strong style={{ fontSize: '1.5rem', color: '#e50914', fontWeight: 800 }}>{symbol}{totalPaid}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={handlePrint}
            style={{ flex: 1, background: '#111827', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <Printer size={16} /> Print / Save PDF Invoice
          </button>
          <button 
            onClick={closeInvoiceModal}
            style={{ flex: 1, background: '#e5e7eb', color: '#111', border: 'none', padding: '0.75rem', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
