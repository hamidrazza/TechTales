import { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin, signup as apiSignup } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tt_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // role helpers
  const isLoggedIn = Boolean(user);
  const role       = user?.role ?? null;          // e.g. "ROLE_ADMIN" | "ROLE_USER"
  const isAdmin    = role === 'ROLE_ADMIN';

  const _persist = (token, userData) => {
    localStorage.setItem('tt_token', token);
    localStorage.setItem('tt_user',  JSON.stringify(userData));
    setUser(userData);
  };

  // Login uses USERNAME + password (not email)
  const login = useCallback(async ({ username, password }) => {
    setLoading(true); setError(null);
    try {
      const { data } = await apiLogin({ username, password });
      _persist(data.token, data.user);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid username or password';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }, []);

  const signup = useCallback(async ({ name, username, email, password }) => {
    setLoading(true); setError(null);
    try {
      const { data } = await apiSignup({ name, username, email, password });
      _persist(data.token, data.user);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('tt_token');
    localStorage.removeItem('tt_user');
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, error, isLoggedIn, isAdmin, role, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
