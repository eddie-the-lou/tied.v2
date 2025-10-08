import { motion } from 'framer-motion';
import { Settings, Linkedin, Instagram, FileText, LogOut, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { personalityDescriptions } from '../data/personalityTypes';

export default function Profile() {
  const { currentUser } = useApp();
  const personality = currentUser.personalityType ? personalityDescriptions[currentUser.personalityType] : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Profile Picture */}
      <div className="bg-gradient-to-br from-primary-400 via-accent-400 to-primary-500 text-white pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Profile</h1>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <img
                src={currentUser.profilePicture || currentUser.avatar}
                alt={currentUser.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
              />
            </motion.div>
            <h2 className="text-2xl font-bold mb-1">{currentUser.name}</h2>
            {currentUser.username && (
              <p className="text-white/80 mb-2">@{currentUser.username}</p>
            )}
            {personality && (
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-2xl mr-2">{personality.emoji}</span>
                <span className="font-semibold">{personality.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 -mt-12">
        {/* Account Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Email/Phone</label>
              <p className="text-gray-900">{currentUser.email || 'Not set'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Username</label>
              <p className="text-gray-900">@{currentUser.username || 'Not set'}</p>
            </div>
          </div>
        </motion.div>

        {/* Interests Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">My Interests</h3>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">Hobbies</label>
            <div className="flex flex-wrap gap-2">
              {currentUser.hobbies.map((hobby) => (
                <span key={hobby} className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium">
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-600 mb-2 block">Goals</label>
            <div className="flex flex-wrap gap-2">
              {currentUser.goals.map((goal) => (
                <span key={goal} className="px-3 py-1 bg-accent-100 text-accent-700 text-sm rounded-full font-medium">
                  {goal}
                </span>
              ))}
            </div>
          </div>

          {currentUser.datingPreferences && currentUser.datingPreferences.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Dating Preferences</label>
              <div className="flex flex-wrap gap-2">
                {currentUser.datingPreferences.map((pref) => (
                  <span key={pref} className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full font-medium">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">LinkedIn</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <Instagram className="w-5 h-5 text-pink-600" />
                <span className="font-medium text-gray-900">Instagram</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Personality Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Personality Reports</h3>
          <div className="space-y-3">
            {personality && (
              <div className="p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{personality.emoji}</span>
                    <div>
                      <h4 className="font-bold text-gray-900">{personality.name}</h4>
                      <p className="text-sm text-gray-600">Your primary type</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{personality.description}</p>
              </div>
            )}

            <button className="w-full flex items-center justify-between p-4 border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-600">Take another assessment</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Sign Out */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full flex items-center justify-center space-x-2 p-4 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors mb-4"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Sign Out</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
