import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import '../styles/Home.css';

function Home({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Thoughts. Code. Progress.</h1>
        <p className="hero-subtitle">Simple ideas and in-depth tutorials on technology and development.</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="latest-posts-section">
        <div className="section-header">
          <h2>Latest Posts</h2>
          <Link to="/all-posts" className="view-all-link">
            Newest First
          </Link>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <p>🗂️</p>
            <p>You've reached the end</p>
            <p>No more posts to show.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
