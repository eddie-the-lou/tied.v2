import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Brain, Clock, Target, Users, Sparkles } from 'lucide-react';

export default function FutureVision() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'AI instantly connects you with your most compatible matches',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Brain,
      title: 'Smart Compatibility',
      description: 'Advanced algorithms learn your preferences and improve over time',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Real-Time Connections',
      description: 'No more waiting - connect with people instantly when you need them',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Precision Matching',
      description: 'AI understands context and finds exactly who you\'re looking for',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Future Vision</h1>
          <span className="ml-auto px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
            COMING SOON
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl font-bold text-white mb-4">
            The Future of Connection
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Once we reach critical mass, Connect will transform into an AI-powered instant matching system
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-400/30"
        >
          <div className="flex items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mr-4 flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">How It Will Work</h2>
              <p className="text-gray-300 leading-relaxed">
                Imagine typing "sophomore gym buddy" and instantly seeing 3-5 perfectly matched people who are online right now, with detailed compatibility reports already generated. No waiting, no requests - just instant, intelligent connections powered by AI that understands context, personality, and real-time availability.
              </p>
            </div>
          </div>

          <div className="bg-black/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Phase 1: Current</p>
                  <p className="text-sm text-gray-400">Manual search with compatibility reports</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-gray-900 font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Phase 2: Growth</p>
                  <p className="text-sm text-gray-400">Expanding user base and collecting data</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Phase 3: AI Launch</p>
                  <p className="text-sm text-gray-400">Instant matching with advanced AI algorithms</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            Help us get there! The more people who join, the sooner we can launch AI-powered matching.
          </p>
          <button
            onClick={() => navigate('/invite')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
          >
            Invite Friends & Build the Future
          </button>
        </motion.div>
      </div>
    </div>
  );
}