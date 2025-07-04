import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiCode, FiCpu, FiDatabase, FiShare2, FiLock, FiSearch, FiExternalLink,FiCloud, FiZap , FiStar, FiImage } from 'react-icons/fi';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript } from 'react-icons/si';
import Footer from '../components/Footer';
const About = () => {
  const techStack = [
    { name: 'React', icon: <FaReact className="text-blue-500" />, color: 'text-blue-500' },
    { name: 'JavaScript', icon: <SiJavascript className="text-blue-600" />, color: 'text-blue-600' },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" />, color: 'text-green-500' },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-600" />, color: 'text-green-600' },
    { name: 'Express', icon: <SiExpress className="text-gray-800 dark:text-gray-200" />, color: 'text-gray-800 dark:text-gray-200' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-500" />, color: 'text-cyan-500' },
  ];

  const features = [
    {
      icon: <FiCode className="text-indigo-500" />,
      title: "Code Organization",
      description: "Categorize snippets with tags, descriptions, and syntax highlighting"
    },
    {
      icon: <FiSearch className="text-purple-500" />,
      title: "Instant Search",
      description: "Find any snippet in seconds with powerful search functionality"
    },
    {
      icon: <FiLock className="text-green-500" />,
      title: "Secure Storage",
      description: "Your code stays private unless you choose to share it"
    },
    {
      icon: <FiShare2 className="text-blue-500" />,
      title: "Team Collaboration",
      description: "Share snippets with team members when needed"
    },
    {
      icon: <FiCloud className="text-orange-500" />,
      title: "Cloud Sync",
      description: "Access your code library from any device"
    },
    {
      icon: <FiZap className="text-yellow-500" />,
      title: "Quick Import/Export",
      description: "Easily migrate your existing code collections"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
     
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 opacity-60"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 dark:opacity-5"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.span 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 mb-6 border border-indigo-200 dark:border-indigo-800 text-sm font-medium"
          >
            <FiStar className="mr-2" /> Showcase Project
          </motion.span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            DevSnip: <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Developer Productivity</span> Tool
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A full-stack application solving a real developer pain point - organizing and retrieving code snippets efficiently.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
           
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <a 
                href="https://github.com/yourusername/devsnip" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Source Code
              </a>
              <FiGithub />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Designed to solve real problems developers face daily
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800/30 rounded-2xl my-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6">
              <FiCpu className="text-2xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Developer Productivity Problem</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Studies show developers spend up to 20% of their time searching for or recreating code they've already written.
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span>Knowledge loss between projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span>Inefficient code reuse practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span>No standardized way to document solutions</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-6">
                <FiDatabase className="text-2xl text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technical Solution</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                DevSnip implements a modern full-stack solution with these technical highlights:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>MERN stack with JavaScript</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>JWT authentication with refresh tokens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Advanced search with regex support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Responsive design with dark mode</span>
                </li>
              </ul>
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow border border-gray-200 dark:border-gray-700 text-sm font-medium">
                Technical Highlights
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technology Stack</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Built with modern technologies demonstrating full-stack proficiency
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-5 bg-white dark:bg-gray-800 rounded-lg shadow-xs border border-gray-100 dark:border-gray-700"
            >
              <div className={`text-3xl mb-3 ${tech.color}`}>
                {tech.icon}
              </div>
              <div className="font-medium text-gray-700 dark:text-gray-300 text-sm text-center">{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Development Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800/30 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">
                DEVELOPMENT JOURNEY
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">From Personal Pain Point to Portfolio Project</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">The Inspiration</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      After repeatedly rewriting the same solutions, I recognized a common pain point among developers - the lack of an efficient system to organize and retrieve code snippets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">Technical Challenges</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Implementing secure authentication, efficient search functionality, and a clean UI/UX while ensuring the application remained performant with growing data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-400">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">Key Learnings</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      This project deepened my understanding of full-stack architecture, state management, and the importance of developer experience in tool design.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FiImage className="text-4xl" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">DevSnip Dashboard</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Main interface screenshot</p>
                  </div>
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                    <FiExternalLink />
                  </button>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow border border-gray-200 dark:border-gray-700 text-sm font-medium flex items-center">
                <FiGithub className="mr-2" />
                View Code
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Want to See More of My Work?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            This project demonstrates my full-stack capabilities and problem-solving approach. I'd love to discuss how I can bring this same level of craftsmanship to your team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 5px 15px rgba(79, 70, 229, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              <Link to="https://www.linkedin.com/in/md-tahseen-alam-892317263/" className="flex items-center justify-center gap-2">
                Contact Me
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <a 
                href="https://github.com/tassu1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View GitHub Profile
              </a>
              <FiGithub />
            </motion.button>
          </div>
        </motion.div>
      </section>
      <Footer/>
    </div>
  );
};

export default About;