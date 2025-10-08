import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, MessageCircle, Bell, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { personalityDescriptions } from '../data/personalityTypes';

export default function Home() {
  const navigate = useNavigate();
  const { currentUser, notifications } = useApp();

  const personality = currentUser.personalityType
    ? personalityDescriptions[currentUser.personalityType]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold text-lg">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-900">{currentUser.name}</h2>
              {personality && (
                <p className="text-sm text-gray-600">
                  {personality.emoji} {personality.name}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate('/matches')}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.name}! 👋
          </h1>
          <p className="text-gray-600">
            Find your perfect match and connect with ambitious people
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/search')}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center text-left hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Find Your Match</h3>
              <p className="text-gray-600">Search for gym buddies, study partners, and more</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/invite')}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center text-left hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Invite Friends</h3>
              <p className="text-gray-600">See your compatibility with friends</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/messages')}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center text-left hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Messages</h3>
              <p className="text-gray-600">Chat with your matches</p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/future')}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 flex items-center text-left hover:shadow-xl transition-all border-2 border-yellow-400"
          >
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mr-4">
              <Sparkles className="w-8 h-8 text-gray-900" />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="text-xl font-bold text-white">AI-Powered Matching</h3>
                <span className="ml-2 px-2 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">
                  COMING SOON
                </span>
              </div>
              <p className="text-gray-300">Instant connections with AI-powered compatibility</p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}