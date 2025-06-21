const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative flex-grow">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-2 text-gray-500"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;