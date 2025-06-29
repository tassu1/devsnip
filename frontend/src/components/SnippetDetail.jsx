import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { UserContext } from '../context/UserContext';

const SnippetDetail = ({ currentUserId }) => {
   const { user } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch snippet data
  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const { data } = await api.get(`/snippets/${id}`);
        setSnippet(data);
      } catch (err) {
        toast.error('Failed to load snippet');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  // Handle save after editing
  const handleSave = async (updatedSnippet) => {
    try {
      const { data } = await api.patch(`/snippets/${id}`, updatedSnippet);
      setSnippet(data);
      setIsEditing(false);
      toast.success('Snippet updated!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to update');
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!snippet) return <div className="text-center py-8">Snippet not found</div>;

  const canEdit = currentUserId === snippet.user;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-4 md:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 mb-6"
        >
          ← Back to Dashboard
        </button>

        {isEditing ? (
          <EditForm 
            snippet={snippet} 
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-2xl md:text-3xl font-bold break-words">
                {snippet.title}
              </h1>
              {canEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
                {snippet.language}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Created: {new Date(snippet.createdAt).toLocaleDateString()}
              </span>
              {snippet.lastEditedAt && (
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Edited: {new Date(snippet.lastEditedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {snippet.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="relative">
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm md:text-base">
                {snippet.code}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(snippet.code);
                  toast.success('Code copied!');
                }}
                className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Edit Form Component (Embedded)
const EditForm = ({ snippet, onCancel, onSave }) => {
  const [formData, setFormData] = useState(snippet);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      lastEditedAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Language</label>
        <select
          value={formData.language}
          onChange={(e) => setFormData({...formData, language: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
        >
          {['JavaScript', 'Python', 'HTML', 'CSS', 'TypeScript', 'Other'].map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Code</label>
        <textarea
          value={formData.code}
          onChange={(e) => setFormData({...formData, code: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg font-mono h-64 dark:bg-gray-800"
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SnippetDetail;