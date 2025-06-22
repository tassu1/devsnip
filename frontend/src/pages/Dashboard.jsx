import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SnippetCard from '../components/snippetcard';
import SearchBar from '../components/SearchBar';
import LanguageFilter from '../components/LanguageFilter';
import NewSnippetModal from '../components/NewSnippet';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);
  
  // State management
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || 
           (savedMode !== 'false' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Set dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Fetch snippets
  const fetchSnippets = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/snippets');
      setSnippets(data);
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error(err.response?.data?.msg || 'Failed to load snippets');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        await fetchUser(); // Ensure user data is loaded
        await fetchSnippets();
      } catch (err) {
        console.error('Initialization error:', err);
      }
    };
    initialize();
  }, [navigate, fetchUser]);

  // Filter snippets
  useEffect(() => {
    let results = snippets;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(snippet => 
        snippet.title.toLowerCase().includes(query) ||
        snippet.code.toLowerCase().includes(query) ||
        (snippet.tags && snippet.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    if (selectedLanguage !== 'All') {
      results = results.filter(snippet => snippet.language === selectedLanguage);
    }

    setFilteredSnippets(results);
  }, [searchQuery, selectedLanguage, snippets]);

  // Create snippet
  const handleCreate = async (newSnippet) => {
    try {
      if (!user?.id) {
        throw new Error('User information not available');
      }

      const { data } = await api.post('/snippets', {
        ...newSnippet,
        user: user.id
      });
      
      setSnippets([data, ...snippets]);
      setShowModal(false);
      toast.success('Snippet created successfully!');
    } catch (err) {
      console.error('Create error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error(err.message || 'Failed to create snippet');
      }
    }
  };

  // Delete snippet
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;
    
    try {
      await api.delete(`/snippets/${id}`);
      setSnippets(snippets.filter(snippet => snippet._id !== id));
      toast.success('Snippet deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error(err.response?.data?.msg || 'Failed to delete snippet');
      }
    }
  };

  // Get unique languages
  const snippetLanguages = [...new Set(snippets.map(s => s.language).filter(Boolean))];
  const languages = ['All', ...snippetLanguages].sort();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={() => {
          const newMode = !darkMode;
          setDarkMode(newMode);
          localStorage.setItem('darkMode', newMode);
          document.documentElement.classList.toggle('dark', newMode);
        }} 
      />

      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16 max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {user?.name ? `${user.name}'s Code Library` : 'My Snippets'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {isLoading ? 'Loading...' : `${filteredSnippets.length} ${filteredSnippets.length === 1 ? 'snippet' : 'snippets'}`}
            </p>
          </div>

          <button
            onClick={() => {
              if (user?.id) {
                setShowModal(true);
              } else {
                toast.error('Please wait while we verify your session...');
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ＋ New Snippet
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search snippets..."
          />
          
          <LanguageFilter
            languages={languages}
            selected={selectedLanguage}
            onSelect={setSelectedLanguage}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 h-64 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
              </div>
            ))}
          </div>
        ) : filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map(snippet => (
              <SnippetCard 
                key={snippet._id}
                snippet={snippet}
                onDelete={handleDelete}
                currentUserId={user?.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
            <span className="text-5xl">📁</span>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              {searchQuery || selectedLanguage !== 'All' 
                ? "No snippets found" 
                : "No snippets yet"}
            </h3>
            <button
              onClick={() => user?.id ? setShowModal(true) : toast.error('Please login to create snippets')}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Create First Snippet
            </button>
          </div>
        )}
      </main>

      <Footer />

      <NewSnippetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        languages={snippetLanguages}
      />
    </div>
  );
};

export default Dashboard;