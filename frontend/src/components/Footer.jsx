import { FaGithub } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiVite } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          
          {/* Left Side - Branding */}
          <div className="flex items-center space-x-4">
            <span className="font-mono font-medium text-indigo-600 dark:text-indigo-400">
              DevSnip
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              v1.0
            </span>
          </div>

          {/* Middle - Tech Stack */}
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <span className="text-xs hidden sm:inline">Built with:</span>
            <div className="flex space-x-3">
              <SiReact 
                className="h-4 w-4 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400" 
                title="React" 
              />
              <SiTailwindcss 
                className="h-4 w-4 text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400" 
                title="Tailwind CSS" 
              />
              <SiVite 
                className="h-4 w-4 text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400" 
                title="Vite" 
              />
            </div>
          </div>

          {/* Right Side - GitHub */}
          <a
            href="https://github.com/tassu1/devsnip"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          >
            <FaGithub className="mr-1.5 h-4 w-4" />
            <span>Star on GitHub</span>
          </a>
        </div>

        {/* Copyright - Centered on mobile */}
        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
          © {currentYear} DevSnip. The developer's snippet manager.
        </div>
      </div>
    </footer>
  );
};

export default Footer;