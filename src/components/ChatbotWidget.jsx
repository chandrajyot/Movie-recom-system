import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Mic, Volume2, VolumeX, Trash2, Sparkles, Ticket, Star, Bookmark, CheckCircle, Printer, ShieldCheck, Lock, KeyRound } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useMovie } from '../context/MovieContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

export const ChatbotWidget = ({ isFullPage = false }) => {
  const { 
    messages, 
    sendMessage, 
    confirmAutoBookingAuth,
    isTyping, 
    isListening, 
    startVoiceInput, 
    voiceEnabled, 
    setVoiceEnabled, 
    clearChat,
    chatDrawerOpen,
    setChatDrawerOpen
  } = useChat();

  const { setSelectedMovieModal, toggleWatchlist, watchlist } = useMovie();
  const { initiateBooking } = useBooking();
  const { user } = useAuth();
  const userPhone = user?.phone || "+91 7319780271";

  const [inputText, setInputText] = useState('');
  const [chatOtpInput, setChatOtpInput] = useState('482910');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const renderContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-bot-info">
          <div className="chat-avatar">
            <Bot size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              CineBot AI <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3D Secure Auto-Booking Assistant</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button 
            className="icon-btn" 
            style={{ width: 32, height: 32, padding: 0 }}
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title={voiceEnabled ? "Mute Voice Response" : "Enable Voice Response"}
          >
            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} style={{ color: '#ef4444' }} />}
          </button>

          <button 
            className="icon-btn" 
            style={{ width: 32, height: 32, padding: 0 }}
            onClick={clearChat}
            title="Clear Chat History"
          >
            <Trash2 size={16} />
          </button>

          {!isFullPage && (
            <button 
              className="icon-btn" 
              style={{ width: 32, height: 32, padding: 0 }}
              onClick={() => setChatDrawerOpen(false)}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="chat-messages-area">
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div className={`message-bubble ${msg.sender}`}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>

              {/* Payment Authentication Request Card */}
              {msg.pendingTicket && (
                <div style={{ marginTop: '0.75rem', background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(0,0,0,0.5) 100%)', border: '1px solid #ef4444', borderRadius: 14, padding: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <ShieldCheck size={16} /> Bank 3D Secure Authentication
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    Movie: <strong style={{ color: '#fff' }}>{msg.pendingTicket.movieTitle}</strong> • Amount: <strong style={{ color: '#10b981' }}>{msg.pendingTicket.currencySymbol}{msg.pendingTicket.totalAmount}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <input
                      type="password"
                      maxLength={6}
                      value={chatOtpInput}
                      onChange={e => setChatOtpInput(e.target.value)}
                      placeholder="6-digit Banking OTP"
                      style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: 8, fontSize: '0.85rem', textAlign: 'center', letterSpacing: '2px', outline: 'none' }}
                    />
                    <button
                      className="btn-primary"
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem', background: '#10b981' }}
                      onClick={() => confirmAutoBookingAuth(msg.pendingTicket)}
                    >
                      <Lock size={12} /> Authenticate
                    </button>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>📱 OTP sent to {userPhone}</span>
                </div>
              )}

              {/* Embedded Auto-Booked Digital Ticket Pass */}
              {msg.autoTicket && (
                <div style={{ marginTop: '0.75rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0.5) 100%)', border: '1px solid #10b981', borderRadius: 14, padding: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <img src={msg.autoTicket.poster} alt={msg.autoTicket.movieTitle} style={{ width: 50, height: 75, borderRadius: 6, objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{msg.autoTicket.movieTitle}</div>
                      <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, marginTop: '0.1rem' }}>
                        {msg.autoTicket.theatreName} ({msg.autoTicket.city})
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                        Seats: <strong style={{ color: '#fff' }}>{msg.autoTicket.seats.join(', ')}</strong> • {msg.autoTicket.showTime}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.45rem 0.75rem', borderRadius: 8, color: '#111827', marginBottom: '0.6rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                      ID: {msg.autoTicket.id}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669' }}>
                      {msg.autoTicket.currencySymbol}{msg.autoTicket.totalAmount.toFixed(2)}
                    </div>
                  </div>

                  <button 
                    className="btn-secondary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '0.4rem', fontSize: '0.78rem' }}
                    onClick={handlePrintTicket}
                  >
                    <Printer size={14} /> Print Pass
                  </button>
                </div>
              )}

              {/* Action Button for Manual Booking Selector */}
              {msg.actionType === 'BOOK_NOW' && msg.targetMovie && !msg.autoTicket && !msg.pendingTicket && (
                <div style={{ marginTop: '0.75rem' }}>
                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', padding: '0.6rem' }}
                    onClick={() => {
                      if (!isFullPage) setChatDrawerOpen(false);
                      initiateBooking(msg.targetMovie);
                    }}
                  >
                    <Ticket size={16} /> Select Seats & Book Tickets
                  </button>
                </div>
              )}

              {/* Embedded Recommended Movies Cards */}
              {msg.recommendedMovies && msg.recommendedMovies.length > 0 && !msg.autoTicket && !msg.pendingTicket && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem', marginTop: '0.75rem' }}>
                  {msg.recommendedMovies.map(movie => {
                    return (
                      <div 
                        key={movie.id}
                        style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                        onClick={() => setSelectedMovieModal(movie)}
                      >
                        <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
                        <div style={{ padding: '0.4rem' }}>
                          <p style={{ fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
                            <span style={{ fontSize: '0.7rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                              <Star size={10} fill="#fbbf24" /> {movie.imdbRating}
                            </span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); initiateBooking(movie); }}
                              style={{ background: 'var(--primary-color)', border: 'none', color: '#fff', borderRadius: 4, padding: '0.15rem 0.4rem', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick suggested chips */}
            {msg.suggestedQuestions && (
              <div className="quick-chips">
                {msg.suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    className="chip-btn" 
                    onClick={() => sendMessage(q)}
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            )}

            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem', padding: '0 0.3rem' }}>
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="message-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
            <Sparkles size={14} style={{ animation: 'spin 2s linear infinite' }} />
            <span>CineBot is requesting SMS authentication for {userPhone}...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Row */}
      <form onSubmit={handleSend} className="chat-input-row">
        <button
          type="button"
          onClick={startVoiceInput}
          className="icon-btn"
          style={{
            background: isListening ? '#ef4444' : 'rgba(255,255,255,0.08)',
            borderColor: isListening ? '#ef4444' : 'var(--border-color)',
            width: 36,
            height: 36,
            padding: 0
          }}
          title="Voice Search Input"
        >
          <Mic size={16} />
        </button>

        <input 
          type="text" 
          placeholder={isListening ? "Listening... Speak now..." : "Type e.g. 'book 2 tickets for Interstellar'..."} 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />

        <button type="submit" className="btn-primary" style={{ padding: '0.55rem', borderRadius: '50%' }}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );

  if (isFullPage) {
    return (
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 20, height: '75vh', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
        {renderContent()}
      </div>
    );
  }

  return (
    <>
      <button 
        className="chatbot-floating-btn"
        onClick={() => setChatDrawerOpen(!chatDrawerOpen)}
        title="Open CineBot AI Assistant"
      >
        {chatDrawerOpen ? <X size={26} /> : <Bot size={28} />}
      </button>

      {chatDrawerOpen && (
        <div className="chatbot-drawer">
          {renderContent()}
        </div>
      )}
    </>
  );
};
