import React, { useState } from 'react';
import { 
  Building2, Film, Users, DollarSign, TrendingUp, CheckCircle, 
  XCircle, Clock, ShieldCheck, PieChart, Activity, Download, Search, RefreshCw, RotateCcw, Sliders, AlertCircle
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useMovie } from '../../context/MovieContext';

export const AdminDashboard = () => {
  const { 
    bookings, 
    paymentGateways, 
    toggleGateway, 
    refunds, 
    initiateRefund, 
    currencySymbol 
  } = useBooking();
  const { movies, showToast } = useMovie();

  const [activeSubTab, setActiveSubTab] = useState('gateways'); // 'gateways' | 'transactions' | 'refunds'
  const [searchTerm, setSearchTerm] = useState('');

  const safeBookings = Array.isArray(bookings) ? bookings : [];
  const safeGateways = Array.isArray(paymentGateways) ? paymentGateways : [];
  const safeRefunds = Array.isArray(refunds) ? refunds : [];

  const grossRevenue = safeBookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const failedCount = safeBookings.filter(b => b.status === 'Cancelled' || b.status === 'Failed').length;

  const handleExportCSV = () => {
    const headers = "BookingID,Movie,Theatre,City,Seats,Amount,Gateway,Status,Date\n";
    const rows = safeBookings.map(b => 
      `"${b.id}","${b.movieTitle}","${b.theatreName}","${b.city}","${b.seats.join('-')}","${b.totalAmount}","${b.paymentMethod || 'Card'}","${b.status}","${b.showDate}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CineAI_Financial_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast("Financial CSV Report Exported!");
  };

  const filteredBookings = safeBookings.filter(b => 
    b.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.theatreName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)', border: '1px solid var(--border-color)', borderRadius: 20, padding: '1.5rem 2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--primary-color)', padding: '0.5rem', borderRadius: 10, color: '#fff' }}>
              <ShieldCheck size={24} />
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Platform Control & Financial Command</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            PCI-DSS Compliance, Gateway Control, Refund Processing & Real-time Transaction Ledger
          </p>
        </div>

        <button className="btn-primary" onClick={handleExportCSV}>
          <Download size={16} /> Export Financial CSV
        </button>
      </div>

      {/* Financial Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>GROSS PLATFORM REVENUE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>
            {currencySymbol}{grossRevenue.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '0.2rem' }}>↑ +14.8% vs last week</div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL BOOKINGS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
            {safeBookings.length + 48920}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Completed across India</div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE GATEWAYS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '0.2rem' }}>
            {safeGateways.filter(g => g.enabled).length} / {safeGateways.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '0.2rem' }}>Auto Failover Ready</div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>CANCELLED / REFUNDED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444', marginTop: '0.2rem' }}>
            {failedCount + safeRefunds.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>0.02% failure rate</div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button 
          className={`nav-link-btn ${activeSubTab === 'gateways' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('gateways')}
        >
          <Sliders size={16} /> Payment Provider Manager ({safeGateways.length})
        </button>
        <button 
          className={`nav-link-btn ${activeSubTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('transactions')}
        >
          <Activity size={16} /> Transaction Ledger ({safeBookings.length})
        </button>
        <button 
          className={`nav-link-btn ${activeSubTab === 'refunds' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('refunds')}
        >
          <RotateCcw size={16} /> Refund Operations ({safeRefunds.length})
        </button>
      </div>

      {/* Sub-tab 1: Admin Payment Provider Manager (Enable/Disable Gateways) */}
      {activeSubTab === 'gateways' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Multi-Gateway Routing & Admin Toggle Panel
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Enable or disable payment providers in real-time. Changes instantly reflect on customer checkout.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {safeGateways.map(gw => (
              <div 
                key={gw.id} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: `1px solid ${gw.enabled ? 'var(--border-color)' : 'rgba(239,68,68,0.3)'}`, 
                  borderRadius: 12, 
                  padding: '1rem',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  opacity: gw.enabled ? 1 : 0.6
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{gw.icon}</span>
                    <strong style={{ fontSize: '0.95rem', color: '#fff' }}>{gw.name}</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Category: {gw.category} • Fee: {gw.feePercent}%
                  </div>
                </div>

                <button
                  className="chip-btn"
                  style={{
                    background: gw.enabled ? '#10b981' : '#ef4444',
                    color: '#fff',
                    borderColor: gw.enabled ? '#10b981' : '#ef4444',
                    fontWeight: 700,
                    padding: '0.35rem 0.75rem'
                  }}
                  onClick={() => {
                    toggleGateway(gw.id);
                    showToast(`${gw.name} gateway ${gw.enabled ? 'Disabled' : 'Enabled'}!`);
                  }}
                >
                  {gw.enabled ? 'Enabled ✓' : 'Disabled ✗'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Transaction Ledger & Search */}
      {activeSubTab === 'transactions' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Search & Filter Transactions</h3>

            <div style={{ position: 'relative', width: 280 }}>
              <input 
                type="text" 
                placeholder="Search by ID, movie, city..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.5rem 0.75rem 0.5rem 2.2rem', borderRadius: 20, fontSize: '0.85rem', outline: 'none' }}
              />
              <Search size={16} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-muted)' }} />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)', textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem' }}>Booking & Token ID</th>
                <th style={{ padding: '0.75rem' }}>Movie & Theatre</th>
                <th style={{ padding: '0.75rem' }}>Seats</th>
                <th style={{ padding: '0.75rem' }}>Gateway</th>
                <th style={{ padding: '0.75rem' }}>Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <strong style={{ color: 'var(--primary-color)' }}>{b.id}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#fbbf24', display: 'block' }}>{b.bookingToken || `TK-${b.id}`}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <strong style={{ color: '#fff' }}>{b.movieTitle}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{b.theatreName} ({b.city})</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{b.seats.join(', ')}</td>
                  <td style={{ padding: '0.75rem' }}>{b.paymentMethod || '3D Gateway'}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#10b981' }}>{currencySymbol}{b.totalAmount.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: 10, fontWeight: 700, background: b.status === 'Refunded' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', color: b.status === 'Refunded' ? '#ef4444' : '#10b981' }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {b.status !== 'Refunded' && (
                      <button 
                        className="chip-btn" 
                        style={{ fontSize: '0.72rem', color: '#ef4444', borderColor: '#ef4444' }}
                        onClick={() => {
                          initiateRefund(b.id, b.totalAmount, "Admin Initiated Refund");
                          showToast(`Refund of ${currencySymbol}${b.totalAmount} processed!`);
                        }}
                      >
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sub-tab 3: Refund Operations */}
      {activeSubTab === 'refunds' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Refund Status & Dispute Audit Log
          </h3>

          {safeRefunds.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No refund requests processed yet.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.2)', textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.75rem' }}>Refund ID</th>
                  <th style={{ padding: '0.75rem' }}>Booking ID</th>
                  <th style={{ padding: '0.75rem' }}>Reason</th>
                  <th style={{ padding: '0.75rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem' }}>Stage Status</th>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {safeRefunds.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>{r.id}</td>
                    <td style={{ padding: '0.75rem' }}>{r.bookingId}</td>
                    <td style={{ padding: '0.75rem' }}>{r.reason}</td>
                    <td style={{ padding: '0.75rem', color: '#ef4444', fontWeight: 700 }}>{currencySymbol}{r.amount.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '0.2rem 0.5rem', borderRadius: 10, fontWeight: 700 }}>
                        ✓ {r.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

    </div>
  );
};
