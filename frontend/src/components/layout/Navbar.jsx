import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import NewPostModal from '../posts/NewPostModal';

const NAV_LINKS = [
  { to: '/',       label: 'Home',      end: true },
  { to: '/posts',  label: 'All Posts', end: false },
  { to: '/about',  label: 'About',     end: false },
  { to: '/contact',label: 'Contact',   end: false },
];

export default function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const [authOpen,    setAuthOpen]    = useState(false);
  const [authMode,    setAuthMode]    = useState('login');
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  const openAuth = (mode) => { setAuthMode(mode); setAuthOpen(true); };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-6">

          {/* Brand */}
          <Link to="/" className="font-display font-bold text-lg tracking-tight shrink-0">
            TechTales
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-sm transition ${isActive
                    ? 'text-black font-medium'
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'}`
                }
                onClick={() => setMenuOpen(false)}
              >{label}</NavLink>
            ))}
          </nav>

          {/* Right actions — ROLE-BASED */}
          <div className="flex items-center gap-2 ml-auto">
            {isLoggedIn ? (
              /* ── Authenticated ── */
              <>
                {/* Full Name badge */}
                <span className="hidden sm:inline text-xs text-gray-600 font-medium">
                  {user?.name}
                  {isAdmin && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-black text-white text-[10px] font-semibold rounded">
                      ADMIN
                    </span>
                  )}
                </span>

                {/* New Post — visible to all authenticated users */}
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
                  onClick={() => setNewPostOpen(true)}
                >
                  <PenIcon /> New Post
                </button>

                <button
                  className="px-3 py-1.5 text-sm text-gray-500 hover:text-black rounded hover:bg-gray-50 transition"
                  onClick={logout}
                >Sign Out</button>
              </>
            ) : (
              /* ── Guest — show Sign In + Sign Up only ── */
              <>
                <button
                  className="px-3 py-1.5 text-sm text-gray-500 hover:text-black rounded hover:bg-gray-50 transition"
                  onClick={() => openAuth('login')}
                >Sign In</button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
                  onClick={() => openAuth('signup')}
                >Sign Up</button>
              </>
            )}

            {/* Mobile burger */}
            <button
              className="md:hidden p-1.5 rounded hover:bg-gray-100 transition ml-1"
              onClick={() => setMenuOpen((p) => !p)} aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-gray-100 px-6 py-3 flex flex-col gap-1 bg-white">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm ${isActive ? 'text-black font-medium bg-gray-50' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                onClick={() => setMenuOpen(false)}
              >{label}</NavLink>
            ))}
          </nav>
        )}
      </header>

      {authOpen    && <AuthModal mode={authMode} onClose={() => setAuthOpen(false)} onSwitch={setAuthMode} />}
      {newPostOpen && <NewPostModal onClose={() => setNewPostOpen(false)} />}
    </>
  );
}

const PenIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
