import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
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
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <button 
              onClick={handleLogoClick}
              className="text-xl md:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
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
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
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

            {/* Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                  className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium w-full text-left"
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

            <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => {
                  toggleDarkMode();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? (
                  <>
                    <FiSun size={18} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FiMoon size={18} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
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
      className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
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
    className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
  >
    {children}
  </Link>
);

export default Navbar;