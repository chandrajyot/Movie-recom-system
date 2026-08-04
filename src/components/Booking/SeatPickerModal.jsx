import React, { useState } from 'react';
import { X, Ticket, Check, Shield, Tag, ArrowRight, Info } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { SEAT_CATEGORIES_INR } from '../../data/bookingData';

export const SeatPickerModal = () => {
  const { 
    selectedBookingMovie, 
    selectedTheatre, 
    selectedShow, 
    selectedSeats, 
    toggleSeatSelection, 
    appliedCoupon, 
    applyCouponCode, 
    calculateTotalPrice, 
    currencySymbol,
    setBookingStep, 
    closeBookingModal 
  } = useBooking();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  if (!selectedBookingMovie || !selectedTheatre) return null;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const bookedSeats = ['A3', 'A4', 'C7', 'C8', 'D5', 'D6', 'G1', 'G2'];

  const getSeatCategory = (row) => {
    if (['A', 'B'].includes(row)) return { type: "Normal", price: currencySymbol === '₹' ? 200 : 12, color: "#60a5fa" };
    if (['C', 'D'].includes(row)) return { type: "Premium", price: currencySymbol === '₹' ? 280 : 18, color: "#a78bfa" };
    if (['E', 'F'].includes(row)) return { type: "VIP", price: currencySymbol === '₹' ? 450 : 25, color: "#fbbf24" };
    if (row === 'G') return { type: "Recliner", price: currencySymbol === '₹' ? 600 : 30, color: "#f472b6" };
    return { type: "Couple", price: currencySymbol === '₹' ? 750 : 35, color: "#34d399" };
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = applyCouponCode(couponInput);
    setCouponMsg(result);
  };

  const { subtotal, discount, total } = calculateTotalPrice();

  return (
    <div className="modal-overlay" onClick={closeBookingModal}>
      <div className="modal-content" style={{ maxWidth: '900px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeBookingModal}>
          <X size={20} />
        </button>

        {/* Top Title Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedBookingMovie.title}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {selectedTheatre.name} ({selectedTheatre.city}) • <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{selectedShow.time}</span> ({selectedShow.screen})
            </p>
          </div>

          <button 
            className="btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            onClick={() => setBookingStep('schedule')}
          >
            Change Time & Hall
          </button>
        </div>

        {/* Screen Visual Curve */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '80%', height: '8px', background: 'linear-gradient(90deg, transparent, var(--primary-color), transparent)', borderRadius: '50%', margin: '0 auto 0.5rem auto', boxShadow: '0 0 15px var(--primary-color)' }} />
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)' }}>
            SCREEN THIS WAY
          </span>
        </div>

        {/* Seat Matrix Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center', marginBottom: '2rem', overflowX: 'auto', padding: '0.5rem 0' }}>
          {rows.map(row => {
            const category = getSeatCategory(row);
            return (
              <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: 20, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center' }}>{row}</span>
                
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {cols.map(col => {
                    const seatId = `${row}${col}`;
                    const isBooked = bookedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    let bg = 'rgba(255,255,255,0.08)';
                    let borderColor = category.color;
                    let cursor = 'pointer';

                    if (isBooked) {
                      bg = '#374151';
                      borderColor = '#4b5563';
                      cursor = 'not-allowed';
                    } else if (isSelected) {
                      bg = 'var(--primary-color)';
                      borderColor = 'var(--primary-color)';
                    }

                    return (
                      <React.Fragment key={seatId}>
                        {col === 7 && <div style={{ width: 18 }} />}
                        <button
                          disabled={isBooked}
                          onClick={() => toggleSeatSelection(seatId)}
                          style={{
                            width: 32,
                            height: 30,
                            borderRadius: 6,
                            background: bg,
                            border: `1px solid ${borderColor}`,
                            color: isSelected ? '#fff' : (isBooked ? '#9ca3af' : 'var(--text-main)'),
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: cursor,
                            transition: 'all 0.15s ease',
                            boxShadow: isSelected ? '0 0 10px var(--primary-color)' : 'none'
                          }}
                          title={`${seatId} - ${category.type} (${currencySymbol}${category.price})`}
                        >
                          {col}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Seat Legend Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: 12, marginBottom: '1.5rem', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'rgba(255,255,255,0.08)', border: '1px solid #60a5fa' }} />
            <span>Available</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--primary-color)' }} />
            <span>Selected</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: '#374151', border: '1px solid #4b5563' }} />
            <span>Booked</span>
          </div>
          {SEAT_CATEGORIES_INR.map(cat => (
            <div key={cat.type} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color }} />
              <span>{cat.type} ({currencySymbol}{currencySymbol === '₹' ? cat.price : Math.round(cat.price / 20)})</span>
            </div>
          ))}
        </div>

        {/* Bottom Booking Summary Footer */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 14, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Selected Seats: <strong style={{ color: '#fff' }}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}</strong>
            </div>

            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
              <input 
                type="text" 
                placeholder="Coupon e.g. CINEAI20" 
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', outline: 'none' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>
                Apply Coupon
              </button>
            </form>

            {couponMsg && (
              <span style={{ fontSize: '0.75rem', color: couponMsg.success ? '#10b981' : '#ef4444', marginTop: '0.2rem', display: 'block' }}>
                {couponMsg.message}
              </span>
            )}
          </div>

          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div>
              {discount > 0 && (
                <div style={{ fontSize: '0.78rem', color: '#10b981' }}>Discount Saved: -{currencySymbol}{discount.toFixed(2)}</div>
              )}
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                {currencySymbol}{total.toFixed(2)}
              </div>
            </div>

            <button 
              className="btn-primary"
              disabled={selectedSeats.length === 0}
              onClick={() => setBookingStep('payment')}
              style={{ padding: '0.75rem 1.5rem', opacity: selectedSeats.length === 0 ? 0.5 : 1, cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              Proceed to Pay <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
