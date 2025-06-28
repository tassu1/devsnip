import { useState, useEffect, useMemo } from 'react';
import { defaultLanguages } from '../utils/languages';

const NewSnippetModal = ({ isOpen, onClose, onSubmit, languages = [] }) => {
  // Normalize all languages to object format for consistent handling
  const allLanguages = useMemo(() => {
    // Convert all languages to object format if they aren't already
    const normalizedLangs = [...defaultLanguages, ...languages].map(lang => 
      typeof lang === 'object' ? lang : { value: lang, label: lang }
    );
    
    // Remove duplicates by value
    const uniqueLangs = [];
    const seenValues = new Set();
    
    for (const lang of normalizedLangs) {
      if (!seenValues.has(lang.value)) {
        seenValues.add(lang.value);
        uniqueLangs.push(lang);
      }
    }
    
    // Sort alphabetically by label
    return uniqueLangs.sort((a, b) => a.label.localeCompare(b.label));
  }, [languages]);

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    language: '',
    tags: ''
  });

  // Set initial language when component mounts or languages change
  useEffect(() => {
    if (allLanguages.length > 0 && !formData.language) {
      setFormData(prev => ({
        ...prev,
        language: allLanguages[0].value
      }));
    }
  }, [allLanguages]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        code: '',
        language: allLanguages[0]?.value || '',
        tags: ''
      });
    }
  }, [isOpen, allLanguages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Code Snippet</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                placeholder="My Awesome Snippet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                {allLanguages.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Code *
              </label>
              <textarea
                name="code"
                value={formData.code}
                onChange={handleChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                placeholder="// Enter your code here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="react, hooks, utility"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Save Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSnippetModal;