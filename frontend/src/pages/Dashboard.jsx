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
  const [loadingCodes, setLoadingCodes] = useState({});
  const [editingSnippet, setEditingSnippet] = useState(null);

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Fetch all snippet metadata (without code)
  const fetchSnippets = async () => {
  try {
    setIsLoading(true);
    const response = await api.get('/snippets');
    console.log('Full API Response:', response);
    
    // Properly access the nested data array
    if (response.data?.success && Array.isArray(response.data.data)) {
      setSnippets(response.data.data);
    } else {
      console.error('Unexpected response format:', response.data);
      setSnippets([]);
      toast.error('Received snippets in unexpected format');
    }
  } catch (err) {
    console.error('Fetch error:', err);
    setSnippets([]);
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    toast.error(err.response?.data?.msg || 'Failed to load snippets');
  } finally {
    setIsLoading(false);
  }
};

  // Fetch code for specific snippet when expanded
  const fetchSnippetCode = async (snippetId) => {
    try {
      setLoadingCodes(prev => ({ ...prev, [snippetId]: true }));
      const { data } = await api.get(`/snippets/${snippetId}/code`);
      
      setSnippets(prev => prev.map(snippet => 
        snippet._id === snippetId ? { ...snippet, code: data.code } : snippet
      ));
    } catch (err) {
      console.error('Code load error:', err);
      toast.error('Failed to load code content');
    } finally {
      setLoadingCodes(prev => ({ ...prev, [snippetId]: false }));
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
        await fetchUser();
        await fetchSnippets();
      } catch (err) {
        console.error('Initialization error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login?session_expired=true');
        }
      }
    };

    initialize();
  }, [navigate]);

  // Filter snippets based on search and language
  useEffect(() => {
    const results = snippets.filter(snippet => {
      const matchesSearch = searchQuery ? 
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (snippet.code && snippet.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (snippet.tags && snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
        : true;
      
      const matchesLanguage = selectedLanguage !== 'All' ? 
        snippet.language === selectedLanguage 
        : true;
      
      return matchesSearch && matchesLanguage;
    });

    setFilteredSnippets(results);
  }, [searchQuery, selectedLanguage, snippets]);

  // Create new snippet
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
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      toast.error(err.message || 'Failed to create snippet');
    }
  };


  const handleEdit = async (updatedSnippet) => {
  try {
    const { data } = await api.patch(`/snippets/${updatedSnippet._id}`, updatedSnippet);
    setSnippets(prev => prev.map(s => 
      s._id === data._id ? { ...s, ...data } : s
    ));
    setEditingSnippet(null);
    toast.success('Snippet updated successfully!');
  } catch (err) {
    console.error('Edit error:', err);
    toast.error(err.response?.data?.msg || 'Failed to update snippet');
  }
};

  // Delete snippet
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;
    
    try {
      await api.delete(`/snippets/${id}`);
      setSnippets(prev => prev.filter(snippet => snippet._id !== id));
      toast.success('Snippet deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      toast.error(err.response?.data?.msg || 'Failed to delete snippet');
    }
  };

  // Get unique languages for filter
  const snippetLanguages = [...new Set(snippets.map(s => s.language).filter(Boolean))];
const languages = [
  { value: 'All', label: 'All Languages', id: 'all' },
  ...snippetLanguages.map(lang => ({ 
    value: lang, 
    label: lang, 
    id: `${lang}-${Math.random().toString(36).substr(2, 9)}` 
  }))
].sort((a, b) => a.value.localeCompare(b.value));




  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
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
            onClick={() => user?.id ? setShowModal(true) : toast.error('Please login to create snippets')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            disabled={isLoading}
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
                 onUpdate={(updatedSnippet) => {
   
                setSnippets(prev => prev.map(s => 
                  s._id === updatedSnippet._id ? updatedSnippet : s
                  ));
                  }}
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
        languages={languages}
      />

     
    </div>
  );
};

export default Dashboard;