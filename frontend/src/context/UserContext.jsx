import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

// 1. First create the context (without export)
const UserContext = createContext();

// 2. Create the provider component (without export)
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // In UserContext.jsx
const fetchUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    setUser(null);
    return null;
  }

  try {
    const { data } = await api.get('/auth/user');
    const userData = data?.user || data;
    if (!userData?.id) throw new Error('User ID missing in response');
    setUser(userData);
    return userData;
  } catch (err) {
    console.error('User fetch error:', err);
    localStorage.removeItem('token');
    setUser(null);
    return null;
  }
};

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      await fetchUser();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      loading, 
      login, 
      logout,
      updateUser,
      fetchUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Single, complete export statement at the bottom
export {
  UserContext,   // The context object for consumers
  UserProvider   // The provider component
};

// 4. Optional: Default export if preferred
export default UserProvider;