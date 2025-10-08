export type PersonalityType = 'builder' | 'collaborator' | 'visionary' | 'analyst' | 'connector';

export type HobbyCategory = 'fitness' | 'arts' | 'music' | 'sports' | 'gaming' | 'cooking' | 'reading' | 'travel' | 'outdoors' | 'nightlife' | 'volunteer' | 'language' | 'boardgames' | 'coffee' | 'deep-conv';

export type VocationalGoal = 'career-growth' | 'academics' | 'entrepreneurship' | 'creative' | 'social-impact';

export type DatingPreference = 'chill' | 'playful' | 'deep-talks' | 'adventurous' | 'open-casual' | 'dating' | 'relationship' | 'same-major' | 'similar-culture' | 'same-faith' | 'startup' | 'fitness-oriented';

export type TieCategory = 'friends' | 'dates' | 'collaborators';

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    type: PersonalityType;
  }[];
}

export interface User {
  id: string;
  name: string;
  email?: string;
  username?: string;
  profilePicture?: string;
  avatar: string;
  personalityType?: PersonalityType;
  hobbies: HobbyCategory[];
  goals: VocationalGoal[];
  datingPreferences?: DatingPreference[];
  bio?: string;
  linkedin?: string;
  instagram?: string;
}

export interface CompatibilityReport {
  score: number;
  strengths: string[];
  considerations: string[];
  summary: string;
}

export interface TieRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  category: TieCategory;
  query: string;
  categories: (HobbyCategory | VocationalGoal | DatingPreference)[];
  refiners?: string[];
  cadence?: 'once' | 'weekly' | '3xweek';
  timeOfDay?: 'morning' | 'afternoon' | 'night';
  location?: 'campus' | 'near-me' | 'remote';
  timestamp: Date;
  expiresAt: Date;
  status: 'pending' | 'matched' | 'expired';
}

export interface SearchRequest {
  id: string;
  userId: string;
  userName: string;
  query: string;
  categories: (HobbyCategory | VocationalGoal)[];
  timestamp: Date;
  status: 'pending' | 'matched';
}

export interface Match {
  id: string;
  user: User;
  compatibilityReport: CompatibilityReport;
  timestamp: Date;
  tieRequestId?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isFromTy?: boolean;
}

export interface Conversation {
  id: string;
  matchId: string;
  otherUser: User;
  messages: Message[];
  lastMessage?: Message;
  tyIntroduced?: boolean;
}
