import axios from 'axios';
import { toast } from 'react-toastify';

// 1. Define your API base URL directly
const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

// 2. Create axios instance
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
    // Skip auth-related errors from interceptor
    if (error.config.url.includes('/auth')) {
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      if (localStorage.getItem('token')) {
        toast.error('Session expired. Please login again.');
      }
      localStorage.removeItem('token');
      
      // Use window.location instead of navigate for complete state reset
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?session_expired=true';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;