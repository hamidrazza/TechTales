import api from './axios';

export const getPosts     = ()         => api.get('/posts');
export const createPost   = (data)     => api.post('/post', data);
export const updatePost   = (id, data) => api.put(`/post/${id}`, data);
export const deletePost   = (id)       => api.delete(`/post/${id}`);
