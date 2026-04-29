import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import AllPosts from './pages/AllPosts';
import About from './pages/About';
import Contact from './pages/Contact';
import CreatePost from './pages/CreatePost';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('techposts-posts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('techposts-posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    const post = {
      id: Date.now(),
      ...newPost,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    setPosts([post, ...posts]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home posts={posts.slice(0, 6)} />} />
            <Route path="/all-posts" element={<AllPosts posts={posts} />} />
            <Route path="/post/:id" element={<PostDetail posts={posts} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/create" element={<CreatePost addPost={addPost} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
