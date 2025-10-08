import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Palette, Music, Trophy, Gamepad2, ChefHat, Book, Plane, Briefcase, GraduationCap, Lightbulb, Heart, Rocket, Trees, PartyPopper, Users, Globe, Coffee, MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HobbyCategory, VocationalGoal, DatingPreference } from '../types';

const hobbies: { value: HobbyCategory; label: string; icon: typeof Dumbbell }[] = [
  { value: 'fitness', label: 'Fitness', icon: Dumbbell },
  { value: 'arts', label: 'Arts', icon: Palette },
  { value: 'music', label: 'Music', icon: Music },
  { value: 'sports', label: 'Sports', icon: Trophy },
  { value: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { value: 'cooking', label: 'Cooking', icon: ChefHat },
  { value: 'reading', label: 'Reading', icon: Book },
  { value: 'travel', label: 'Travel', icon: Plane },
  { value: 'outdoors', label: 'Outdoors', icon: Trees },
  { value: 'nightlife', label: 'Nightlife', icon: PartyPopper },
  { value: 'volunteer', label: 'Volunteer', icon: Users },
  { value: 'language', label: 'Language', icon: Globe },
  { value: 'boardgames', label: 'Board Games', icon: Gamepad2 },
  { value: 'coffee', label: 'Coffee/Study', icon: Coffee },
  { value: 'deep-conv', label: 'Deep Talks', icon: MessageSquare },
];

const goals: { value: VocationalGoal; label: string; icon: typeof Briefcase }[] = [
  { value: 'career-growth', label: 'Career Growth', icon: Briefcase },
  { value: 'academics', label: 'Academics', icon: GraduationCap },
  { value: 'entrepreneurship', label: 'Entrepreneurship', icon: Rocket },
  { value: 'creative', label: 'Creative Pursuits', icon: Lightbulb },
  { value: 'social-impact', label: 'Social Impact', icon: Heart },
];

const datingPrefs: { value: DatingPreference; label: string; icon: typeof Sparkles }[] = [
  { value: 'chill', label: 'Chill/Low-pressure', icon: Coffee },
  { value: 'playful', label: 'Playful', icon: Sparkles },
  { value: 'deep-talks', label: 'Deep Talks', icon: MessageSquare },
  { value: 'adventurous', label: 'Adventurous', icon: Plane },
  { value: 'open-casual', label: 'Open to Casual', icon: Heart },
  { value: 'dating', label: 'Dating', icon: Heart },
  { value: 'relationship', label: 'Relationship-minded', icon: Heart },
  { value: 'same-major', label: 'Same Major', icon: GraduationCap },
  { value: 'similar-culture', label: 'Similar Culture', icon: Globe },
  { value: 'same-faith', label: 'Same Faith', icon: Heart },
  { value: 'startup', label: 'Startup-minded', icon: Rocket },
  { value: 'fitness-oriented', label: 'Fitness-oriented', icon: Dumbbell },
];

export default function InterestSelection() {
  const [selectedHobbies, setSelectedHobbies] = useState<HobbyCategory[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<VocationalGoal[]>([]);
  const [selectedDatingPrefs, setSelectedDatingPrefs] = useState<DatingPreference[]>([]);
  const navigate = useNavigate();
  const { setInterests } = useApp();

  const toggleHobby = (hobby: HobbyCategory) => {
    setSelectedHobbies(prev =>
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  const toggleGoal = (goal: VocationalGoal) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const toggleDatingPref = (pref: DatingPreference) => {
    setSelectedDatingPrefs(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleContinue = () => {
    if (selectedHobbies.length > 0 && selectedGoals.length > 0) {
      setInterests(selectedHobbies, selectedGoals, selectedDatingPrefs);
      navigate('/suggested-ties');
    }
  };

  return (
    <div className="min-h-screen p-4 py-8 bg-gradient-to-br from-primary-50 to-accent-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Interests</h1>
        <p className="text-gray-600 mb-8">Choose at least one hobby and one goal</p>

        <div className="space-y-8">
          {/* Hobbies */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hobbies & Activities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hobbies.map(({ value, label, icon: Icon }) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleHobby(value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedHobbies.includes(value)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${
                    selectedHobbies.includes(value) ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-xs font-medium ${
                    selectedHobbies.includes(value) ? 'text-primary-700' : 'text-gray-700'
                  }`}>
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Vocational Goals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map(({ value, label, icon: Icon }) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleGoal(value)}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center ${
                    selectedGoals.includes(value)
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mr-3 ${
                    selectedGoals.includes(value) ? 'text-accent-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedGoals.includes(value) ? 'text-accent-700' : 'text-gray-700'
                  }`}>
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Dating Preferences */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dating Preferences (Optional)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {datingPrefs.map(({ value, label, icon: Icon }) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleDatingPref(value)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedDatingPrefs.includes(value)
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${
                    selectedDatingPrefs.includes(value) ? 'text-pink-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-xs font-medium ${
                    selectedDatingPrefs.includes(value) ? 'text-pink-700' : 'text-gray-700'
                  }`}>
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={selectedHobbies.length === 0 || selectedGoals.length === 0}
            className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
