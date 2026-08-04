import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_DEFAULT_USER = {
  id: "usr_101",
  name: "Alex Morgan",
  email: "alex.morgan@cineai.com",
  phone: "+91 7319780271",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  bio: "Cinephile & Sci-Fi Enthusiast 🚀",
  favoriteGenres: ["Sci-Fi", "Drama", "Action"],
  joinedDate: "August 2024",
  isLoggedIn: true
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cine_user_session');
      const parsed = saved ? JSON.parse(saved) : null;
      return (parsed && typeof parsed === 'object' && parsed.email) 
        ? { ...parsed, phone: parsed.phone || "+91 7319780271" } 
        : MOCK_DEFAULT_USER;
    } catch (e) {
      return MOCK_DEFAULT_USER;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    try {
      localStorage.setItem('cine_user_session', JSON.stringify(user));
    } catch (e) {}
  }, [user]);

  const login = (email, password) => {
    const loggedInUser = {
      ...user,
      email: email || user.email,
      name: email ? email.split('@')[0] : user.name,
      phone: user.phone || "+91 7319780271",
      isLoggedIn: true
    };
    setUser(loggedInUser);
    setAuthModalOpen(false);
  };

  const signup = (name, email, password, phone) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name || "Movie Explorer",
      email: email || "user@cineai.com",
      phone: phone || "+91 7319780271",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "New to CineBot AI!",
      favoriteGenres: ["Action", "Sci-Fi"],
      joinedDate: "August 2026",
      isLoggedIn: true
    };
    setUser(newUser);
    setAuthModalOpen(false);
  };

  const loginWithGoogle = () => {
    const googleUser = {
      id: "google_usr_99",
      name: "Google Explorer",
      email: "explorer@gmail.com",
      phone: "+91 7319780271",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      bio: "Logged in via Google OAuth 🌟",
      favoriteGenres: ["Drama", "Animation", "Sci-Fi"],
      joinedDate: "August 2026",
      isLoggedIn: true
    };
    setUser(googleUser);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser({ ...user, isLoggedIn: false });
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuth = () => setAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      loginWithGoogle,
      logout,
      updateProfile,
      authModalOpen,
      authMode,
      openAuth,
      closeAuth,
      setAuthMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
