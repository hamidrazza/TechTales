import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar  from './components/layout/Navbar';
import Footer  from './components/layout/Footer';
import Home       from './pages/Home';
import AllPosts   from './pages/AllPosts';
import { About, Contact } from './pages/Static';

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />}       />
            <Route path="/posts"     element={<AllPosts />}   />
            <Route path="/about"     element={<About />}      />
            <Route path="/contact"   element={<Contact />}    />
            <Route path="*"          element={<NotFound />}   />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '120px 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 900, color: 'var(--gray-200)' }}>404</h1>
      <p style={{ color: 'var(--gray-600)', marginTop: 8 }}>Page not found.</p>
    </div>
  );
}
