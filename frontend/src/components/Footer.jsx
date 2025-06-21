import { FaGithub, FaTwitter, FaHeart, FaRegCopyright } from 'react-icons/fa';
import { SiTailwindcss, SiReact, SiVite } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // All links organized in a clean structure
  const footerLinks = {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Changelog', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Community', href: '#' }
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' }
    ]
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-indigo-600 dark:text-indigo-400 text-2xl font-mono font-bold">
                &lt;CodeSnip/&gt;
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              The developer's toolbox for organizing and reusing code snippets efficiently.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <SocialIcon 
                icon={<FaGithub className="w-5 h-5" />} 
                href="https://github.com/yourusername" 
              />
              <SocialIcon 
                icon={<FaTwitter className="w-5 h-5" />} 
                href="https://twitter.com/yourhandle" 
              />
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          <FooterSection title="Product" links={footerLinks.product} />
          <FooterSection title="Resources" links={footerLinks.resources} />
          <FooterSection title="Company" links={footerLinks.company} />
        </div>

        {/* Tech Stack */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
          <span className="flex items-center">
            <SiReact className="mr-1 text-blue-500" /> React
          </span>
          <span className="flex items-center">
            <SiTailwindcss className="mr-1 text-cyan-500" /> Tailwind CSS
          </span>
          <span className="flex items-center">
            <SiVite className="mr-1 text-yellow-500" /> Vite
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-center text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex items-center justify-center mb-2 sm:mb-0">
            <FaRegCopyright className="mr-1" />
            <span>{currentYear} CodeSnip. All rights reserved.</span>
          </div>
          <div className="flex items-center">
            <span className="hidden sm:inline mr-2">Made with</span>
            <FaHeart className="text-red-500 mx-1" />
            <span>by Zee & contributors</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Footer Section Component
const FooterSection = ({ title, links }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wider">
      {title}
    </h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <a 
            href={link.href} 
            className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// Social Icon Component
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    aria-label={`Visit our ${href.includes('twitter') ? 'Twitter' : 'GitHub'}`}
  >
    {icon}
  </a>
);

export default Footer;