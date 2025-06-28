
const LanguageFilter = ({ languages, selected, onSelect }) => {
  return (
    <select
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white min-w-[150px]"
    >
      {languages.map(({ value, label, id }) => (
        <option key={id} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default LanguageFilter;