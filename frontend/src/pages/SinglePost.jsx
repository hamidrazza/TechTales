import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api/postsApi';
import { useAuth } from '../context/AuthContext';
import { formatDate, readTime, getInitials } from '../utils/helpers';
import PostCard from '../components/posts/PostCard';

export default function SinglePost() {
  const { id }   = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

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
        const { data: all } = await getPosts();
        const foundPost = all.find(p => p.id === parseInt(id));
        if (!cancelled) {
          if (foundPost) {
            setPost(foundPost);
            setRelated(all.filter((x) => x.id !== foundPost.id && x.category === foundPost.category).slice(0, 3));
          } else {
            setError('Post not found');
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load post');
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

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
    </div>
  );
  if (error)  return <div className="max-w-6xl mx-auto px-6"><p className="text-red-500 py-10 text-sm">{error}</p></div>;
  if (!post)  return null;

  // Owner = author of post OR admin
  const canEdit = user && (post.author?.id === user.id || isAdmin);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-8 pb-20 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 items-start">

      {/* ── Article ── */}
      <article>
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <Link to="/posts" className="hover:text-black transition">All Posts</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-6">
          {post.category && (
            <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] font-semibold uppercase tracking-wider rounded-sm mb-3">
              {post.category}
            </span>
          )}
          <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold">
              {getInitials(post.author?.name || 'A')}
            </span>
            <span>{post.author?.name}</span>
            <span>·</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>·</span>
            <span>{readTime(post.content)}</span>
          </div>
        </header>

        {/* Content */}
        <div className="text-[15px] text-gray-800 leading-[1.8] space-y-4">
          {post.content?.split('\n').map((para, i) => para.trim() ? <p key={i}>{para}</p> : null)}
        </div>

        {/* Owner actions */}
        {canEdit && (
          <div className="flex gap-2 mt-8 pt-6 border-t border-gray-100">
            <Link to={`/posts/${id}/edit`}
              className="px-4 py-2 border border-gray-200 rounded text-sm font-medium hover:bg-gray-50 transition">
              Edit Post
            </Link>
            <button onClick={handleDelete} disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 disabled:opacity-60 transition">
              {deleting ? 'Deleting…' : 'Delete Post'}
            </button>
          </div>
        )}
      </article>

      {/* ── Sidebar ── */}
      <aside className="flex flex-col gap-4 md:sticky md:top-20">
        {/* Author */}
        <div className="border border-gray-200 rounded-lg p-5">
          <h3 className="font-display font-bold text-sm mb-3">About the Author</h3>
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              {getInitials(post.author?.name || 'A')}
            </div>
            <div>
              <p className="text-sm font-semibold">{post.author?.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                {post.author?.bio || 'A developer who loves building things and sharing knowledge.'}
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-display font-bold text-sm mb-3">Related Posts</h3>
            <div className="flex flex-col gap-3">
              {related.map((p) => (
                <Link key={p.id} to={`/posts/${p.id}`} className="group">
                  <div className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition border border-gray-200 hover:border-gray-300">
                    <p className="text-xs font-semibold text-gray-900 leading-tight group-hover:text-black transition line-clamp-2">{p.title}</p>
                    <span className="text-[11px] text-gray-500 mt-1.5 block">{formatDate(p.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/posts" className="block mt-4 text-xs font-medium text-gray-500 hover:text-black transition">
              View all posts →
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
