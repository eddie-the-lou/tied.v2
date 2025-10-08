import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Briefcase, Search, Clock, MapPin, ArrowLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { friendCategories, dateCategories, collaboratorCategories, CategoryTile } from '../data/tieCategories';

type TieType = 'friends' | 'dates' | 'collaborators' | 'direct' | null;
type Cadence = 'once' | 'weekly' | '3xweek';
type TimeOfDay = 'morning' | 'afternoon' | 'night';
type Location = 'campus' | 'near-me' | 'remote';

export default function TodaysTie() {
  const [selectedType, setSelectedType] = useState<TieType>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryTile | null>(null);
  const [selectedRefiners, setSelectedRefiners] = useState<string[]>([]);
  const [cadence, setCadence] = useState<Cadence>('once');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [location, setLocation] = useState<Location>('campus');
  const [customQuery, setCustomQuery] = useState('');
  const [showDirectSearch, setShowDirectSearch] = useState(false);

  const getCategoryList = () => {
    if (selectedType === 'friends') return friendCategories;
    if (selectedType === 'dates') return dateCategories;
    if (selectedType === 'collaborators') return collaboratorCategories;
    return [];
  };

  const buildPrompt = () => {
    if (!selectedCategory) return '';

    const categoryLabel = selectedCategory.label;
    const refinersText = selectedRefiners.length > 0 ? selectedRefiners.join(', ') : 'any';
    const cadenceText = cadence === 'once' ? 'one time' : cadence === 'weekly' ? 'weekly' : '3×/week';
    const timeText = timeOfDay === 'morning' ? 'mornings' : timeOfDay === 'afternoon' ? 'afternoons' : 'nights';
    const locationText = location === 'campus' ? 'on campus' : location === 'near-me' ? 'near me' : 'remote';

    if (selectedType === 'friends') {
      return `Looking for a ${categoryLabel} partner ${cadenceText} ${timeText} ${locationText} - ${refinersText}`;
    } else if (selectedType === 'dates') {
      return `Looking for a date - ${refinersText} ${locationText}`;
    } else if (selectedType === 'collaborators') {
      return `Looking for ${refinersText} for ${cadenceText} ${locationText}`;
    }
    return '';
  };

  const handleStartDrop = () => {
    const prompt = customQuery || buildPrompt();
    alert(`🚀 Tie Dropped!\n\n"${prompt}"\n\nYour tie is now live for 24 hours. We'll notify you when someone wants to get tied!`);
    resetBuilder();
  };

  const resetBuilder = () => {
    setSelectedType(null);
    setSelectedCategory(null);
    setSelectedRefiners([]);
    setCadence('once');
    setTimeOfDay('afternoon');
    setLocation('campus');
    setCustomQuery('');
    setShowDirectSearch(false);
  };

  const toggleRefiner = (refiner: string) => {
    setSelectedRefiners(prev =>
      prev.includes(refiner) ? prev.filter(r => r !== refiner) : [...prev, refiner]
    );
  };

  if (showDirectSearch) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-4">
            <button
              onClick={() => setShowDirectSearch(false)}
              className="flex items-center text-primary-600 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Direct Search</h1>
            <p className="text-sm text-gray-600 mt-1">Describe exactly what you're looking for</p>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="E.g., Looking for a sophomore CS major to work on a startup idea together..."
              className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none"
            />

            <button
              onClick={handleStartDrop}
              disabled={!customQuery.trim()}
              className="w-full mt-4 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Drop
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Today's Tie</h1>
          <p className="text-sm text-gray-600 mt-1">You get one Tie per day, use it wisely.</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Step 0: Choose Type */}
        {!selectedType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedType('dates')}
                className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-200 hover:border-pink-400 transition-colors"
              >
                <Heart className="w-12 h-12 mx-auto mb-3 text-pink-500" />
                <h3 className="font-bold text-gray-900">Dates</h3>
              </button>

              <button
                onClick={() => setSelectedType('friends')}
                className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-colors"
              >
                <Users className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <h3 className="font-bold text-gray-900">Friends</h3>
              </button>

              <button
                onClick={() => setSelectedType('collaborators')}
                className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-200 hover:border-purple-400 transition-colors"
              >
                <Briefcase className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                <h3 className="font-bold text-gray-900">Collaborators</h3>
              </button>

              <button
                onClick={() => setShowDirectSearch(true)}
                className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-200 hover:border-green-400 transition-colors"
              >
                <Search className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <h3 className="font-bold text-gray-900">Direct Search</h3>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 1: Category Tiles */}
        {selectedType && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={resetBuilder}
              className="flex items-center text-primary-600 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <p className="text-sm text-gray-600 mb-4">Pick 1-2 tiles, a few chips, and we'll write it for you.</p>

            <div className="grid grid-cols-2 gap-3">
              {getCategoryList().map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className="bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-200 hover:border-primary-400 transition-colors"
                  >
                    <Icon className="w-10 h-10 mx-auto mb-2 text-gray-700" />
                    <h3 className="font-semibold text-sm text-gray-900">{cat.label}</h3>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Refiners */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedRefiners([]);
              }}
              className="flex items-center text-primary-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            {/* Category Display */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                {(() => {
                  const Icon = selectedCategory.icon;
                  return <Icon className="w-8 h-8 text-primary-600" />;
                })()}
                <h3 className="font-bold text-lg">{selectedCategory.label}</h3>
              </div>
            </div>

            {/* Refiners */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Select details (6-10 max):</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory.refiners.map((refiner) => (
                  <button
                    key={refiner}
                    onClick={() => toggleRefiner(refiner)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedRefiners.includes(refiner)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {refiner}
                  </button>
                ))}
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                  I'm flexible
                </button>
                <button className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Surprise me
                </button>
              </div>
            </div>

            {/* Step 3: Details */}
            <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cadence</label>
                <div className="flex space-x-2">
                  {(['once', 'weekly', '3xweek'] as Cadence[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCadence(c)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        cadence === c
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {c === 'once' ? 'Once' : c === 'weekly' ? 'Weekly' : '3×/week'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Time of Day
                </label>
                <div className="flex space-x-2">
                  {(['morning', 'afternoon', 'night'] as TimeOfDay[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeOfDay(t)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        timeOfDay === t
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </label>
                <div className="flex space-x-2">
                  {(['campus', 'near-me', 'remote'] as Location[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLocation(l)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        location === l
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {l === 'campus' ? 'Campus' : l === 'near-me' ? 'Near me' : 'Remote'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Prompt */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-5 rounded-2xl border-2 border-primary-200">
              <h4 className="font-semibold text-gray-900 mb-2">Suggested Prompt:</h4>
              <p className="text-gray-800 mb-4">"{buildPrompt()}"</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCustomQuery(buildPrompt())}
                  className="flex-1 py-2 px-4 bg-white border-2 border-primary-500 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={handleStartDrop}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  Start Drop
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
