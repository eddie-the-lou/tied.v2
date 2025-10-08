import { motion } from 'framer-motion';
import { UserPlus, Users as UsersIcon, MessageCircle, Clock } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

// Mock responses
const mockResponses = [
  {
    id: '1',
    userName: 'Alex Kim',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    originalRequest: 'Looking for a gym partner 3×/week mornings on campus',
    responseTime: '2h ago',
    compatibilityScore: 92,
    status: 'pending' as const
  },
  {
    id: '2',
    userName: 'Jordan Lee',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    originalRequest: 'Looking for a weekend hackathon teammate',
    responseTime: '5h ago',
    compatibilityScore: 88,
    status: 'accepted' as const
  }
];

export default function MyTies() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Ties</h1>
          <p className="text-sm text-gray-600 mt-1">Responses to your tie requests</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/invite')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:border-primary-400 transition-colors"
          >
            <UserPlus className="w-8 h-8 mx-auto mb-2 text-primary-500" />
            <h3 className="font-semibold text-sm text-gray-900">Invite Friends</h3>
          </button>

          <button
            onClick={() => navigate('/suggested-ties')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:border-accent-400 transition-colors"
          >
            <UsersIcon className="w-8 h-8 mx-auto mb-2 text-accent-500" />
            <h3 className="font-semibold text-sm text-gray-900">Suggested Ties</h3>
          </button>
        </div>

        {/* Responses Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Responses ({mockResponses.length})</h2>

          {mockResponses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No responses yet</p>
              <p className="text-sm text-gray-400 mt-2">Drop a tie to start connecting!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockResponses.map((response) => (
                <motion.div
                  key={response.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-4">
                    {/* User Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={response.userAvatar}
                          alt={response.userName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{response.userName}</h3>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{response.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          {response.compatibilityScore}%
                        </div>
                        <p className="text-xs text-gray-500">match</p>
                      </div>
                    </div>

                    {/* Original Request */}
                    <div className="bg-gray-50 rounded-xl p-3 mb-3">
                      <p className="text-sm text-gray-600 mb-1">Your request:</p>
                      <p className="text-sm font-medium text-gray-800">"{response.originalRequest}"</p>
                    </div>

                    {/* Status & Actions */}
                    {response.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors">
                          Decline
                        </button>
                        <button className="flex-1 py-2 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
                          Accept
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate('/messages')}
                        className="w-full flex items-center justify-center space-x-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Start Chatting</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Active Ties Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Active Ties (1)</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border-2 border-primary-200 p-4"
          >
            <div className="flex items-center space-x-3 mb-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
                alt="Jordan Lee"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Jordan Lee</h3>
                <p className="text-sm text-gray-600">Weekend hackathon teammate</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Active
              </span>
            </div>

            <button
              onClick={() => navigate('/messages')}
              className="w-full flex items-center justify-center space-x-2 py-2 bg-white border-2 border-primary-500 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Continue Chat</span>
            </button>
          </motion.div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
