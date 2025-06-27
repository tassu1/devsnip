import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const SnippetCard = ({ 
  snippet, 
  onDelete, 
  onShowCode, 
  isLoadingCode,
  currentUserId 
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = () => {
    if (!snippet.code) {
      toast.error('No code available to copy');
      return;
    }
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Code copied to clipboard!');
  };

  const handleToggle = () => {
    if (!isExpanded && !snippet.code) {
      onShowCode(); // Trigger code load when first expanded
    }
    setIsExpanded(!isExpanded);
  };

  const canDelete = currentUserId && currentUserId === snippet.user;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col cursor-pointer"
      onClick={handleToggle}
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {snippet.title}
          </h3>
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-xs">
            {snippet.language}
          </span>
        </div>
        
        {isExpanded && (
          <div className="relative mb-3">
            {isLoadingCode ? (
              <div className="bg-gray-800 text-gray-100 p-3 rounded-lg text-center">
                Loading code...
              </div>
            ) : snippet.code ? (
              <>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                  {snippet.code}
                </pre>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard();
                  }}
                  className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </>
            ) : (
              <div className="bg-gray-800 text-gray-100 p-3 rounded-lg text-center">
                Code not available
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="px-5 pb-4" onClick={e => e.stopPropagation()}>
        {snippet.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {snippet.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {new Date(snippet.createdAt).toLocaleDateString()}
          </span>
          {canDelete && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(snippet._id);
              }}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SnippetCard;