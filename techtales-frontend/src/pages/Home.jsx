import { useState, useMemo } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/posts/PostCard';
import styles from './Home.module.css';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export default function Home() {
  const { posts, loading, error } = usePosts();
  const [query, setQuery] = useState('');
  const [sort,  setSort]  = useState('newest');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let result = posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.content?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
    if (sort === 'oldest') result = [...result].reverse();
    return result;
  }, [posts, query, sort]);

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.headline}>Thoughts. Code. Progress.</h1>
          <p className={styles.sub}>Simple ideas and in-depth tutorials on technology and development.</p>
          <div className={styles.searchWrap}>
            <SearchIcon />
            <input
              className={styles.search}
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Posts</h2>
          <select className={`input select ${styles.sort}`} value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {loading && (
          <div className={styles.center}>
            <span className="spinner" style={{ width: 28, height: 28 }} />
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <div className={styles.empty}>
            <InboxIcon />
            <p>{query ? 'No results found.' : 'No posts yet.'}</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className={styles.end}>
            <InboxIcon />
            <p>You've reached the end</p>
            <span>No more posts to show.</span>
          </div>
        )}
      </section>
    </main>
  );
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const InboxIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);
