import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Footer from '../components/Footer';

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches && 
            localStorage.getItem('darkMode') !== 'false');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    
      
      <main className="container mx-auto px-4 sm:px-6 py-12 md:py-16 lg:py-20 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white"
          >
            <span className="relative inline-block">
              <span className="relative z-10 text-indigo-600 dark:text-indigo-400">
                &lt;/DevSnip&gt;
              </span>
              <span className="absolute inset-0 bg-indigo-400/20 dark:bg-indigo-600/20 blur-lg rounded-full opacity-70 -z-1" />
            </span>{' '}
            Save Your Code Snippets
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
          >
            Organize, search, and reuse your code snippets effortlessly.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
          >
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-colors shadow-md hover:shadow-indigo-500/20"
            >
              🔐 Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 px-6 py-3 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-colors"
            >
              ✨ Register
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16 md:mb-24 lg:mb-28"
        >
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                <FeatureItem 
                  icon="💎" 
                  title="Syntax Highlighting" 
                  description="Supports 30+ programming languages"
                />
                <FeatureItem 
                  icon="🏷️" 
                  title="Smart Tagging" 
                  description="Organize snippets with custom tags"
                />
                <FeatureItem 
                  icon="🚀" 
                  title="Quick Copy" 
                  description="One-click copy to clipboard"
                />
                <FeatureItem 
                  icon="🔍" 
                  title="Instant Search" 
                  description="Find snippets in milliseconds"
                />
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="order-1 lg:order-2 mockup-code bg-gray-800 text-gray-100 p-4 sm:p-6 rounded-lg shadow-xl"
            >
              <pre data-prefix="1"><code className="text-gray-400">// Custom React hook</code></pre>
              <pre data-prefix="2"><code className="text-blue-400">import</code> <code className="text-gray-300">{`{ useState, useEffect }`}</code> <code className="text-blue-400">from</code> <code className="text-emerald-400">'react'</code><code className="text-gray-300">;</code></pre>
              <pre data-prefix="3"><code className="text-gray-300"></code></pre>
              <pre data-prefix="4"><code className="text-blue-400">export const</code> <code className="text-yellow-300">useDebounce</code> <code className="text-gray-300">= (value, delay) ={'>'} {`{`}</code></pre>
              <pre data-prefix="5"><code className="text-blue-400">  const</code> <code className="text-gray-300">[debouncedValue, setDebouncedValue] =</code> <code className="text-yellow-300">useState</code><code className="text-gray-300">(value);</code></pre>
              <pre data-prefix="6"><code className="text-gray-300"></code></pre>
              <pre data-prefix="7"><code className="text-yellow-300">  useEffect</code><code className="text-gray-300">(() ={'>'} {`{`}</code></pre>
              <pre data-prefix="8"><code className="text-blue-400">    const</code> <code className="text-gray-300">handler =</code> <code className="text-yellow-300">setTimeout</code><code className="text-gray-300">(() ={'>'} {`{`}</code></pre>
              <pre data-prefix="9"><code className="text-yellow-300">      setDebouncedValue</code><code className="text-gray-300">(value);</code></pre>
              <pre data-prefix="10"><code className="text-gray-300">    {`}`}, delay);</code></pre>
              <pre data-prefix="11"><code className="text-gray-300"></code></pre>
              <pre data-prefix="12"><code className="text-blue-400">    return</code> <code className="text-gray-300">() ={'>'} {`{`}</code></pre>
              <pre data-prefix="13"><code className="text-yellow-300">      clearTimeout</code><code className="text-gray-300">(handler);</code></pre>
              <pre data-prefix="14"><code className="text-gray-300">    {`}`};</code></pre>
              <pre data-prefix="15"><code className="text-gray-300">  {`}`}, [value, delay]);</code></pre>
              <pre data-prefix="16"><code className="text-gray-300"></code></pre>
              <pre data-prefix="17"><code className="text-blue-400">  return</code> <code className="text-gray-300">debouncedValue;</code></pre>
              <pre data-prefix="18"><code className="text-gray-300">{`}`}</code></pre>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="flex items-start gap-4 p-4 sm:p-5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
  >
    <span className="text-2xl sm:text-3xl flex-shrink-0">{icon}</span>
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        {description}
      </p>
    </div>
  </motion.div>
);

export default Home