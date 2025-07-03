import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UseCases from './pages/UseCase';
import About from './pages/About';
import SnippetDetail from './components/SnippetDetail';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  // Force dark theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div data-theme="dark">
      <AuthProvider>
        <Router>
          <Navbar /> {/* Removed darkMode props */}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/useCases" element={<UseCases />} />
            <Route path="/about" element={<About />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/snippets/:id"
              element={
                <ProtectedRoute>
                  <SnippetDetail />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;