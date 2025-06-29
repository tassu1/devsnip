import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const LANGUAGE_OPTIONS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP',
  'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust', 'HTML', 'CSS', 'SCSS',
  'Less', 'SQL', 'Bash', 'PowerShell', 'Dart', 'Scala', 'R', 'Perl',
  'Lua', 'Dockerfile', 'YAML', 'JSON', 'Markdown', 'GraphQL', 'Assembly',
  'MATLAB', 'Racket', 'Clojure', 'Elixir', 'Erlang', 'Haskell', 'OCaml',
  'F#', 'Fortran', 'Groovy', 'Julia', 'Solidity', 'VHDL', 'Verilog', 'Other'
];

const SnippetCard = ({ 
  snippet: initialSnippet, 
  onDelete, 
  onUpdate,
  currentUserId 
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snippet, setSnippet] = useState(initialSnippet);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: snippet.title,
    code: snippet.code || '',
    language: snippet.language,
    tags: snippet.tags || []
  });
  const [newTag, setNewTag] = useState('');

  const fetchCode = async () => {
    if (snippet.code) return;
    
    setIsLoading(true);
    try {
      const { data } = await api.get(`/snippets/${snippet._id}/code`);
      setSnippet(prev => ({ ...prev, code: data.data.code }));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load code');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (e) => {
    e.stopPropagation();
    if (!snippet.code) {
      toast.error('No code available to copy');
      return;
    }
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Code copied to clipboard!');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editData.tags.includes(newTag.trim())) {
      setEditData({
        ...editData,
        tags: [...editData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditData({
      ...editData,
      tags: editData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await api.put(`/snippets/${snippet._id}`, {
        ...editData,
        lastEditedAt: new Date().toISOString()
      });
      
      setSnippet(data);
      onUpdate(data);
      setIsEditing(false);
      toast.success('Snippet updated!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to update snippet');
    } finally {
      setIsLoading(false);
    }
  };

  const canEdit = currentUserId && currentUserId === snippet.user;

  // Load code when component mounts if not already loaded
  useState(() => {
    if (!snippet.code) {
      fetchCode();
    }
  }, []);

  return (
    <motion.div 
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all shadow-sm hover:shadow-md w-full min-h-[220px]"
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="p-6 space-y-5 bg-gray-50 dark:bg-gray-800 h-full flex flex-col">
          <div className="space-y-5 flex-grow">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-lg font-semibold focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-colors"
                placeholder="Snippet title"
                required
              />
            </div>
            
            {/* Language Field */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                id="language"
                value={editData.language}
                onChange={(e) => setEditData({...editData, language: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-colors"
              >
                {LANGUAGE_OPTIONS.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            {/* Tags Field */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  id="tags"
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-colors"
                  placeholder="Add tag..."
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors text-sm"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-xs font-medium">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1.5 text-indigo-600 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            {/* Code Field */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code
              </label>
              <textarea
                id="code"
                value={editData.code}
                onChange={(e) => setEditData({...editData, code: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 font-mono text-sm h-48 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent transition-colors"
                placeholder="Paste your code here..."
                required
              />
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors font-medium shadow-sm flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="p-6 pb-4 cursor-pointer group" onClick={() => navigate(`/snippets/${snippet._id}`)}>
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {snippet.title}
              </h3>
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0">
                {snippet.language}
              </span>
            </div>
          </div>

          {/* Always visible code section */}
          <div className="relative px-6 pb-5">
            {isLoading ? (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center text-gray-500 dark:text-gray-400">
                Loading code...
              </div>
            ) : snippet.code ? (
              <div className="relative">
                <pre className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-xl font-mono text-sm overflow-x-auto whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
                  {snippet.code}
                </pre>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    title="Copy code"
                  >
                    {copied ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    )}
                  </button>
                  {canEdit && (
                    <button
                      onClick={() => {
                        setEditData({
                          title: snippet.title,
                          code: snippet.code,
                          language: snippet.language,
                          tags: snippet.tags
                        });
                        setIsEditing(true);
                      }}
                      className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      title="Edit snippet"
                    >
                      <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center text-gray-500 dark:text-gray-400">
                No code available
              </div>
            )}
          </div>

          <div className="px-6 pb-5 pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            {snippet.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {snippet.tags.map(tag => (
                  <span key={tag} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {dayjs(snippet.createdAt).fromNow()}
                {snippet.lastEditedAt && (
                  <span className="ml-2 italic">(edited)</span>
                )}
              </span>
              {canEdit && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(snippet._id);
                  }}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center transition-colors font-medium"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SnippetCard;