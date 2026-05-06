export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const readTime = (content = '') => {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

export const truncate = (str = '', len = 120) =>
  str.length <= len ? str : str.slice(0, len).trimEnd() + '…';

export const getInitials = (name = '') =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

// Unsplash deterministic image by post id
export const postImage = (id) =>
  `https://source.unsplash.com/600x400/?technology,code&sig=${id}`;
