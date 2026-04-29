import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPost, getPosts, deletePost } from '../api/postsApi';
import { useAuth } from '../context/AuthContext';
import { formatDate, readTime, postImage, getInitials } from '../utils/helpers';
import PostCard from '../components/posts/PostCard';
import styles from './SinglePost.module.css';

export default function SinglePost() {
  const { id }      = useParams();
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const [post,     setPost]     = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setError(null);
      try {
        const [{ data: p }, { data: all }] = await Promise.all([getPost(id), getPosts()]);
        if (!cancelled) {
          setPost(p);
          setRelated(all.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3));
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Post not found');
      } finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    setDeleting(true);
    try { await deletePost(id); navigate('/posts'); }
    catch { setDeleting(false); }
  };

  if (loading) return <div className={styles.center}><span className="spinner" style={{ width:32,height:32 }} /></div>;
  if (error)   return <div className="container"><p className={styles.error}>{error}</p></div>;
  if (!post)   return null;

  const isOwner = user && post.author?.id === user.id;

  return (
    <div className={`container ${styles.layout}`}>
      <article className={styles.article}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/posts">All Posts</Link> / <span>{post.title}</span>
        </nav>

        {/* Header */}
        <header className={styles.header}>
          {post.category && <span className="tag">{post.category}</span>}
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className={styles.authorAvatar}>{getInitials(post.author?.name || 'A')}</span>
            <span>{post.author?.name}</span>
            <span>·</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>·</span>
            <span>{readTime(post.content)}</span>
          </div>
        </header>

        {/* Cover image */}
        <img className={styles.cover} src={postImage(id)} alt={post.title} />

        {/* Content */}
        <div className={styles.content}>
          {post.content?.split('\n').map((para, i) => para.trim() ? <p key={i}>{para}</p> : null)}
        </div>

        {/* Owner actions */}
        {isOwner && (
          <div className={styles.ownerActions}>
            <Link to={`/posts/${id}/edit`} className="btn btn-secondary btn-sm">Edit Post</Link>
            <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete Post'}
            </button>
          </div>
        )}
      </article>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        {/* Author card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>About the Author</h3>
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatarLg}>{getInitials(post.author?.name || 'A')}</div>
            <div>
              <p className={styles.authorName}>{post.author?.name}</p>
              <p className={styles.authorBio}>{post.author?.bio || 'A developer who loves building things and sharing knowledge.'}</p>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Related Posts</h3>
            <div className={styles.related}>
              {related.map((p) => (
                <Link key={p.id} to={`/posts/${p.id}`} className={styles.relatedItem}>
                  <img src={postImage(p.id)} alt={p.title} />
                  <div>
                    <p className={styles.relatedTitle}>{p.title}</p>
                    <span className={styles.relatedMeta}>{formatDate(p.createdAt)} · {readTime(p.content)}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/posts" className={styles.viewAll}>View all posts →</Link>
          </div>
        )}
      </aside>
    </div>
  );
}
