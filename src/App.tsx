import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Onboarding from './pages/Onboarding';
import Quiz from './pages/Quiz';
import PersonalityRoast from './pages/PersonalityRoast';
import InterestSelection from './pages/InterestSelection';
import SuggestedTies from './pages/SuggestedTies';
import TodaysTie from './pages/TodaysTie';
import MyTies from './pages/MyTies';
import TalkToTy from './pages/TalkToTy';
import Profile from './pages/Profile';
import Messages from './pages/Messages';

// Keep old routes for backwards compatibility but redirect to new structure
import InviteFriends from './pages/InviteFriends';
import MatchResults from './pages/MatchResults';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<PersonalityRoast />} />
            <Route path="/interests" element={<InterestSelection />} />

            {/* New main app routes */}
            <Route path="/suggested-ties" element={<SuggestedTies />} />
            <Route path="/todays-tie" element={<TodaysTie />} />
            <Route path="/my-ties" element={<MyTies />} />
            <Route path="/talk-to-ty" element={<TalkToTy />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />

            {/* Legacy routes - redirect or keep for compatibility */}
            <Route path="/home" element={<Navigate to="/suggested-ties" replace />} />
            <Route path="/invite" element={<InviteFriends />} />
            <Route path="/matches" element={<MatchResults />} />
            <Route path="/search" element={<Navigate to="/todays-tie" replace />} />
            <Route path="/future" element={<Navigate to="/suggested-ties" replace />} />
          </Routes>
        </div>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
