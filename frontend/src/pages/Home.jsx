import { useState, useMemo } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/posts/PostCard';

const SORT = [{ value: 'newest', label: 'Newest First' }, { value: 'oldest', label: 'Oldest First' }];

export default function Home() {
  const { posts, loading, error } = usePosts();
  const [query, setQuery] = useState('');
  const [sort,  setSort]  = useState('newest');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let r = posts.filter((p) =>
      p.title?.toLowerCase().includes(q) || p.content?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    );
    return sort === 'oldest' ? [...r].reverse() : r;
  }, [posts, query, sort]);

  return (
    <main>
      {/* Hero */}
      <section className="py-16 md:py-24 text-center border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="font-display font-black text-5xl md:text-7xl tracking-tight leading-none mb-4">
            Thoughts. Code. Progress.
          </h1>
          <p className="text-gray-500 text-base md:text-lg mb-8">
            Simple ideas and in-depth tutorials on technology and development.
          </p>
          {/* Search */}
          <div className="flex items-center gap-2.5 max-w-xl mx-auto px-4 border border-gray-200 rounded-full bg-white focus-within:ring-2 focus-within:ring-black/10 focus-within:border-gray-400 transition">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="flex-1 py-3 text-sm bg-transparent outline-none placeholder:text-gray-400"
              placeholder="Search articles…"
              value={query} onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto px-6 py-10 pb-20">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-2xl">Latest Posts</h2>
          <select
            className="text-sm border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-black appearance-none bg-white pr-8 transition"
            value={sort} onChange={(e) => setSort(e.target.value)}
          >
            {SORT.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {loading && <div className="flex justify-center py-20"><span className="w-7 h-7 border-2 border-gray-200 border-t-black rounded-full animate-spin" /></div>}
        {error   && <p className="text-red-500 text-sm py-6">{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-gray-400 text-sm">
            <InboxIcon />
            <p>{query ? 'No results found.' : 'No posts yet.'}</p>
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
            <div className="flex flex-col items-center gap-1.5 pt-10 border-t border-gray-100 mt-8 text-gray-400 text-sm">
              <InboxIcon />
              <p>You've reached the end</p>
              <span className="text-xs">No more posts to show.</span>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

const InboxIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);
