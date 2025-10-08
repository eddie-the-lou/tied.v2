import { createContext, useContext, useState, ReactNode } from 'react';
import { User, PersonalityType, HobbyCategory, VocationalGoal, DatingPreference, SearchRequest, Match, Conversation, TieRequest } from '../types';

interface AppState {
  currentUser: User;
  updateUser: (updates: Partial<User>) => void;
  setPersonalityType: (type: PersonalityType) => void;
  setInterests: (hobbies: HobbyCategory[], goals: VocationalGoal[], datingPrefs?: DatingPreference[]) => void;
  searchRequests: SearchRequest[];
  addSearchRequest: (query: string, categories: (HobbyCategory | VocationalGoal)[]) => void;
  tieRequests: TieRequest[];
  addTieRequest: (request: TieRequest) => void;
  matches: Match[];
  addMatch: (match: Match) => void;
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  notifications: number;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'current-user',
    name: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
    hobbies: [],
    goals: [],
  });

  const [searchRequests, setSearchRequests] = useState<SearchRequest[]>([]);
  const [tieRequests, setTieRequests] = useState<TieRequest[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [notifications, setNotifications] = useState(0);

  const updateUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const setPersonalityType = (type: PersonalityType) => {
    setCurrentUser(prev => ({ ...prev, personalityType: type }));
  };

  const setInterests = (hobbies: HobbyCategory[], goals: VocationalGoal[], datingPrefs?: DatingPreference[]) => {
    setCurrentUser(prev => ({
      ...prev,
      hobbies,
      goals,
      datingPreferences: datingPrefs || prev.datingPreferences
    }));
  };

  const addSearchRequest = (query: string, categories: (HobbyCategory | VocationalGoal)[]) => {
    const newRequest: SearchRequest = {
      id: `request-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      query,
      categories,
      timestamp: new Date(),
      status: 'pending',
    };
    setSearchRequests(prev => [...prev, newRequest]);
  };

  const addTieRequest = (request: TieRequest) => {
    setTieRequests(prev => [...prev, request]);
  };

  const addMatch = (match: Match) => {
    setMatches(prev => [...prev, match]);
    setNotifications(prev => prev + 1);
  };

  const addConversation = (conversation: Conversation) => {
    setConversations(prev => [...prev, conversation]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        updateUser,
        setPersonalityType,
        setInterests,
        searchRequests,
        addSearchRequest,
        tieRequests,
        addTieRequest,
        matches,
        addMatch,
        conversations,
        addConversation,
        notifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
