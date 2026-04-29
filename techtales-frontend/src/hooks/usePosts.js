import { useState, useEffect, useCallback } from 'react';
import { getPosts } from '../api/postsApi';

export function usePosts() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}
