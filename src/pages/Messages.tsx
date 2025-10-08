import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Smile } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Messages() {
  const navigate = useNavigate();
  const { conversations, currentUser } = useApp();
  const [selectedConv, setSelectedConv] = useState(conversations[0]?.id || null);
  const [message, setMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<Record<string, Array<{ id: string; text: string; senderId: string; timestamp: Date }>>>({});

  const currentConversation = conversations.find(c => c.id === selectedConv);

  const handleSend = () => {
    if (!message.trim() || !selectedConv) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      text: message.trim(),
      senderId: currentUser.id,
      timestamp: new Date(),
    };

    setLocalMessages(prev => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] || []), newMessage],
    }));

    setMessage('');

    // Simulate response after 1 second
    setTimeout(() => {
      const responses = [
        "That sounds great! When would you be free?",
        "I'm definitely interested! Let me know what works for you.",
        "Perfect! Looking forward to it 🙌",
        "Awesome! Should we exchange numbers?",
      ];

      const response = {
        id: `msg-${Date.now()}`,
        text: responses[Math.floor(Math.random() * responses.length)],
        senderId: currentConversation!.otherUser.id,
        timestamp: new Date(),
      };

      setLocalMessages(prev => ({
        ...prev,
        [selectedConv]: [...(prev[selectedConv] || []), response],
      }));
    }, 1000);
  };

  if (conversations.length === 0) {
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
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No conversations yet</h2>
          <p className="text-gray-600 mb-8">Find matches and start chatting!</p>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold shadow-lg"
          >
            Find Matches
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
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-200 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv.id)}
                  className={`w-full p-4 flex items-center text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedConv === conv.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <img
                    src={conv.otherUser.avatar}
                    alt={conv.otherUser.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conv.otherUser.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {conv.otherUser.bio}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat Area */}
            {currentConversation && (
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center">
                    <img
                      src={currentConversation.otherUser.avatar}
                      alt={currentConversation.otherUser.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {currentConversation.otherUser.name}
                      </h3>
                      <p className="text-sm text-green-600">● Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {/* Initial greeting */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-xs bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                        <p className="text-gray-800">
                          Hey! I saw we matched. Excited to connect! 👋
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Just now</p>
                      </div>
                    </motion.div>

                    {/* Local messages */}
                    {selectedConv && (localMessages[selectedConv] || []).map((msg: { id: string; text: string; senderId: string; timestamp: Date }) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs rounded-2xl px-4 py-3 shadow-sm ${
                            msg.senderId === currentUser.id
                              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-tr-sm'
                              : 'bg-white text-gray-800 rounded-tl-sm'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${
                            msg.senderId === currentUser.id ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            Just now
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-3">
                    <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                      <Smile className="w-6 h-6 text-gray-400" />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!message.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}