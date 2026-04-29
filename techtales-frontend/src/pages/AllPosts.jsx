import { useState, useMemo } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/posts/PostCard';
import styles from './AllPosts.module.css';

export default function AllPosts() {
  const { posts, loading, error } = usePosts();
  const [query,    setQuery]    = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))];
    return ['All', ...cats];
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (category !== 'All') result = result.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((p) => p.title?.toLowerCase().includes(q) || p.content?.toLowerCase().includes(q));
    }
    return result;
  }, [posts, category, query]);

  return (
    <main className="container">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>All Posts</h1>
        <p className={styles.count}>{filtered.length} article{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className={styles.search} placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className={styles.cats}>
          {categories.map((c) => (
            <button
              key={c}
              className={`${styles.cat} ${category === c ? styles.catActive : ''}`}
              onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      {loading && <div className={styles.center}><span className="spinner" style={{ width:28,height:28 }} /></div>}
      {error   && <p className={styles.error}>{error}</p>}
      {!loading && !error && filtered.length === 0 && <p className={styles.empty}>No posts found.</p>}
      {!loading && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </main>
  );
}
