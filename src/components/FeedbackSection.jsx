import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle, ThumbsUp, Sparkles, User, Award, MessageCircle, Filter, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useMovie } from '../context/MovieContext';

const INITIAL_FEEDBACKS = [
  {
    id: "fb_1",
    author: "Rohan Sharma",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    city: "Phagwara, Punjab",
    rating: 5,
    category: "🎟️ Ticket Booking & Seats",
    comment: "Booked 2 recliner tickets for Interstellar at PVR Cally Plaza Phagwara. The seat picker matrix was super smooth and QR ticket pass worked instantly at gate!",
    date: "2 hours ago",
    upvotes: 34,
    verifiedBuyer: true
  },
  {
    id: "fb_2",
    author: "Priya Kaur",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    city: "Jalandhar, Punjab",
    rating: 5,
    category: "🎬 Movie Recommendations",
    comment: "CineBot recommended Christopher Nolan movies based on my previous watches. Found PVR Curo High Street Jalandhar IMAX showtime right inside chat!",
    date: "Yesterday",
    upvotes: 28,
    verifiedBuyer: true
  },
  {
    id: "fb_3",
    author: "Amit Patel",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    city: "Ludhiana, Punjab",
    rating: 5,
    category: "🍿 Cinema Hall Experience",
    comment: "Loved the Dolby Atmos audio at Pavilion Mall Ludhiana. Also redeemed my +100 loyalty points for a ₹100 flat discount code!",
    date: "2 days ago",
    upvotes: 19,
    verifiedBuyer: true
  },
  {
    id: "fb_4",
    author: "Simran Verma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    city: "Chandigarh",
    rating: 4,
    category: "⚡ App Speed & UI",
    comment: "Super fast UI theme switching! AMOLED black mode looks amazing on mobile screen.",
    date: "3 days ago",
    upvotes: 15,
    verifiedBuyer: false
  }
];

export const FeedbackSection = () => {
  const { user } = useAuth();
  const { showToast } = useMovie();

  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_user_feedbacks');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_FEEDBACKS;
    } catch (e) {
      return INITIAL_FEEDBACKS;
    }
  });

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('🎬 Movie Recommendations');
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState(user?.name || '');
  const [reviewerCity, setReviewerCity] = useState('Phagwara, Punjab');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    '🎬 Movie Recommendations',
    '🎟️ Ticket Booking & Seats',
    '🍿 Cinema Hall Experience',
    '⚡ App Speed & UI',
    '💡 Feature Suggestion'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFb = {
      id: `fb_${Date.now()}`,
      author: reviewerName.trim() || user?.name || 'CineAI Explorer',
      avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      city: reviewerCity.trim() || "Punjab, India",
      rating: rating,
      category: category,
      comment: comment.trim(),
      date: "Just now",
      upvotes: 1,
      verifiedBuyer: true
    };

    const updated = [newFb, ...feedbacks];
    setFeedbacks(updated);
    try {
      localStorage.setItem('cine_user_feedbacks', JSON.stringify(updated));
    } catch (err) {}

    setComment('');
    setSubmitted(true);
    showToast("🎉 Thank you! Feedback submitted & +50 Loyalty Points awarded!");
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleUpvote = (id) => {
    setFeedbacks(prev => {
      const next = prev.map(f => f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f);
      try { localStorage.setItem('cine_user_feedbacks', JSON.stringify(next)); } catch (e) {}
      return next;
    });
    showToast("Marked feedback as helpful!");
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    if (selectedCategoryFilter === 'All') return true;
    if (selectedCategoryFilter === '5Star') return f.rating === 5;
    return f.category.includes(selectedCategoryFilter);
  });

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '2rem', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--primary-color)', padding: '0.45rem', borderRadius: '10px', color: '#fff' }}>
              <MessageSquare size={22} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Customer Reviews & App Feedback</h2>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Share your cinema booking experience or feature suggestions to help us improve!
          </p>
        </div>

        {/* Analytics Stats Badge */}
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.6rem 1.2rem', borderRadius: 14, border: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>4.9 ★</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>12.4k Ratings</div>
          </div>
          <div style={{ width: 1, background: 'var(--border-color)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>98.4%</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Satisfaction</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2rem' }}>
        
        {/* Left Column: Interactive Feedback Form */}
        <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={18} style={{ color: 'var(--primary-color)' }} /> Submit Your Feedback
          </h3>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: 12, color: '#10b981' }}>
              <CheckCircle size={40} style={{ margin: '0 auto 0.5rem auto' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Feedback Received!</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '0.3rem' }}>
                Your review has been published. You earned **+50 Loyalty Points**!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Rating Star Picker */}
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
                  Overall Satisfaction Rating
                </label>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.1rem', transition: 'transform 0.1s ease' }}
                    >
                      <Star
                        size={24}
                        fill={(hoverRating || rating) >= star ? '#fbbf24' : 'none'}
                        color={(hoverRating || rating) >= star ? '#fbbf24' : '#6b7280'}
                      />
                    </button>
                  ))}
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, marginLeft: '0.4rem', color: '#fbbf24' }}>
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
                  Feedback Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.6rem', borderRadius: 8, fontSize: '0.85rem', outline: 'none' }}
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} style={{ background: '#181820' }}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* User Name & City */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={reviewerName}
                    onChange={e => setReviewerName(e.target.value)}
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.55rem', borderRadius: 8, fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
                    City & Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Phagwara, Punjab"
                    value={reviewerCity}
                    onChange={e => setReviewerCity(e.target.value)}
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.55rem', borderRadius: 8, fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* Comment Text Area */}
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>
                  Your Review / Suggestions
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details about your movie ticket booking experience, theatre comfort, sound quality, or suggestions..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem', borderRadius: 8, fontSize: '0.85rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontSize: '0.92rem' }}
              >
                <Send size={16} /> Submit Review (+50 Pts)
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Live Community Reviews List */}
        <div>
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Filter:</span>
            {['All', '5Star', 'Booking', 'Recommendations'].map(f => (
              <button
                key={f}
                className={`chip-btn ${selectedCategoryFilter === f ? 'active' : ''}`}
                style={{ background: selectedCategoryFilter === f ? 'var(--primary-color)' : 'rgba(255,255,255,0.06)', fontSize: '0.78rem', padding: '0.25rem 0.6rem' }}
                onClick={() => setSelectedCategoryFilter(f)}
              >
                {f === 'All' ? '🌟 All Reviews' : f === '5Star' ? '⭐ 5-Star Only' : f === 'Booking' ? '🎟️ Ticket Booking' : '🎬 Recommendations'}
              </button>
            ))}
          </div>

          {/* Feedback Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.3rem' }}>
            {filteredFeedbacks.map(fb => (
              <div 
                key={fb.id} 
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', transition: 'border-color 0.15s ease' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src={fb.avatar} alt={fb.author} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{fb.author}</strong>
                        {fb.verifiedBuyer && (
                          <span style={{ fontSize: '0.7rem', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '0.1rem 0.4rem', borderRadius: 10, fontWeight: 700 }}>
                            ✓ Verified Buyer
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        📍 {fb.city} • {fb.date}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.15rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill={i < fb.rating ? '#fbbf24' : 'none'} color={i < fb.rating ? '#fbbf24' : '#6b7280'} />
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '0.76rem', color: 'var(--primary-color)', fontWeight: 600, marginBottom: '0.3rem' }}>
                  {fb.category}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                  "{fb.comment}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    className="chip-btn"
                    style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    onClick={() => handleUpvote(fb.id)}
                  >
                    <ThumbsUp size={12} /> Helpful ({fb.upvotes})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
