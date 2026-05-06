import api from './axios';

export const signup        = (data)     => api.post('/auth/signup', data);
export const login         = (data)     => api.post('/auth/login',  data);
export const checkUsername = (username) => api.get('/auth/check-username', { params: { username } });
