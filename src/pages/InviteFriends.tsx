import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus, Check } from 'lucide-react';
import { mockUsers } from '../data/mockUsers';
import { useApp } from '../context/AppContext';
import { calculateCompatibility } from '../utils/compatibilityEngine';

export default function InviteFriends() {
  const navigate = useNavigate();
  const { currentUser, addMatch } = useApp();
  const [invited, setInvited] = useState<Set<string>>(new Set());
  const [showingReport, setShowingReport] = useState<string | null>(null);

  const handleInvite = (friendId: string) => {
    setInvited(prev => new Set(prev).add(friendId));

    // Simulate friend accepting and generating report after 1 second
    setTimeout(() => {
      const friend = mockUsers.find(u => u.id === friendId)!;
      const report = calculateCompatibility(currentUser, friend);

      addMatch({
        id: `match-${Date.now()}`,
        user: friend,
        compatibilityReport: report,
        timestamp: new Date(),
      });

      setShowingReport(friendId);
    }, 1000);
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
          <h1 className="text-xl font-bold text-gray-900">Invite Friends</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Invite your friends to see your compatibility report. They'll receive a notification to join!
          </p>
        </motion.div>

        <div className="space-y-3">
          {mockUsers.slice(0, 5).map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                  <p className="text-sm text-gray-600">{friend.bio}</p>
                </div>
              </div>

              {showingReport === friend.id ? (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => navigate('/matches')}
                  className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold flex items-center"
                >
                  <Check className="w-5 h-5 mr-1" />
                  View Report
                </motion.button>
              ) : invited.has(friend.id) ? (
                <div className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-semibold flex items-center">
                  Pending...
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInvite(friend.id)}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold flex items-center"
                >
                  <UserPlus className="w-5 h-5 mr-1" />
                  Invite
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-white rounded-2xl shadow-md border-2 border-dashed border-gray-300"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Invite by Email or Link</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share your unique invite link with friends
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="https://connect.app/invite/abc123"
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-600"
            />
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold">
              Copy
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}