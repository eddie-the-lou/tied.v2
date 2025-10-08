import { PersonalityType } from '../types';

export const personalityDescriptions: Record<PersonalityType, {
  name: string;
  emoji: string;
  description: string;
  bestMatch: PersonalityType[];
  color: string;
}> = {
  builder: {
    name: 'Builder',
    emoji: '🛠️',
    description: 'You\'re action-oriented and love turning ideas into reality. You thrive on tangible results and hands-on work.',
    bestMatch: ['visionary', 'analyst', 'collaborator'],
    color: 'bg-blue-500',
  },
  collaborator: {
    name: 'Collaborator',
    emoji: '🤝',
    description: 'You excel at bringing people together and creating harmonious teams. You value consensus and shared success.',
    bestMatch: ['builder', 'connector', 'visionary'],
    color: 'bg-green-500',
  },
  visionary: {
    name: 'Visionary',
    emoji: '🚀',
    description: 'You see the big picture and inspire others with innovative ideas. You\'re always thinking about what\'s next.',
    bestMatch: ['builder', 'analyst', 'collaborator'],
    color: 'bg-purple-500',
  },
  analyst: {
    name: 'Analyst',
    emoji: '🔍',
    description: 'You\'re detail-oriented and love diving deep into problems. Your logical approach helps teams make informed decisions.',
    bestMatch: ['builder', 'visionary', 'connector'],
    color: 'bg-orange-500',
  },
  connector: {
    name: 'Connector',
    emoji: '✨',
    description: 'You\'re a natural networker who loves bringing people together. Your social energy helps build thriving communities.',
    bestMatch: ['collaborator', 'analyst', 'visionary'],
    color: 'bg-pink-500',
  },
};