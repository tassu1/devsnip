import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    
    // Skip handling for auth endpoints
    if (originalRequest.url.includes('/auth')) {
      return Promise.reject(error);
    }
    
    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Only show message and redirect if there was a token (meaning user was previously authenticated)
      if (localStorage.getItem('token')) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login?session_expired=true';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;