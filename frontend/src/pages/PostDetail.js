import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/PostDetail.css';

function PostDetail({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="post-detail-page">
        <div className="post-not-found">
          <h2>Post not found</h2>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="post-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/all-posts">All Posts</Link>
        <span>/</span>
        <span>{post.title}</span>
      </div>

      <article className="post-detail">
        <div className="post-header">
          <div className="post-meta-header">
            <span className="post-category-badge">{post.category}</span>
          </div>
          <h1 className="post-detail-title">{post.title}</h1>
          <div className="post-info">
            <div className="author-info">
              <div className="author-avatar">DN</div>
              <div>
                <p className="author-name">Dev Notes</p>
              </div>
            </div>
            <div className="post-stats">
              <span className="post-date">{post.date}</span>
              <span className="post-read-time">{post.readTime || '5'} min read</span>
            </div>
          </div>
        </div>

        <div className="post-featured-image">
          <img src={post.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'} alt={post.title} />
        </div>

        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="post-footer">
          <div className="post-actions">
            <button className="action-btn">❤️ Like</button>
            <button className="action-btn">💬 Comment</button>
            <button className="action-btn">📤 Share</button>
          </div>
        </div>
      </article>

      <aside className="post-sidebar">
        <div className="sidebar-card author-card">
          <h3>About the Author</h3>
          <div className="author-detail">
            <div className="author-avatar-large">DN</div>
            <p className="author-name">Dev Notes</p>
            <p className="author-bio">A developer who loves building things and sharing knowledge.</p>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="sidebar-card related-posts-card">
            <h3>Related Posts</h3>
            <div className="related-posts-list">
              {relatedPosts.map(relPost => (
                <Link key={relPost.id} to={`/post/${relPost.id}`} className="related-post-item">
                  <img src={relPost.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop'} alt={relPost.title} />
                  <div className="related-post-info">
                    <p className="related-post-title">{relPost.title}</p>
                    <span className="related-post-date">{relPost.date}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/all-posts" className="view-all-related">View all posts →</Link>
          </div>
        )}
      </aside>
    </div>
  );
}

export default PostDetail;
