import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, X, Heart, Clock, Linkedin, Instagram } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { TieRequest } from '../types';

// Mock tie requests
const mockTieRequests: TieRequest[] = [
  {
    id: 'tie-1',
    userId: 'user-1',
    userName: 'Sarah Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    category: 'friends',
    query: 'Looking for a sophomore to go to the gym with',
    categories: ['fitness'],
    refiners: ['Lifting', 'Accountability'],
    cadence: '3xweek',
    timeOfDay: 'morning',
    location: 'campus',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: 'tie-2',
    userId: 'user-2',
    userName: 'Marcus Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    category: 'collaborators',
    query: 'Looking for a PM for weekend hackathon project',
    categories: ['entrepreneurship'],
    refiners: ['Hackathon', 'PM role'],
    cadence: 'once',
    timeOfDay: 'afternoon',
    location: 'remote',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: 'tie-3',
    userId: 'user-3',
    userName: 'Emily Rodriguez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    category: 'dates',
    query: 'Coffee date - chill vibes, same major preferred',
    categories: ['chill', 'same-major'],
    cadence: 'once',
    timeOfDay: 'afternoon',
    location: 'campus',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000),
    status: 'pending',
  },
];

export default function SuggestedTies() {
  const [activeTab, setActiveTab] = useState<'unread' | 'read'>('unread');
  const [unreadRequests, setUnreadRequests] = useState<TieRequest[]>(mockTieRequests);
  const [readRequests, setReadRequests] = useState<TieRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<TieRequest | null>(null);

  const getTimeRemaining = (expiresAt: Date) => {
    const hours = Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60));
    return `${hours}h left`;
  };

  const handleNotInterested = (request: TieRequest) => {
    setUnreadRequests(prev => prev.filter(r => r.id !== request.id));
    setReadRequests(prev => [...prev, request]);
    setSelectedRequest(null);
  };

  const handleGetTied = () => {
    alert('Get Tied! 🎉\n\n24-hour grace period started. Waiting for their confirmation...');
    setSelectedRequest(null);
  };

  const moveToUnread = (request: TieRequest) => {
    setReadRequests(prev => prev.filter(r => r.id !== request.id));
    setUnreadRequests(prev => [...prev, request]);
  };

  const requests = activeTab === 'unread' ? unreadRequests : readRequests;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Suggested Ties</h1>
          <p className="text-sm text-gray-600 mt-1">Connections waiting for you</p>
        </div>

        {/* Tabs */}
        <div className="max-w-md mx-auto px-4 flex space-x-1 pb-2">
          <button
            onClick={() => setActiveTab('unread')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'unread'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Unread ({unreadRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('read')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'read'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Read ({readRequests.length})
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-3">
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No {activeTab} requests</p>
          </div>
        ) : (
          requests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Request Header */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={request.userAvatar}
                      alt={request.userName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.userName}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{getTimeRemaining(request.expiresAt)}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.category === 'friends' ? 'bg-blue-100 text-blue-700' :
                    request.category === 'dates' ? 'bg-pink-100 text-pink-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {request.category}
                  </span>
                </div>

                {/* Request Text */}
                <p className="text-gray-800 font-medium mb-3">"{request.query}"</p>

                {/* Details */}
                {request.refiners && request.refiners.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {request.refiners.map((ref, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        {ref}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View Profile</span>
                  </button>
                  {activeTab === 'unread' ? (
                    <>
                      <button
                        onClick={() => handleNotInterested(request)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleGetTied()}
                        className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90 rounded-xl transition-opacity"
                      >
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => moveToUnread(request)}
                      className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors text-sm font-medium"
                    >
                      Get Tied!
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Profile Modal */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile & Compatibility</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                <img
                  src={selectedRequest.userAvatar}
                  alt={selectedRequest.userName}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{selectedRequest.userName}</h3>
              </div>

              {/* Compatibility Score */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    87%
                  </div>
                  <p className="text-gray-600 mt-2">Compatibility Score</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">✅ Shared interest in fitness</p>
                  <p className="text-gray-700">✅ Compatible personalities</p>
                  <p className="text-gray-700">✅ Similar goals and values</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 mb-6">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                  <span className="font-medium">Instagram</span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    handleNotInterested(selectedRequest);
                  }}
                  className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-colors"
                >
                  Not Interested
                </button>
                <button
                  onClick={() => {
                    handleGetTied();
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Tied!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}
