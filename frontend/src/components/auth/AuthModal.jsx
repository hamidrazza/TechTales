import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { checkUsername } from '../../api/authApi';
import Modal from '../ui/Modal';

// Debounce hook
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function AuthModal({ mode, onClose, onSwitch }) {
  const { login, signup, loading, error, clearError } = useAuth();

  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [usernameStatus, setUsernameStatus] = useState('idle'); // 'idle'|'checking'|'available'|'taken'

  const debouncedUsername = useDebounce(form.username, 600);

  // Live username availability check (signup only)
  useEffect(() => {
    if (mode !== 'signup' || debouncedUsername.length < 3) {
      setUsernameStatus('idle'); return;
    }
    let cancelled = false;
    setUsernameStatus('checking');
    checkUsername(debouncedUsername)
      .then(({ data }) => {
        if (!cancelled) setUsernameStatus(data.available ? 'available' : 'taken');
      })
      .catch(() => { if (!cancelled) setUsernameStatus('idle'); });
    return () => { cancelled = true; };
  }, [debouncedUsername, mode]);

  const set = (k, v) => { clearError(); setForm((p) => ({ ...p, [k]: v })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'signup' && usernameStatus === 'taken') return;
    try {
      if (mode === 'login') await login({ username: form.username, password: form.password });
      else                  await signup(form);
      onClose();
    } catch { /* error displayed via context */ }
  };

  const switchMode = (m) => { clearError(); setUsernameStatus('idle'); onSwitch(m); };

  const usernameHint = () => {
    if (mode !== 'signup') return null;
    if (form.username.length < 3) return null;
    if (usernameStatus === 'checking') return <span className="text-xs text-gray-400">Checking…</span>;
    if (usernameStatus === 'taken')    return <span className="text-xs text-red-500 font-medium">Username is not available</span>;
    if (usernameStatus === 'available') return <span className="text-xs text-green-600 font-medium">✓ Username is available</span>;
    return null;
  };

  return (
    <Modal onClose={onClose} title={mode === 'login' ? 'Welcome back' : 'Create account'}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {error && (
          <div className="px-3 py-2.5 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Name — signup only */}
        {mode === 'signup' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Full Name</label>
            <input
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
              placeholder="Your full name"
              value={form.name} onChange={(e) => set('name', e.target.value)} required
            />
          </div>
        )}

        {/* Username — both modes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Username</label>
          <input
            className={`w-full px-3 py-2.5 border rounded text-sm outline-none focus:ring-2 focus:ring-black/5 transition
              ${mode === 'signup' && usernameStatus === 'taken'
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-200 focus:border-black'}`}
            placeholder={mode === 'login' ? 'Enter your username' : 'Choose a username'}
            value={form.username} onChange={(e) => set('username', e.target.value.toLowerCase().replace(/\s/g, ''))}
            required autoComplete="username"
          />
          {usernameHint()}
        </div>

        {/* Email — signup only */}
        {mode === 'signup' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
              placeholder="you@example.com"
              value={form.email} onChange={(e) => set('email', e.target.value)} required
            />
          </div>
        )}

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
            placeholder="••••••••"
            value={form.password} onChange={(e) => set('password', e.target.value)}
            required autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </div>

        <button
          type="submit"
          disabled={loading || (mode === 'signup' && usernameStatus === 'taken')}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition mt-1"
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <p className="text-xs text-gray-400 text-center">
          {mode === 'login' ? "Don't have an account? " : 'Already have one? '}
          <button type="button" className="text-black font-medium underline" onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </Modal>
  );
}
