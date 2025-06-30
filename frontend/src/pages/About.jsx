import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiCode } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Built for Developers Who Hate Losing Great Code
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            CodeSnip is your personal snippet vault — organized, searchable, beautiful.
          </p>
          <div className="mt-10 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <FiCode className="text-white text-8xl" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              As developers, we constantly find ourselves reusing the same code — from API templates to React hooks. 
              But storing them in notes or random files? Messy.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              CodeSnip makes it easy to organize, search, and reuse code in one place. Never lose that perfect solution again.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Meet the Creator */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="md:w-1/3 flex justify-center">
            <motion.div
              whileHover={{ rotate: 2, scale: 1.03 }}
              className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 overflow-hidden shadow-lg"
            >
              {/* Replace with your image */}
              <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                👨‍💻
              </div>
            </motion.div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meet the Creator</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Hi, I'm Tahseen, a CS student and full-stack dev passionate about building real-world tools for real-world developers.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              CodeSnip was born out of my own frustration with losing useful code snippets. After rewriting the same solutions for the fifth time, I knew there had to be a better way.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Our Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              'React', 'Node.js', 'MongoDB', 'Express', 
              'Tailwind CSS', 'DaisyUI', 'Framer Motion', 'JWT Auth'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ready to Organize Your Code?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium text-lg"
            >
              <Link to="/register" className="flex items-center justify-center gap-2">
                Try CodeSnip Now
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium text-lg"
            >
              <a 
                href="https://github.com/tassu1/codesnip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <FiGithub /> View on GitHub
              </a>
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;