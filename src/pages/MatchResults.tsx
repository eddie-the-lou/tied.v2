import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { personalityDescriptions } from '../data/personalityTypes';

export default function MatchResults() {
  const navigate = useNavigate();
  const { matches, addConversation, currentUser } = useApp();

  const handleMessage = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (match) {
      addConversation({
        id: `conv-${Date.now()}`,
        matchId: match.id,
        otherUser: match.user,
        messages: [],
      });
      navigate('/messages');
    }
  };

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
            <button
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Your Matches</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No matches yet</h2>
          <p className="text-gray-600 mb-8">Start searching to find your perfect connections!</p>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold shadow-lg"
          >
            Start Searching
          </button>
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl font-bold text-gray-900">Your Matches</h1>
          <span className="ml-auto px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {matches.map((match, index) => {
          const personality = match.user.personalityType
            ? personalityDescriptions[match.user.personalityType]
            : null;

          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* User Info */}
              <div className="p-6 bg-gradient-to-br from-primary-400 to-accent-500">
                <div className="flex items-center mb-4">
                  <img
                    src={match.user.avatar}
                    alt={match.user.name}
                    className="w-20 h-20 rounded-full border-4 border-white mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{match.user.name}</h2>
                    {personality && (
                      <p className="text-white/90">
                        {personality.emoji} {personality.name}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">
                      {match.compatibilityReport.score}%
                    </div>
                    <div className="text-white/90 text-sm">Match</div>
                  </div>
                </div>
              </div>

              {/* Compatibility Report */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {match.compatibilityReport.summary}
                  </p>
                </div>

                {/* Strengths */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Strengths
                  </h3>
                  <div className="space-y-2">
                    {match.compatibilityReport.strengths.map((strength, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0" />
                        <p className="text-gray-700">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Considerations */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    Things to Consider
                  </h3>
                  <div className="space-y-2">
                    {match.compatibilityReport.considerations.map((consideration, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-3 flex-shrink-0" />
                        <p className="text-gray-700">{consideration}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shared Interests */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Shared Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {match.user.hobbies
                      .filter(h => currentUser.hobbies.includes(h))
                      .map((hobby) => (
                        <span
                          key={hobby}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {hobby}
                        </span>
                      ))}
                    {match.user.goals
                      .filter(g => currentUser.goals.includes(g))
                      .map((goal) => (
                        <span
                          key={goal}
                          className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
                        >
                          {goal}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMessage(match.id)}
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Messaging
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}