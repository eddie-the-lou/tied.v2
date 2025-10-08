import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { personalityDescriptions } from '../data/personalityTypes';

export default function PersonalityResults() {
  const navigate = useNavigate();
  const { currentUser } = useApp();

  if (!currentUser.personalityType) {
    navigate('/quiz');
    return null;
  }

  const personality = personalityDescriptions[currentUser.personalityType];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-accent-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl mb-4"
          >
            {personality.emoji}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            You're a {personality.name}!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`inline-block px-6 py-2 ${personality.color} text-white rounded-full font-semibold`}
          >
            {currentUser.personalityType.toUpperCase()}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About You</h2>
            <p className="text-gray-700 leading-relaxed">{personality.description}</p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary-600" />
              Best Matches
            </h2>
            <div className="flex flex-wrap gap-2">
              {personality.bestMatch.map((type) => (
                <span
                  key={type}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-800 shadow-sm"
                >
                  {personalityDescriptions[type].emoji} {personalityDescriptions[type].name}
                </span>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/interests')}
            className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}