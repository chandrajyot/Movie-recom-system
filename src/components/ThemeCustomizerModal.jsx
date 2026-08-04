import React from 'react';
import { X, Palette, RotateCcw, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeCustomizerModal = ({ isOpen, onClose }) => {
  const { themeConfig, selectPresetTheme, updateCustomColors, resetTheme, PRESET_THEMES, FONT_OPTIONS } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '650px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--primary-color)', padding: '0.5rem', borderRadius: '10px', color: '#fff' }}>
            <Palette size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Dynamic Theme Customizer</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customize color palettes, typography, and card radius in real-time.</p>
          </div>
        </div>

        {/* Preset Themes Section */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
            Choose Preset Theme (9 Themes)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {PRESET_THEMES.map(theme => {
              const isActive = themeConfig.activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => selectPresetTheme(theme.id)}
                  style={{
                    background: theme.bg,
                    border: `2px solid ${isActive ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '10px',
                    padding: '0.75rem',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 12px rgba(229,9,20,0.4)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: theme.primary }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{theme.name}</span>
                  </div>
                  {isActive && <Check size={16} style={{ color: 'var(--primary-color)' }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Fine-Tuning Controls */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '14px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-muted)' }}>
            Fine-Tune Colors & Design Tokens
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Primary Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="color" 
                  value={themeConfig.primaryColor} 
                  onChange={e => updateCustomColors('primaryColor', e.target.value)} 
                  style={{ width: 40, height: 35, border: 'none', borderRadius: 6, cursor: 'pointer' }}
                />
                <input 
                  type="text" 
                  value={themeConfig.primaryColor} 
                  onChange={e => updateCustomColors('primaryColor', e.target.value)} 
                  style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Background Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="color" 
                  value={themeConfig.bgColor} 
                  onChange={e => updateCustomColors('bgColor', e.target.value)} 
                  style={{ width: 40, height: 35, border: 'none', borderRadius: 6, cursor: 'pointer' }}
                />
                <input 
                  type="text" 
                  value={themeConfig.bgColor} 
                  onChange={e => updateCustomColors('bgColor', e.target.value)} 
                  style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Card Surface Color</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="color" 
                  value={themeConfig.cardColor} 
                  onChange={e => updateCustomColors('cardColor', e.target.value)} 
                  style={{ width: 40, height: 35, border: 'none', borderRadius: 6, cursor: 'pointer' }}
                />
                <input 
                  type="text" 
                  value={themeConfig.cardColor} 
                  onChange={e => updateCustomColors('cardColor', e.target.value)} 
                  style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: 6, fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', display: 'block', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>Font Style</label>
              <select 
                value={themeConfig.fontStyle}
                onChange={e => updateCustomColors('fontStyle', e.target.value)}
                style={{ width: '100%', height: 35, background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: 6, padding: '0.3rem 0.6rem', fontSize: '0.85rem' }}
              >
                {FONT_OPTIONS.map(font => (
                  <option key={font.id} value={font.id} style={{ background: '#181820', color: '#fff' }}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              <span>Border Radius</span>
              <span>{themeConfig.borderRadius}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="24" 
              value={themeConfig.borderRadius} 
              onChange={e => updateCustomColors('borderRadius', Number(e.target.value))} 
              style={{ width: '100%', accentColor: 'var(--primary-color)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn-secondary" onClick={resetTheme}>
            <RotateCcw size={16} /> Reset Default
          </button>
          <button className="btn-primary" onClick={onClose}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};
