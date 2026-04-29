import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PostCard.css';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-image">
        <img src={post.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop'} alt={post.title} />
      </div>
      <div className="post-content">
        <div className="post-category">{post.category}</div>
        <Link to={`/post/${post.id}`} className="post-title-link">
          <h3 className="post-title">{post.title}</h3>
        </Link>
        <p className="post-description">{post.description || post.content.substring(0, 100) + '...'}</p>
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-read-time">{post.readTime || '5'} min read</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
