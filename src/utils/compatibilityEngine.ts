import { User, CompatibilityReport } from '../types';
import { personalityDescriptions } from '../data/personalityTypes';

export function calculateCompatibility(user1: User, user2: User): CompatibilityReport {
  let score = 70; // Base score
  const strengths: string[] = [];
  const considerations: string[] = [];

  // Personality compatibility
  const type1 = user1.personalityType!;
  const type2 = user2.personalityType!;
  const bestMatches = personalityDescriptions[type1].bestMatch;

  if (bestMatches.includes(type2)) {
    score += 15;
    strengths.push(`${personalityDescriptions[type1].name} and ${personalityDescriptions[type2].name} personalities complement each other well`);
  } else if (type1 === type2) {
    score += 5;
    strengths.push('You share the same personality type, which creates natural understanding');
    considerations.push('Similar personalities might benefit from seeking diverse perspectives');
  }

  // Shared hobbies
  const sharedHobbies = user1.hobbies.filter(h => user2.hobbies.includes(h));
  if (sharedHobbies.length > 0) {
    score += sharedHobbies.length * 5;
    strengths.push(`${sharedHobbies.length} shared interest${sharedHobbies.length > 1 ? 's' : ''} for bonding`);
  }

  // Shared goals
  const sharedGoals = user1.goals.filter(g => user2.goals.includes(g));
  if (sharedGoals.length > 0) {
    score += sharedGoals.length * 8;
    strengths.push('Aligned vocational goals for mutual support');
  }

  // Add some variety
  if (user1.hobbies.length + user2.hobbies.length - sharedHobbies.length > 4) {
    strengths.push('Complementary interests bring fresh perspectives');
  }

  // Ensure score is reasonable
  score = Math.min(98, Math.max(65, score));

  // Generate summary
  let summary = '';
  if (score >= 90) {
    summary = 'Excellent match! You have strong compatibility across personality, interests, and goals.';
  } else if (score >= 80) {
    summary = 'Great match! You share important commonalities while bringing unique perspectives.';
  } else {
    summary = 'Good match! You have foundational compatibility with room to learn from each other.';
  }

  // Add considerations if needed
  if (considerations.length === 0) {
    considerations.push('Take time to understand each other\'s communication styles');
  }

  return {
    score,
    strengths: strengths.slice(0, 4),
    considerations: considerations.slice(0, 2),
    summary,
  };
}