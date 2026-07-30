export interface StudentInfo {
  name: string;
  className: string;
  school: string;
  avatar: string;
}

export interface VocabItem {
  id: string;
  word: string;
  ipa: string;
  meaning: string;
  example: string;
  category: string;
  workplace: string;
  emoji: string;
  '3dIconBg': string;
  isFavorite?: boolean;
  isSaved?: boolean;
}

export interface GameStats {
  unlockedGates: number;
  totalStars: number;
  gameHighScores: Record<string, number>;
  badgesEarned: string[];
}

export interface QuizQuestion {
  id: string;
  type: 'mc' | 'blank' | 'match' | 'listening' | 'picture' | 'read' | 'tf' | 'odd' | 'dialogue' | 'speed';
  partName: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  audioText?: string;
  imageUrl?: string;
  dialogueSpeaker?: string;
}

export interface AssessmentResult {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  timeInSeconds: number;
  rank: string;
  badge: 'Bronze' | 'Silver' | 'Gold' | 'Career Master';
  date: string;
}

export interface ActivityLog {
  id: string;
  activityName: string;
  category: 'vocab' | 'game' | 'assessment' | 'ai' | 'daily';
  pointsEarned: number;
  timestamp: string;
  detail?: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'vocab' | 'game' | 'assessment' | 'ai' | 'general';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface StudentProgress {
  totalPoints: number;
  level: number;
  levelTitle: string;
  totalStars: number;
  vocabLearnedCount: number;
  gamesPlayedCount: number;
  assessmentHighScore: number;
  aiQuestionsCount: number;
  unlockedBadges: string[];
  activityLogs: ActivityLog[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

