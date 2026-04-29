import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import '../styles/AllPosts.css';

function AllPosts({ posts }) {
  const [sortBy, setSortBy] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(posts.map(p => p.category))];

  let filteredPosts = filterCategory === 'all'
    ? posts
    : posts.filter(p => p.category === filterCategory);

  if (sortBy === 'oldest') {
    filteredPosts = [...filteredPosts].reverse();
  }

  return (
    <div className="all-posts-page">
      <div className="all-posts-header">
        <h1>All Posts</h1>
        <p>Explore all articles and tutorials</p>
      </div>

      <div className="posts-controls">
        <div className="filter-group">
          <label>Filter by Category:</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="posts-grid-all">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="no-posts-message">
          <p>🗂️</p>
          <p>No posts found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
