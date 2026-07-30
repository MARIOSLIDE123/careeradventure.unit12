import { StudentProgress, ActivityLog, BadgeItem } from '../types';

export const LEVEL_TITLES = [
  'Tân thủ Nghề nghiệp',          // Level 1: 0 - 199 XP
  'Tập sự Cần mẫn',              // Level 2: 200 - 499 XP
  'Học viên Tiềm năng',          // Level 3: 500 - 899 XP
  'Kỹ sư Từ vựng',               // Level 4: 900 - 1399 XP
  'Chiến thần Luyện tập',        // Level 5: 1400 - 1999 XP
  'Chuyên gia Hướng nghiệp',     // Level 6: 2000 - 2699 XP
  'Bậc thầy Nghề nghiệp 3D',     // Level 7: 2700 - 3499 XP
  'Huyền thoại Lớp 9 Global Success' // Level 8+: 3500+ XP
];

export const ALL_BADGES: BadgeItem[] = [
  {
    id: 'badge_first_step',
    title: 'Khởi đầu Đam mê',
    description: 'Điền thông tin và bắt đầu hành trình Career Adventure',
    icon: '🚀',
    category: 'general',
    unlocked: true,
  },
  {
    id: 'badge_vocab_beginner',
    title: 'Thần đồng Từ vựng',
    description: 'Học và luyện tập ít nhất 5 từ vựng Unit 12',
    icon: '📚',
    category: 'vocab',
    unlocked: false,
  },
  {
    id: 'badge_vocab_master',
    title: 'Bậc thầy Nghề nghiệp',
    description: 'Khám phá đủ 17 từ vựng chuyên sâu về Career Choices',
    icon: '🌟',
    category: 'vocab',
    unlocked: false,
  },
  {
    id: 'badge_game_player',
    title: 'Gamer Hướng nghiệp',
    description: 'Chơi và vượt qua ít nhất 3 minigames 3D Pixar',
    icon: '🎮',
    category: 'game',
    unlocked: false,
  },
  {
    id: 'badge_star_collector',
    title: 'Thợ săn Ngôi sao',
    description: 'Tích lũy từ 15 sao trở lên trong các minigames',
    icon: '⭐',
    category: 'game',
    unlocked: false,
  },
  {
    id: 'badge_test_pass',
    title: 'Sĩ tử Tốt nghiệp',
    description: 'Hoàn thành bài kiểm tra 10 câu đạt từ 50 điểm trở lên',
    icon: '📝',
    category: 'assessment',
    unlocked: false,
  },
  {
    id: 'badge_test_master',
    title: 'Thủ khoa Unit 12',
    description: 'Đạt điểm tuyệt đối 100/100 trong bài kiểm tra đánh giá',
    icon: '🏆',
    category: 'assessment',
    unlocked: false,
  },
  {
    id: 'badge_ai_friend',
    title: 'Bạn thân Sparky AI',
    description: 'Trò chuyện và hỏi đáp cùng Gia sư AI Sparky 3D từ 3 câu hỏi',
    icon: '🤖',
    category: 'ai',
    unlocked: false,
  },
  {
    id: 'badge_pro_career',
    title: 'Định hướng Vững vàng',
    description: 'Đạt từ 1.000 điểm XP tổng trở lên',
    icon: '👑',
    category: 'general',
    unlocked: false,
  },
];

export function calculateLevel(points: number): { level: number; title: string; currentLevelXp: number; nextLevelXp: number } {
  // Level steps: 0, 200, 500, 900, 1400, 2000, 2700, 3500
  const thresholds = [0, 200, 500, 900, 1400, 2000, 2700, 3500];
  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (points >= thresholds[i]) {
      level = i + 1;
      break;
    }
  }

  const titleIndex = Math.min(level - 1, LEVEL_TITLES.length - 1);
  const title = LEVEL_TITLES[titleIndex];

  const currentLevelMin = thresholds[Math.min(level - 1, thresholds.length - 1)];
  const nextLevelMin = thresholds[Math.min(level, thresholds.length - 1)] || currentLevelMin + 1000;

  return {
    level,
    title,
    currentLevelXp: points - currentLevelMin,
    nextLevelXp: nextLevelMin - currentLevelMin,
  };
}

