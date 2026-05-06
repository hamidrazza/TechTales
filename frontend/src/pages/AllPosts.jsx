import { useState, useMemo } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/posts/PostCard';

export default function AllPosts() {
  const { posts, loading, error } = usePosts();
  const [query,    setQuery]    = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))];
    return ['All', ...cats];
  }, [posts]);

  const filtered = useMemo(() => {
    let r = category === 'All' ? posts : posts.filter((p) => p.category === category);
    if (query) { const q = query.toLowerCase(); r = r.filter((p) => p.title?.toLowerCase().includes(q) || p.content?.toLowerCase().includes(q)); }
    return r;
  }, [posts, category, query]);

  return (
    <main className="max-w-6xl mx-auto px-6 pb-20">
      {/* Page header */}
      <div className="py-12 flex items-baseline gap-3">
        <h1 className="font-display font-extrabold text-4xl">All Posts</h1>
        <span className="text-sm text-gray-400">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 px-3 border border-gray-200 rounded-full flex-1 min-w-[180px] max-w-xs focus-within:border-black transition">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="flex-1 py-2 text-sm bg-transparent outline-none placeholder:text-gray-400" placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition
                ${category === c ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >{c}</button>
          ))}
        </div>
      </div>

      {loading && <div className="flex justify-center py-20"><span className="w-7 h-7 border-2 border-gray-200 border-t-black rounded-full animate-spin" /></div>}
      {error   && <p className="text-red-500 text-sm">{error}</p>}
      {!loading && !error && filtered.length === 0 && <p className="text-center text-gray-400 py-16 text-sm">No posts found.</p>}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </main>
  );
}
