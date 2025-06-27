import { createContext, useState, useEffect, useMemo } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

// 1. Create and export context at the top level
export const UserContext = createContext(null);

// 2. Define provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user function
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const { data } = await api.get('/auth/user');
      const userData = data?.user || data;
      const userId = userData?.id || userData?._id;
      
      if (!userId) throw new Error('User identification missing');
      
      setUser({ ...userData, id: userId });
      return userData;
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      
      // If user data comes with login response, use it
      if (data.user) {
        const userId = data.user.id || data.user._id;
        setUser({ ...data.user, id: userId });
      } else {
        await fetchUser();
      }
      
      return data;
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  // Update user function
  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  // Initialize auth state on mount
  useEffect(() => {
    fetchUser().catch(() => { /* silent catch */ });
  }, []);

  // Memoize context value
  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    fetchUser
  }), [user, loading]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Default export is just the provider
export default UserProvider;