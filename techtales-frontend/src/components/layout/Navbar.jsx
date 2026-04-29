import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import NewPostModal from '../posts/NewPostModal';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [authOpen,    setAuthOpen]    = useState(false);
  const [authMode,    setAuthMode]    = useState('login'); // 'login' | 'signup'
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true); };

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          {/* Brand */}
          <Link to="/" className={styles.brand}>TechTales</Link>

          {/* Nav links */}
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            {['/', '/posts', '/about', '/contact'].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {['Home', 'All Posts', 'About', 'Contact'][i]}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {user ? (
              <>
                <button className="btn btn-primary btn-sm" onClick={() => setNewPostOpen(true)}>
                  <PenIcon /> New Post
                </button>
                <button className="btn btn-ghost btn-sm" onClick={logout}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => openAuth('login')}>Sign In</button>
                <button className="btn btn-primary btn-sm" onClick={() => setNewPostOpen(true)}>
                  <PenIcon /> New Post
                </button>
              </>
            )}
            <button className={styles.burger} onClick={() => setMenuOpen((p) => !p)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {authOpen    && <AuthModal mode={authMode} onClose={() => setAuthOpen(false)} onSwitch={setAuthMode} />}
      {newPostOpen && <NewPostModal onClose={() => setNewPostOpen(false)} />}
    </>
  );
}

const PenIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
