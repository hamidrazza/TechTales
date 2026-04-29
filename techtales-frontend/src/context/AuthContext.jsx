import { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin, signup as apiSignup } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('tt_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true); setError(null);
    try {
      const { data } = await apiLogin(credentials);
      localStorage.setItem('tt_token', data.token);
      localStorage.setItem('tt_user',  JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg); throw new Error(msg);
    } finally { setLoading(false); }
  }, []);

  const signup = useCallback(async (credentials) => {
    setLoading(true); setError(null);
    try {
      const { data } = await apiSignup(credentials);
      localStorage.setItem('tt_token', data.token);
      localStorage.setItem('tt_user',  JSON.stringify(data.user));
      setUser(data.user);
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
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