export function getDefaultProgress(): StudentProgress {
  return {
    totalPoints: 100, // Initial bonus
    level: 1,
    levelTitle: 'Tân thủ Nghề nghiệp',
    totalStars: 12,
    vocabLearnedCount: 3,
    gamesPlayedCount: 1,
    assessmentHighScore: 0,
    aiQuestionsCount: 0,
    unlockedBadges: ['badge_first_step'],
    activityLogs: [
      {
        id: 'init_log',
        activityName: 'Đăng ký tài khoản & Nhận thưởng tân thủ',
        category: 'daily',
        pointsEarned: 100,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        detail: 'Chào mừng em đến với Career Adventure Grade 9!'
      }
    ]
  };
}

export function loadProgress(studentName?: string): StudentProgress {
  if (!studentName) return getDefaultProgress();
  try {
    const key = `career_adventure_progress_${studentName.trim()}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...getDefaultProgress(),
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to load student progress:', e);
  }
  return getDefaultProgress();
}

export function saveProgress(studentName: string, progress: StudentProgress) {
  if (!studentName) return;
  try {
    const key = `career_adventure_progress_${studentName.trim()}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save student progress:', e);
  }
}

export function addPointsToProgress(
  prevProgress: StudentProgress,
  activityName: string,
  category: 'vocab' | 'game' | 'assessment' | 'ai' | 'daily',
  points: number,
  detail?: string
): { updatedProgress: StudentProgress; newlyUnlockedBadges: string[] } {
  const newPoints = prevProgress.totalPoints + points;
  const { level, title } = calculateLevel(newPoints);

  let vocabCount = prevProgress.vocabLearnedCount;
  let gamesCount = prevProgress.gamesPlayedCount;
  let highQuiz = prevProgress.assessmentHighScore;
  let aiCount = prevProgress.aiQuestionsCount;
  let stars = prevProgress.totalStars;

  if (category === 'vocab') vocabCount += 1;
  if (category === 'game') gamesCount += 1;
  if (category === 'ai') aiCount += 1;
  if (category === 'assessment' && detail?.includes('score:')) {
    const scoreVal = parseInt(detail.split('score:')[1]) || 0;
    if (scoreVal > highQuiz) highQuiz = scoreVal;
  }

  // Check badges unlock conditions
  const newlyUnlockedBadges: string[] = [];
  const currentBadges = new Set(prevProgress.unlockedBadges);

  if (vocabCount >= 5 && !currentBadges.has('badge_vocab_beginner')) {
    currentBadges.add('badge_vocab_beginner');
    newlyUnlockedBadges.push('badge_vocab_beginner');
  }
  if (vocabCount >= 15 && !currentBadges.has('badge_vocab_master')) {
    currentBadges.add('badge_vocab_master');
    newlyUnlockedBadges.push('badge_vocab_master');
  }
  if (gamesCount >= 3 && !currentBadges.has('badge_game_player')) {
    currentBadges.add('badge_game_player');
    newlyUnlockedBadges.push('badge_game_player');
  }
  if (stars >= 15 && !currentBadges.has('badge_star_collector')) {
    currentBadges.add('badge_star_collector');
    newlyUnlockedBadges.push('badge_star_collector');
  }
  if (highQuiz >= 50 && !currentBadges.has('badge_test_pass')) {
    currentBadges.add('badge_test_pass');
    newlyUnlockedBadges.push('badge_test_pass');
  }
  if (highQuiz >= 100 && !currentBadges.has('badge_test_master')) {
    currentBadges.add('badge_test_master');
    newlyUnlockedBadges.push('badge_test_master');
  }
  if (aiCount >= 3 && !currentBadges.has('badge_ai_friend')) {
    currentBadges.add('badge_ai_friend');
    newlyUnlockedBadges.push('badge_ai_friend');
  }
  if (newPoints >= 1000 && !currentBadges.has('badge_pro_career')) {
    currentBadges.add('badge_pro_career');
    newlyUnlockedBadges.push('badge_pro_career');
  }

  const newLog: ActivityLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    activityName,
    category,
    pointsEarned: points,
    timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    detail
  };

  const updatedProgress: StudentProgress = {
    totalPoints: newPoints,
    level,
    levelTitle: title,
    totalStars: stars,
    vocabLearnedCount: vocabCount,
    gamesPlayedCount: gamesCount,
    assessmentHighScore: highQuiz,
    aiQuestionsCount: aiCount,
    unlockedBadges: Array.from(currentBadges),
    activityLogs: [newLog, ...prevProgress.activityLogs].slice(0, 30) // keep last 30 logs
  };

  return { updatedProgress, newlyUnlockedBadges };
}
