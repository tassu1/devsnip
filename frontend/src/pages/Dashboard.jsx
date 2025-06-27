import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SnippetCard from '../components/SnippetCard';
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
  const [loadingCodes, setLoadingCodes] = useState({});

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Fetch snippet metadata (without code)
  const fetchSnippets = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/snippets', {
        params: {
          limit: 20,
          fields: 'title,language,tags,createdAt,_id,user'
        }
      });
      setSnippets(data.data || []);
    } catch (err) {
      console.error("Failed to load snippets:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      toast.error('Failed to load snippets');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch code content for a specific snippet
  const fetchSnippetCode = async (snippetId) => {
    try {
      setLoadingCodes(prev => ({ ...prev, [snippetId]: true }));
      const { data } = await api.get(`/snippets/${snippetId}/code`);
      
      setSnippets(prev => prev.map(snippet => 
        snippet._id === snippetId ? { ...snippet, code: data.data.code } : snippet
      ));
    } catch (err) {
      console.error("Failed to load code:", err);
      toast.error('Failed to load code content');
    } finally {
      setLoadingCodes(prev => ({ ...prev, [snippetId]: false }));
    }
  };

  // Initial data load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const initialize = async () => {
      try {
        await fetchUser();
        await fetchSnippets();
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };

    initialize();
  }, [navigate, fetchUser]);

  // Filter snippets
  useEffect(() => {
    const results = snippets.filter(snippet => {
      const matchesSearch = searchQuery ? 
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (snippet.tags && snippet.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())))
        : true;
      
      const matchesLanguage = selectedLanguage !== 'All' ? 
        snippet.language === selectedLanguage 
        : true;
      
      return matchesSearch && matchesLanguage;
    });

    setFilteredSnippets(results);
  }, [searchQuery, selectedLanguage, snippets]);

  // Create snippet handler
  const handleCreate = async (newSnippet) => {
    try {
      if (!user?.id) {
        throw new Error('User information not available');
      }

      const { data } = await api.post('/snippets', {
        ...newSnippet,
        user: user.id
      });
      
      setSnippets(prev => [data, ...prev]);
      setShowModal(false);
      toast.success('Snippet created successfully!');
    } catch (err) {
      console.error('Create error:', err);
      toast.error(err.message || 'Failed to create snippet');
    }
  };

  // Delete snippet handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;
    
    try {
      await api.delete(`/snippets/${id}`);
      setSnippets(prev => prev.filter(snippet => snippet._id !== id));
      toast.success('Snippet deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.msg || 'Failed to delete snippet');
    }
  };

  // Get unique languages
  const snippetLanguages = [...new Set(snippets.map(s => s.language).filter(Boolean))];
  const languages = ['All', ...snippetLanguages].sort();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.name ? `${user.name}'s Snippets` : 'My Snippets'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isLoading ? 'Loading...' : `${filteredSnippets.length} snippets`}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            disabled={isLoading}
          >
            ＋ New Snippet
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <LanguageFilter 
            languages={languages} 
            selected={selectedLanguage}
            onSelect={setSelectedLanguage}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 h-64 animate-pulse" />
            ))}
          </div>
        ) : filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map(snippet => (
              <SnippetCard 
                key={snippet._id}
                snippet={snippet}
                onDelete={handleDelete}
                onShowCode={() => fetchSnippetCode(snippet._id)}
                isLoadingCode={loadingCodes[snippet._id]}
                currentUserId={user?.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery || selectedLanguage !== 'All' 
                ? "No snippets found" 
                : "No snippets yet"}
            </p>
          </div>
        )}
      </main>

      <Footer />

      <NewSnippetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        languages={languages}
      />
    </div>
  );
};

export default Dashboard;