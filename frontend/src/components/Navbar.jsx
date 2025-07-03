import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi'; // Removed sun/moon icons
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => { // Removed darkMode props
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <button 
              onClick={handleLogoClick}
              className="text-xl md:text-2xl font-bold font-mono dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              aria-label={isAuthenticated ? "Dashboard" : "Home"}
            >
              &lt;/CodeSnip&gt;
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">Home</NavLink>
                <NavLink to="/useCases">Use Cases</NavLink>
                <NavLink to="/about">About</NavLink>
                <button 
                  onClick={handleLogout}
                  className="dark:text-gray-300 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/useCases">Use Cases</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-3 pb-4"
          >
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/useCases" onClick={() => setMobileMenuOpen(false)}>
                  Use Cases
                </MobileNavLink>
                <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800 transition-colors font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/useCases" onClick={() => setMobileMenuOpen(false)}>
                  Use Cases
                </MobileNavLink>
                <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </MobileNavLink>
                <MobileNavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </MobileNavLink>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ to, children }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Link
      to={to}
      className="dark:text-gray-300 dark:hover:text-indigo-400 transition-colors font-medium"
    >
      {children}
    </Link>
  </motion.div>
);

// Mobile-specific NavLink
const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800 transition-colors font-medium"
  >
    {children}
  </Link>
);

export default Navbar;