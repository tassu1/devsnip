import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // Send in both headers for compatibility
    config.headers['x-auth-token'] = token;
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
// Response interceptor
api.interceptors.response.use(response => response, error => {
  if (error.config.url.includes('/auth')) return Promise.reject(error);
  
  if (error.response?.status === 401) {
    if (localStorage.getItem('token')) {
      toast.error('Session expired. Please login again.');
    }
    localStorage.removeItem('token');
    window.location.href = '/login?expired=true'; // Full reload to clear state
  }
  return Promise.reject(error);
});

export default api;