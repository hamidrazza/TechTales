import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../ui/Modal';
import styles from './AuthModal.module.css';

export default function AuthModal({ mode, onClose, onSwitch }) {
  const { login, signup, loading, error, clearError } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const set = (k, v) => { clearError(); setForm((p) => ({ ...p, [k]: v })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') await login({ email: form.email, password: form.password });
      else                  await signup(form);
      onClose();
    } catch { /* error shown via context */ }
  };

  const switchMode = (m) => { clearError(); onSwitch(m); };

  return (
    <Modal onClose={onClose} title={mode === 'login' ? 'Welcome back' : 'Create account'}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        {mode === 'signup' && (
          <div className={styles.field}>
            <label htmlFor="tt-name">Name</label>
            <input id="tt-name" className="input" placeholder="Your name"
              value={form.name} onChange={(e) => set('name', e.target.value)} required />
          </div>
        )}
        <div className={styles.field}>
          <label htmlFor="tt-email">Email</label>
          <input id="tt-email" type="email" className="input" placeholder="you@example.com"
            value={form.email} onChange={(e) => set('email', e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="tt-pw">Password</label>
          <input id="tt-pw" type="password" className="input" placeholder="••••••••"
            value={form.password} onChange={(e) => set('password', e.target.value)} required />
        </div>

        <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={loading}>
          {loading ? <span className="spinner" style={{ width:14,height:14 }} /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
        </button>

        <p className={styles.switch}>
          {mode === 'login' ? "Don't have an account? " : 'Already have one? '}
          <button type="button" onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </Modal>
  );
}
