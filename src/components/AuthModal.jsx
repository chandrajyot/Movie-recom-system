import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { authModalOpen, authMode, closeAuth, setAuthMode, login, signup, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(email, password);
    } else if (authMode === 'signup') {
      signup(name, email, password);
    } else if (authMode === 'forgot') {
      setForgotSent(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeAuth}>
      <div className="modal-content" style={{ maxWidth: '420px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeAuth}>
          <X size={18} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: 50, height: 50, background: 'var(--primary-color)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '0.75rem' }}>
            <Lock size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {authMode === 'login' && 'Welcome Back'}
            {authMode === 'signup' && 'Create Account'}
            {authMode === 'forgot' && 'Reset Password'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {authMode === 'login' && 'Log in to sync your AI watch recommendations.'}
            {authMode === 'signup' && 'Join CineAI to unlock personalized recommendations.'}
            {authMode === 'forgot' && 'Enter your email to receive a password reset link.'}
          </p>
        </div>

        {forgotSent && authMode === 'forgot' ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#6ee7b7', padding: '1rem', borderRadius: 10, textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Reset link has been sent to <strong>{email || 'your email'}</strong>!
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {authMode === 'signup' && (
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: 8, outline: 'none' }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="alex@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: 8, outline: 'none' }}
                />
              </div>
            </div>

            {authMode !== 'forgot' && (
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.65rem 0.65rem 0.65rem 2.4rem', borderRadius: 8, outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {authMode === 'login' && (
              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot')}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.5rem' }}>
              {authMode === 'login' && 'Sign In'}
              {authMode === 'signup' && 'Create Account'}
              {authMode === 'forgot' && 'Send Reset Link'}
            </button>
          </form>
        )}

        {authMode !== 'forgot' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1.25rem 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
              <span>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
            </div>

            <button
              onClick={loginWithGoogle}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                padding: '0.65rem',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {authMode === 'login' ? (
            <span>Don't have an account? <button onClick={() => setAuthMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}>Sign Up</button></span>
          ) : (
            <span>Already have an account? <button onClick={() => setAuthMode('login')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 600, cursor: 'pointer' }}>Log In</button></span>
          )}
        </div>
      </div>
    </div>
  );
};
