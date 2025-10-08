import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  text: string;
  isFromTy: boolean;
  timestamp: Date;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Hey there! 👋 I'm Ty, your personal connection advisor. I know all about your personality, interests, and what you're looking for. How can I help you today?",
    isFromTy: true,
    timestamp: new Date()
  }
];

const tyResponses = [
  "That's a great question! Based on your personality type, I'd suggest...",
  "I see you're interested in that! Here's what I think...",
  "Given your profile and interests, my recommendation would be...",
  "That makes sense! Let me help you with that...",
  "I've got some thoughts on this based on your compatibility patterns..."
];

export default function TalkToTy() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      isFromTy: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate Ty's response
    setTimeout(() => {
      const randomResponse = tyResponses[Math.floor(Math.random() * tyResponses.length)];
      const tyMessage: ChatMessage = {
        id: `ty-${Date.now()}`,
        text: randomResponse,
        isFromTy: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, tyMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Talk to Ty</h1>
              <div className="flex items-center space-x-2 text-sm opacity-90">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Always here to help</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Context Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span>
              Ty knows: You're {currentUser.personalityType && <strong>{currentUser.personalityType}</strong>},
              interested in {currentUser.hobbies.slice(0, 2).join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-md mx-auto w-full px-4 py-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isFromTy ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${message.isFromTy ? 'order-1' : 'order-2'}`}>
                {message.isFromTy && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-5 h-5 text-primary-600" />
                    <span className="text-xs font-semibold text-gray-600">Ty</span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.isFromTy
                      ? 'bg-white border border-gray-200 text-gray-800'
                      : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%]">
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-5 h-5 text-primary-600" />
                  <span className="text-xs font-semibold text-gray-600">Ty</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 pb-20">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Ty anything..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setInput("How do I make better connections?")}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
            >
              💡 Make better connections
            </button>
            <button
              onClick={() => setInput("Why am I getting these suggested ties?")}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
            >
              🤔 Why these suggestions?
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
