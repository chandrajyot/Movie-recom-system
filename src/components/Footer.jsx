import React from 'react';
import { Film, Heart, Sparkles, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ background: 'rgba(0,0,0,0.5)', borderTop: '1px solid var(--border-color)', padding: '3rem 2rem 2rem 2rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="brand-logo" style={{ marginBottom: '0.75rem' }}>
              <div className="icon-box">
                <Film size={20} />
              </div>
              <span>CineAI <span style={{ color: 'var(--primary-color)' }}>Recommend</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: 360, lineHeight: 1.5 }}>
              AI-Powered Movie Discovery System featuring natural language conversational assistant, real-time custom themes, and content-based recommendation engine.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Features</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <li>AI Movie Recommendations</li>
                <li>CineBot Natural Language AI</li>
                <li>9+ Preset & Custom Color Themes</li>
                <li>Voice Input & Output Speech</li>
                <li>Watchlist & Favorites Sync</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Technologies</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <li>React 18 + Vite</li>
                <li>CSS Custom Tokens Engine</li>
                <li>Web Speech Synthesis & Recognition</li>
                <li>TMDB & Gemini LLM Bridge</li>
                <li>Local Storage Encryption</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <p>© 2026 CineAI Recommendation System. Built with React & AI.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span>AI Vector Engine Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
