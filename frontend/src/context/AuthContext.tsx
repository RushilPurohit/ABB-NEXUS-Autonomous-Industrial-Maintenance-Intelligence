import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  shift: string;
  avatar: string;
  authMode: 'DEMO_SSO' | 'CREDENTIALS';
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithSSO: () => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: UserProfile = {
  name: 'Technician',
  email: 'technician@abb.com',
  role: 'Field Maintenance Engineer',
  shift: 'Shift A (Robotics & Drives)',
  avatar: 'T',
  authMode: 'CREDENTIALS',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user_profile');
    if (savedToken && savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return MOCK_USER;
      }
    }
    return savedToken ? MOCK_USER : null;
  });

  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setError(null);
    if (!email || !pass) {
      setError('Please provide both email and password.');
      return false;
    }
    // Simulate brief authentication check
    await new Promise(r => setTimeout(r, 400));
    const loggedUser: UserProfile = {
      ...MOCK_USER,
      email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      authMode: 'CREDENTIALS',
    };
    localStorage.setItem('token', 'abb-nexus-session-token');
    localStorage.setItem('user_profile', JSON.stringify(loggedUser));
    setUser(loggedUser);
    return true;
  };

  const loginWithSSO = async (): Promise<boolean> => {
    setError(null);
    console.log('[AUTH MODE: DEMO] Initiating Corporate SSO Authentication Flow...');
    await new Promise(r => setTimeout(r, 600));
    const ssoUser: UserProfile = {
      name: 'Technician (Corporate SSO)',
      email: 'sso.technician@abb.com',
      role: 'Lead Diagnostics Engineer',
      shift: 'Shift A (Central Plant)',
      avatar: 'ABB',
      authMode: 'DEMO_SSO',
    };
    localStorage.setItem('token', 'abb-nexus-sso-token');
    localStorage.setItem('user_profile', JSON.stringify(ssoUser));
    setUser(ssoUser);
    return true;
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    setError(null);
    if (!name || !email || !pass) {
      setError('Please fill in all registration fields.');
      return false;
    }
    await new Promise(r => setTimeout(r, 400));
    const newUser: UserProfile = {
      name,
      email,
      role: 'Maintenance Technician',
      shift: 'Shift A',
      avatar: name.charAt(0).toUpperCase(),
      authMode: 'CREDENTIALS',
    };
    localStorage.setItem('token', 'abb-nexus-session-token');
    localStorage.setItem('user_profile', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    console.log('[AUTH] Logging out user and clearing active session token...');
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithSSO,
        signup,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
