import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Transform response to include default fields
api.interceptors.response.use(
  (res) => {
    // Transform post data to include missing fields
    if (res.config.url?.includes('/posts')) {
      if (Array.isArray(res.data)) {
        res.data = res.data.map(transformPost);
      } else if (res.data?.id) {
        res.data = transformPost(res.data);
      }
    }
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('tt_token');
      localStorage.removeItem('tt_user');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

// Helper function to add missing fields to post objects
function transformPost(post) {
  return {
    ...post,
    createdAt: post.createdAt || new Date().toISOString(),
    author: typeof post.author === 'string' 
      ? { name: post.author, id: post.id }
      : (post.author || { name: 'Anonymous', id: null }),
  };
}

export default api;
