import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search as SearchIcon, Send, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HobbyCategory, VocationalGoal } from '../types';
import { mockUsers } from '../data/mockUsers';
import { calculateCompatibility } from '../utils/compatibilityEngine';

const suggestions = [
  'sophomore gym buddy',
  'study partner for CS',
  'tennis doubles partner',
  'startup co-founder',
  'cooking buddy',
];

export default function Search() {
  const navigate = useNavigate();
  const { currentUser, addSearchRequest, addMatch } = useApp();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [matching, setMatching] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    // Mock category extraction from query
    const categories: (HobbyCategory | VocationalGoal)[] = [];
    if (query.toLowerCase().includes('gym') || query.toLowerCase().includes('fitness')) {
      categories.push('fitness');
    }
    if (query.toLowerCase().includes('study') || query.toLowerCase().includes('academic')) {
      categories.push('academics');
    }
    if (query.toLowerCase().includes('startup') || query.toLowerCase().includes('entrepreneur')) {
      categories.push('entrepreneurship');
    }
    if (query.toLowerCase().includes('tennis') || query.toLowerCase().includes('sport')) {
      categories.push('sports');
    }
    if (query.toLowerCase().includes('cook')) {
      categories.push('cooking');
    }

    addSearchRequest(query, categories.length > 0 ? categories : ['fitness']);
    setSubmitted(true);

    // Simulate finding matches after 2 seconds
    setTimeout(() => {
      setMatching(true);

      // Find 2-3 relevant mock users
      const matches = mockUsers
        .filter(u => {
          const hasSharedInterests = u.hobbies.some(h => currentUser.hobbies.includes(h)) ||
                                     u.goals.some(g => currentUser.goals.includes(g));
          return hasSharedInterests;
        })
        .slice(0, 3);

      // Add matches with compatibility reports
      matches.forEach((user, index) => {
        setTimeout(() => {
          const report = calculateCompatibility(currentUser, user);
          addMatch({
            id: `match-${Date.now()}-${index}`,
            user,
            compatibilityReport: report,
            timestamp: new Date(),
          });
        }, (index + 1) * 500);
      });

      // Navigate to matches after all are added
      setTimeout(() => {
        navigate('/matches');
      }, (matches.length + 1) * 500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Find Your Match</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  What are you looking for?
                </h2>
                <p className="text-gray-600">
                  Describe who you'd like to connect with
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="e.g., sophomore gym buddy"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-lg"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    disabled={!query.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular searches</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuery(suggestion)}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
                <ol className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs mr-3 mt-0.5">1</span>
                    <span>Enter what you're looking for</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs mr-3 mt-0.5">2</span>
                    <span>Users with matching interests receive your request</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs mr-3 mt-0.5">3</span>
                    <span>View compatibility reports and start chatting!</span>
                  </li>
                </ol>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center mb-6"
              >
                <Clock className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {matching ? 'Finding your matches...' : 'Request sent!'}
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                {matching
                  ? 'We found some great matches for you'
                  : 'People with matching interests are being notified. Check back soon!'}
              </p>

              {matching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex space-x-2"
                >
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}