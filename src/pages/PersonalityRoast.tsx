import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { personalityDescriptions } from '../data/personalityTypes';

const roasts: Record<string, string> = {
  builder: "Alright, so you're a Builder. You probably have 47 unfinished projects and a garage full of 'I'll use that someday' materials. You see a problem and think 'I can fix that' - even when nobody asked. Your friends know you as the person who says 'I'll just build it myself' and then disappears for 3 weeks. But hey, at least your IKEA furniture is actually stable!",
  collaborator: "You're a Collaborator, which means you've probably started 12 group chats this week alone. You're the person who says 'let's workshop this' unironically. Your superpower is making everyone feel heard, but your weakness is that you'd probably form a committee to decide what to have for lunch. You're great at bringing people together... even when they didn't ask to be brought together!",
  visionary: "A Visionary, huh? Let me guess - you have a notes app full of 'revolutionary ideas' that you'll definitely get to someday. You're always three steps ahead, which is great except when you forget about steps 1 and 2. People think you're either a genius or completely delusional, and honestly? You're both. But we need your chaotic energy to dream up the impossible!",
  analyst: "Oh, an Analyst. You probably fact-checked this roast while reading it. You're the person who brings spreadsheets to casual hangouts and has 73 browser tabs open for 'research.' You can spot a logical fallacy from a mile away, but you can't decide where to eat because you're still comparing Yelp reviews from 2019. Your attention to detail is impressive... until it's 3am and you're still optimizing something that was fine hours ago!",
  connector: "The Connector! You know someone who knows someone who knows someone who can help with literally anything. Your phone contacts look like a small country's directory. You're networking at the grocery store. People are genuinely impressed by your social skills until they realize you've introduced them to 15 people and they can't remember a single name. But hey, without you, the rest of us would be lonely hermits!"
};

export default function PersonalityRoast() {
  const navigate = useNavigate();
  const { currentUser } = useApp();

  if (!currentUser.personalityType) {
    navigate('/quiz');
    return null;
  }

  const personality = personalityDescriptions[currentUser.personalityType];
  const roast = roasts[currentUser.personalityType];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.5
            }}
            className="inline-block text-6xl mb-4"
          >
            {personality.emoji}
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4"
          >
            <Flame className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-bold">PERSONALITY ROAST</span>
            <Flame className="w-5 h-5 text-white ml-2" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            You're a {personality.name}!
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
            <p className="text-gray-800 leading-relaxed text-lg">
              {roast}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">The Real You</h2>
            <p className="text-gray-700 leading-relaxed">{personality.description}</p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">You Vibe With</h2>
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
            Let's Go!
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
