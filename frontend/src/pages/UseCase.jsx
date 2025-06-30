import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiCode, FiShare2, FiSearch, FiMoon } from 'react-icons/fi';

const UseCases = () => {
  const useCases = [
    {
      icon: <FiCode className="text-indigo-500 text-2xl" />,
      title: '💻 Save Interview Snippets',
      desc: 'Store code you use in DSA, system design, or interview prep. Reuse them when revising or mentoring.',
      color: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    {
      icon: <FiCode className="text-blue-500 text-2xl" />,
      title: '⚙️ Organize Reusable Components',
      desc: 'Use it like your own dev wiki for React hooks, custom utilities, or boilerplates.',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <FiCode className="text-green-500 text-2xl" />,
      title: '🧠 Learn by Snippet Practice',
      desc: 'Paste code you\'re learning (e.g. debounce functions), and revisit them for spaced repetition.',
      color: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: <FiCode className="text-purple-500 text-2xl" />,
      title: '🤝 Help Junior Devs',
      desc: 'Create shareable, clean snippets for teammates or beginners you mentor.',
      color: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const roadmap = [
    { 
      icon: <FiGithub className="text-pink-500" />,
      tag: 'AI Suggestion', 
      text: 'AI-powered snippet suggestions based on your tags',
      eta: 'Q3 2024'
    },
    { 
      icon: <FiSearch className="text-amber-500" />,
      tag: 'Search 🔍', 
      text: 'Fuzzy search improvements with natural language',
      eta: 'Q2 2024'
    },
    { 
      icon: <FiShare2 className="text-teal-500" />,
      tag: 'Public Sharing', 
      text: 'Option to share snippets with a public link',
      eta: 'Q3 2024'
    },
    { 
      icon: <FiMoon className="text-violet-500" />,
      tag: 'Dark Mode 2.0', 
      text: 'More themes and custom UI toggles',
      eta: 'Q4 2024'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How Devs Use <span className="text-indigo-600">CodeSnip</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-world use cases and our exciting roadmap ahead
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            Why Developers Love CodeSnip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${useCase.color} p-6 rounded-xl shadow-sm transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-xs">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{useCase.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{useCase.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Roadmap Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">
            🚀 The Road Ahead
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmap.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    {item.icon}
                  </div>
                  <span className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 ring-1 ring-inset ring-indigo-700/10">
                    {item.tag}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">{item.eta}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Organize Your Code Snippets?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <Link to="/register" className="flex items-center">
                Get Started <FiArrowRight className="ml-1" />
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <a 
                href="https://github.com/yourusername/codesnip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <FiGithub className="mr-1" /> View on GitHub
              </a>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UseCases;