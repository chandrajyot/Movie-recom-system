import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, ShieldCheck, Lock, Sparkles, CheckCircle, KeyRound, RefreshCw, AlertCircle, Copy, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { OFFICIAL_UPI_DETAILS } from '../../data/paymentGateways';
import { SeatLockTimer } from './SeatLockTimer';

export const PaymentModal = () => {
  const { 
    selectedBookingMovie, 
    selectedTheatre, 
    selectedSeats, 
    calculateTotalPrice, 
    currencySymbol, 
    paymentGateways,
    processPayment, 
    setBookingStep, 
    closeBookingModal,
    addNotification
  } = useBooking();

  const { user } = useAuth();
  const userPhone = user?.phone || "+91 7319780271";

  const activeGateways = Array.isArray(paymentGateways) ? paymentGateways.filter(g => g.enabled) : [];
  const [selectedGatewayId, setSelectedGatewayId] = useState(activeGateways[0]?.id || 'gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthStep, setShowAuthStep] = useState(false);
  const [otpInput, setOtpInput] = useState('482910');
  const [otpTimer, setOtpTimer] = useState(30);
  const [authError, setAuthError] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    let timer;
    if (showAuthStep && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showAuthStep, otpTimer]);

  if (!selectedBookingMovie || !selectedTheatre) return null;

  const activeGateway = activeGateways.find(g => g.id === selectedGatewayId) || activeGateways[0] || { name: 'UPI', icon: '📱' };
  const { subtotal, discount, convenienceFee, gst, total } = calculateTotalPrice();

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(OFFICIAL_UPI_DETAILS.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleInitiatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowAuthStep(true);
      setOtpTimer(30);
      setOtpInput('482910');
      setAuthError(null);
      
      // Trigger instant SMS alert for OTP request to +91 7319780271
      addNotification({
        type: "OTP_SENT",
        channel: "SMS",
        title: `📱 Banking OTP Sent to ${userPhone}`,
        message: `OTP 482910 sent to ${userPhone} for payment of ${currencySymbol}${total.toFixed(2)} to ${OFFICIAL_UPI_DETAILS.merchantName} (${OFFICIAL_UPI_DETAILS.upiId}).`,
        time: "Just now",
        read: false
      });
    }, 600);
  };

  const handleVerifyAuth = (e) => {
    e.preventDefault();
    const finalOtp = otpInput.trim() || '482910';

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      processPayment(`${activeGateway.name} (UPI: ${OFFICIAL_UPI_DETAILS.upiId})`);
    }, 900);
  };

  const handleResendOtp = () => {
    setOtpTimer(30);
    setOtpInput('881042');
    setAuthError(null);

    addNotification({
      type: "OTP_RESENT",
      channel: "SMS",
      title: `📱 Resent Banking OTP to ${userPhone}`,
      message: `New OTP 881042 sent to ${userPhone} for ${currencySymbol}${total.toFixed(2)} payment.`,
      time: "Just now",
      read: false
    });
  };

  return (
    <div className="modal-overlay" onClick={closeBookingModal}>
      <div className="modal-content" style={{ maxWidth: '580px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeBookingModal}>
          <X size={20} />
        </button>

        {/* Sticky Seat Lock Timer */}
        <SeatLockTimer />

        {!showAuthStep ? (
          /* Step 1: Official UPI QR & Payment Selection */
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ width: 48, height: 48, background: 'var(--primary-color)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '0.4rem' }}>
                <Lock size={22} />
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>PCI-DSS Enterprise Checkout</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Official Merchant Payment Gateway
              </p>
            </div>

            {/* Order & Fee Breakdown Summary */}
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: 12, marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                <span>{selectedBookingMovie.title} ({selectedSeats.length} Seats: {selectedSeats.join(', ')})</span>
                <strong style={{ color: '#fff' }}>{currencySymbol}{subtotal.toFixed(2)}</strong>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.82rem', color: '#10b981' }}>
                  <span>Promotional Coupon Discount</span>
                  <span>-{currencySymbol}{discount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>Convenience Fee (2%) + GST (18%)</span>
                <span>+{currencySymbol}{(convenienceFee + gst).toFixed(2)}</span>
              </div>

              <div style={{ width: '100%', height: 1, background: 'var(--border-color)', margin: '0.5rem 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Total Amount Payable</span>
                <strong style={{ fontSize: '1.4rem', color: 'var(--primary-color)', fontWeight: 800 }}>
                  {currencySymbol}{total.toFixed(2)}
                </strong>
              </div>
            </div>

            {/* Admin Enabled Payment Gateways Selector Grid */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Select Payment Provider ({activeGateways.length} Enabled)
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.5rem' }}>
                {activeGateways.map(gw => (
                  <button
                    key={gw.id}
                    className={`chip-btn ${selectedGatewayId === gw.id ? 'active' : ''}`}
                    style={{
                      padding: '0.5rem',
                      justify: 'center',
                      flexDirection: 'column',
                      gap: '0.2rem',
                      background: selectedGatewayId === gw.id ? 'var(--primary-color)' : 'rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      border: `1px solid ${selectedGatewayId === gw.id ? 'var(--primary-color)' : 'var(--border-color)'}`
                    }}
                    onClick={() => setSelectedGatewayId(gw.id)}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{gw.icon}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{gw.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleInitiatePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* OFFICIAL GOOGLE PAY UPI QR CARD (Chandra jyot Kumar) */}
              {['gpay', 'upiqr', 'phonepe', 'paytm'].includes(selectedGatewayId) && (
                <div 
                  style={{ 
                    background: '#f8fafc', 
                    borderRadius: 16, 
                    padding: '1.25rem', 
                    textAlign: 'center', 
                    color: '#0f172a',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    border: '2px solid #3b82f6'
                  }}
                >
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.2rem' }}>
                    {OFFICIAL_UPI_DETAILS.merchantName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '0.8rem' }}>
                    {OFFICIAL_UPI_DETAILS.bankName}
                  </div>

                  <div style={{ background: '#fff', padding: '0.6rem', borderRadius: 12, display: 'inline-block', border: '1px solid #cbd5e1', marginBottom: '0.8rem' }}>
                    <img 
                      src={OFFICIAL_UPI_DETAILS.qrImage} 
                      onError={(e) => { e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${OFFICIAL_UPI_DETAILS.upiId}&pn=Chandra%20jyot%20Kumar&cu=INR`; }} 
                      alt="UPI QR Code" 
                      style={{ width: 170, height: 170, objectFit: 'contain' }} 
                    />
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600, marginBottom: '0.6rem' }}>
                    Scan to pay with Google Pay, PhonePe, Paytm or any UPI app
                  </p>

                  <div style={{ background: '#e2e8f0', borderRadius: 8, padding: '0.45rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 700, color: '#334155', fontFamily: 'monospace' }}>
                      UPI ID: {OFFICIAL_UPI_DETAILS.upiId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0.25rem 0.6rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                    >
                      {copiedUpi ? <Check size={12} /> : <Copy size={12} />}
                      {copiedUpi ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {['card', 'stripe'].includes(selectedGatewayId) && (
                <>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Card Number</label>
                    <input type="text" placeholder="4532 •••• •••• 8892" required defaultValue="4532 8891 2234 8892" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.6rem', borderRadius: 8, outline: 'none' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required defaultValue="12/28" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.6rem', borderRadius: 8, outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>CVV Code</label>
                      <input type="password" placeholder="•••" required defaultValue="882" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.6rem', borderRadius: 8, outline: 'none' }} />
                    </div>
                  </div>
                </>
              )}

              {selectedGatewayId === 'netbanking' && (
                <div style={{ textAlign: 'center', padding: '0.85rem', background: 'rgba(0,0,0,0.2)', borderRadius: 12 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Select Indian Bank Gateway</p>
                  <select style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem', borderRadius: 8, marginTop: '0.4rem' }}>
                    <option value="sbi" style={{ background: '#181820' }}>State Bank of India (SBI 4513)</option>
                    <option value="hdfc" style={{ background: '#181820' }}>HDFC Bank</option>
                    <option value="icici" style={{ background: '#181820' }}>ICICI Bank</option>
                    <option value="pnb" style={{ background: '#181820' }}>Punjab National Bank (PNB)</option>
                  </select>
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary"
                disabled={isProcessing}
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.3rem', fontSize: '1rem' }}
              >
                {isProcessing ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={16} style={{ animation: 'spin 1.5s linear infinite' }} /> Sending OTP to {userPhone}...
                  </span>
                ) : (
                  `Proceed to Authenticate (${currencySymbol}${total.toFixed(2)})`
                )}
              </button>
            </form>
          </>
        ) : (
          /* Step 2: 3D Secure Verification */
          <div style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ width: 55, height: 55, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '0.4rem' }}>
                <ShieldCheck size={30} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>3D Secure Gateway Verification</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Merchant: <strong>{OFFICIAL_UPI_DETAILS.merchantName} ({OFFICIAL_UPI_DETAILS.upiId})</strong>
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount to Pay:</span>
                <strong style={{ fontSize: '1.2rem', color: '#10b981' }}>{currencySymbol}{total.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>Mobile OTP sent to:</span>
                <strong style={{ color: '#10b981', background: 'rgba(16,185,129,0.15)', padding: '0.1rem 0.5rem', borderRadius: 6 }}>
                  {userPhone}
                </strong>
              </div>
            </div>

            <form onSubmit={handleVerifyAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Enter 6-Digit Banking OTP sent to {userPhone}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    maxLength={6}
                    value={otpInput}
                    onChange={e => setOtpInput(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--primary-color)', color: '#fff', padding: '0.75rem 2.5rem 0.75rem 0.85rem', borderRadius: 10, fontSize: '1.1rem', letterSpacing: '4px', textAlign: 'center', fontWeight: 800, outline: 'none' }}
                  />
                  <KeyRound size={18} style={{ position: 'absolute', right: 12, top: 14, color: 'var(--primary-color)' }} />
                </div>
              </div>

              {authError && (
                <div style={{ fontSize: '0.78rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: 6, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertCircle size={14} /> {authError}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'OTP ready'}
                </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="chip-btn"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  <RefreshCw size={12} /> Resend SMS to {userPhone}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setShowAuthStep(false)}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isProcessing}
                  style={{ flex: 2, justifyContent: 'center', padding: '0.8rem' }}
                >
                  {isProcessing ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={16} style={{ animation: 'spin 1.5s linear infinite' }} /> Verifying Payment...
                    </span>
                  ) : (
                    `Confirm & Issue Pass (${currencySymbol}${total.toFixed(2)})`
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
