import { Dumbbell, Trophy, Music, Palette, Gamepad2, ChefHat, Book, Plane, Trees, PartyPopper, Users, Globe, Coffee, MessageSquare, Heart, Sparkles, Briefcase, Lightbulb } from 'lucide-react';

export interface CategoryTile {
  id: string;
  label: string;
  icon: any;
  refiners: string[];
}

export const friendCategories: CategoryTile[] = [
  {
    id: 'fitness',
    label: 'Fitness',
    icon: Dumbbell,
    refiners: ['Lifting', 'Running', 'Yoga', 'Pilates', 'Climbing', 'Class buddy', 'Accountability']
  },
  {
    id: 'sports',
    label: 'Sports',
    icon: Trophy,
    refiners: ['Basketball', 'Soccer', 'Tennis', 'Pickleball', 'Ultimate', 'Intramurals']
  },
  {
    id: 'music',
    label: 'Music',
    icon: Music,
    refiners: ['Concerts', 'Jamming', 'Singing', 'Production', 'Choir', 'Open mics']
  },
  {
    id: 'arts',
    label: 'Arts',
    icon: Palette,
    refiners: ['Drawing', 'Painting', 'Photography', 'Film', 'Museums', 'Theater']
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: Gamepad2,
    refiners: ['PC', 'Console', 'Switch', 'Co-op', 'Strategy', 'FPS', 'Retro']
  },
  {
    id: 'cooking',
    label: 'Cooking',
    icon: ChefHat,
    refiners: ['Meal prep', 'Baking', 'Trying new spots', 'Potlucks']
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: Book,
    refiners: ['Book club', 'Nonfiction', 'Fiction', 'Essays', 'Poetry']
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: Plane,
    refiners: ['Day trips', 'Weekend getaways', 'Thrifting walks', 'City exploring']
  },
  {
    id: 'outdoors',
    label: 'Outdoors',
    icon: Trees,
    refiners: ['Hiking', 'Running trails', 'Biking', 'Sunrise/sunset']
  },
  {
    id: 'nightlife',
    label: 'Nightlife',
    icon: PartyPopper,
    refiners: ['Parties', 'Live music', 'Comedy', 'Campus events']
  },
  {
    id: 'volunteer',
    label: 'Volunteer',
    icon: Users,
    refiners: ['Tutoring', 'Community service', 'Fundraisers']
  },
  {
    id: 'language',
    label: 'Language',
    icon: Globe,
    refiners: ['Spanish', 'Mandarin', 'French', 'Japanese', 'Korean']
  },
  {
    id: 'boardgames',
    label: 'Board Games',
    icon: Gamepad2,
    refiners: ['Catan', 'Chess', 'Poker', 'Mahjong', 'D&D']
  },
  {
    id: 'coffee',
    label: 'Coffee/Study',
    icon: Coffee,
    refiners: ['Pomodoro', 'Quiet study', 'Cafe hopping']
  },
  {
    id: 'deep-conv',
    label: 'Deep Talks',
    icon: MessageSquare,
    refiners: ['Philosophy', 'Startups', 'Psychology', 'Faith']
  }
];

export const dateCategories: CategoryTile[] = [
  {
    id: 'vibe',
    label: 'Vibe',
    icon: Sparkles,
    refiners: ['Chill/low-pressure', 'Playful', 'Deep talks', 'Adventurous']
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: Heart,
    refiners: ['Coffee', 'Walk', 'Museum', 'Live music', 'Food crawl', 'Outdoors']
  },
  {
    id: 'intent',
    label: 'Intent',
    icon: Heart,
    refiners: ['Open to casual', 'Dating', 'Relationship-minded']
  },
  {
    id: 'affinity',
    label: 'Affinity',
    icon: Users,
    refiners: ['Same major', 'Similar culture', 'Same faith', 'Startup-minded', 'Fitness-oriented']
  }
];

export const collaboratorCategories: CategoryTile[] = [
  {
    id: 'domain',
    label: 'Domain',
    icon: Briefcase,
    refiners: ['Software/AI', 'Design/UX', 'Content/Creator', 'Research', 'Business/Marketing', 'Social Impact']
  },
  {
    id: 'role',
    label: 'Role',
    icon: Users,
    refiners: ['Engineer', 'Designer', 'PM', 'Researcher', 'Marketer/Growth', 'Ops']
  },
  {
    id: 'project-type',
    label: 'Project Type',
    icon: Lightbulb,
    refiners: ['Hackathon', 'Startup', 'Class project', 'Research lab', 'Creator collab']
  },
  {
    id: 'timeline',
    label: 'Timeline',
    icon: Coffee,
    refiners: ['Weekend', '2-4 weeks', 'Semester', 'Ongoing']
  }
];
