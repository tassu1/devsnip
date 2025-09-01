import { useState } from 'react';
import { FiCode, FiUsers, FiBook, FiZap, FiSearch, FiShare2, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

const UseCases = () => {
  const workflows = [
    {
      id: 'interview',
      title: "Interview Prep",
      icon: <FiBook />,
      steps: [
        "Save DSA patterns with difficulty tags",
        "Organize by categories (Arrays, Trees, etc.)",
        "Quick revision mode before interviews"
      ],
      stat: "3x faster preparation",
      visualization: [
        { label: "Patterns Saved", value: 87 },
        { label: "Categories", value: 12 },
        { label: "Revision Speed", value: "3x" }
      ]
    },
    {
      id: 'team',
      title: "Team Knowledge",
      icon: <FiUsers />,
      steps: [
        "Create shared snippet collections",
        "Add usage examples & best practices",
        "Reduce repetitive questions"
      ],
      stat: "Saves 5+ hours/week",
      visualization: [
        { label: "Team Members", value: 8 },
        { label: "Shared Snippets", value: 142 },
        { label: "Time Saved", value: "5h/week" }
      ]
    },
    {
      id: 'learning',
      title: "Learning New Tech",
      icon: <FiZap />,
      steps: [
        "Archive code examples from docs",
        "Annotate with personal notes",
        "Build searchable reference library"
      ],
      stat: "83% better retention",
      visualization: [
        { label: "Tech Stack", value: "6+" },
        { label: "Annotated", value: "94%" },
        { label: "Retention", value: "83%" }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Optimize Your Developer Workflow
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            How top engineers use DevSnip to work smarter
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Workflow Selector */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar">
          <div className="flex space-x-2 mx-auto">
            {workflows.map((workflow, index) => (
              <button
                key={workflow.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === index
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {workflow.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Workflow */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:p-10 md:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                  {workflows[activeTab].icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {workflows[activeTab].title}
                </h2>
              </div>
              
              <ul className="space-y-3 mb-8">
                {workflows[activeTab].steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mt-0.5 text-xs">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ul>

              <div className="text-sm px-4 py-2 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-300 rounded-lg inline-block">
                {workflows[activeTab].stat}
              </div>
            </div>
            
            {/* Improved Visualization Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 md:p-10 md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-600">
              <div className="h-full flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {workflows[activeTab].visualization.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center h-32">
                    <FiCode className="text-4xl text-indigo-500 dark:text-indigo-400 opacity-80" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Live preview of</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {workflows[activeTab].title} workflow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Core Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Everything you need to organize and reuse code effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiSearch size={20} />,
                title: "Smart Search",
                description: "Find snippets instantly with natural language queries"
              },
              {
                icon: <FiShare2 size={20} />,
                title: "Collaboration",
                description: "Share collections with team members"
              },
              {
                icon: <FiCode size={20} />,
                title: "Multi-Language",
                description: "Support for all major programming languages"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-indigo-600 rounded-xl p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-white mb-3">
              Ready to streamline your workflow?
            </h2>
            <p className="text-indigo-100 mb-6 max-w-lg mx-auto">
              Join developers who save hours every week with organized code snippets
            </p>
            <Link
                          to="/login"
                          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-colors shadow-md hover:shadow-indigo-500/20"
                        >
                          Get Started
                        </Link>
          </div>
        </div>
      </div>
      <Footer/>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default UseCases;