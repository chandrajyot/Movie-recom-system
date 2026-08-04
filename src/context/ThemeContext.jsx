import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const PRESET_THEMES = [
  { id: 'dark', name: 'Netflix Dark 🎬', primary: '#e50914', bg: '#0f0f13', card: '#181820' },
  { id: 'light', name: 'Clean Light ☀️', primary: '#2563eb', bg: '#f3f4f6', card: '#ffffff' },
  { id: 'blue', name: 'Ocean Blue 🌊', primary: '#00b4d8', bg: '#0a1128', card: '#1c2541' },
  { id: 'purple', name: 'Deep Purple 🌌', primary: '#8b5cf6', bg: '#0f0a1c', card: '#1d1235' },
  { id: 'green', name: 'Emerald Green 🌿', primary: '#10b981', bg: '#061712', card: '#0b2b22' },
  { id: 'red', name: 'Crimson Red 🩸', primary: '#ef4444', bg: '#180808', card: '#2a0f0f' },
  { id: 'orange', name: 'Sunset Orange 🌅', primary: '#f97316', bg: '#190c05', card: '#2e170a' },
  { id: 'pink', name: 'Rose Pink 🌸', primary: '#ec4899', bg: '#1a0a14', card: '#2d1224' },
  { id: 'cyberpunk', name: 'Cyberpunk Neon ⚡', primary: '#ffe600', bg: '#09090d', card: '#13131c' },
  { id: 'amoled', name: 'AMOLED Black 🖤', primary: '#e50914', bg: '#000000', card: '#0a0a0a' }
];

export const FONT_OPTIONS = [
  { id: "'Inter', sans-serif", name: "Inter (Modern)" },
  { id: "'Outfit', sans-serif", name: "Outfit (Trendy)" },
  { id: "'Poppins', sans-serif", name: "Poppins (Friendly)" },
  { id: "'Roboto', sans-serif", name: "Roboto (Clean)" },
  { id: "'Courier New', monospace", name: "Monospace (Tech)" }
];

const DEFAULT_CUSTOM_CONFIG = {
  activeTheme: 'dark',
  primaryColor: '#e50914',
  secondaryColor: '#b91c1c',
  bgColor: '#0f0f13',
  cardColor: '#181820',
  textColor: '#ffffff',
  borderRadius: 12,
  fontStyle: "'Inter', sans-serif"
};

export const ThemeProvider = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_theme_config');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_CONFIG;
    } catch (e) {
      return DEFAULT_CUSTOM_CONFIG;
    }
  });

  useEffect(() => {
    const { activeTheme, primaryColor, secondaryColor, bgColor, cardColor, textColor, borderRadius, fontStyle } = themeConfig;
    
    document.body.setAttribute('data-theme', activeTheme);

    if (primaryColor) document.documentElement.style.setProperty('--primary-color', primaryColor);
    if (secondaryColor) document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    if (bgColor) document.documentElement.style.setProperty('--bg-main', bgColor);
    if (cardColor) document.documentElement.style.setProperty('--bg-card', cardColor);
    if (textColor) document.documentElement.style.setProperty('--text-main', textColor);
    if (borderRadius !== undefined) document.documentElement.style.setProperty('--border-radius', `${borderRadius}px`);
    if (fontStyle) document.documentElement.style.setProperty('--font-family', fontStyle);

    try {
      localStorage.setItem('cine_theme_config', JSON.stringify(themeConfig));
    } catch (e) {}
  }, [themeConfig]);

  const selectPresetTheme = (themeId) => {
    const preset = PRESET_THEMES.find(t => t.id === themeId);
    if (preset) {
      setThemeConfig(prev => ({
        ...prev,
        activeTheme: themeId,
        primaryColor: preset.primary,
        bgColor: preset.bg,
        cardColor: preset.card
      }));
    }
  };

  const updateCustomColors = (key, value) => {
    setThemeConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetTheme = () => {
    setThemeConfig(DEFAULT_CUSTOM_CONFIG);
  };

  return (
    <ThemeContext.Provider value={{
      themeConfig,
      selectPresetTheme,
      updateCustomColors,
      resetTheme,
      PRESET_THEMES,
      FONT_OPTIONS
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
