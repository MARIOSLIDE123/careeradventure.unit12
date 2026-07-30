import React, { useState } from 'react';
import { StudentInfo, StudentProgress, BadgeItem } from '../types';
import { ALL_BADGES, calculateLevel } from '../utils/progress';
import { playClickSound, playWinSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Trophy, Star, Award, Zap, BookOpen, Gamepad2, ClipboardList, Bot, Flame, ShieldCheck, CheckCircle2, Lock, ArrowUpRight, Printer, Sparkles, User, Medal } from 'lucide-react';

interface AchievementsSectionProps {
  studentInfo: StudentInfo | null;
  progress: StudentProgress;
  onRequireStudentInfo: (tab: any, label: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  studentInfo,
  progress,
  onRequireStudentInfo
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'vocab' | 'game' | 'assessment' | 'ai' | 'general'>('all');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const levelInfo = calculateLevel(progress.totalPoints);
  const progressPercent = Math.min(100, Math.round((levelInfo.currentLevelXp / levelInfo.nextLevelXp) * 100));

  const unlockedSet = new Set(progress.unlockedBadges);

  const filteredBadges = ALL_BADGES.filter(b => {
    if (selectedCategory === 'all') return true;
    return b.category === selectedCategory;
  });

  const unlockedCount = ALL_BADGES.filter(b => unlockedSet.has(b.id)).length;

  const handleOpenCertificate = () => {
    playWinSound();
    setShowCertificateModal(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handlePrintCertificate = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* SECTION HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 p-6 md:p-8 text-white shadow-2xl border border-amber-400/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-slate-900/80 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-xl flex-shrink-0">
              {studentInfo?.avatar || '🧑‍🎓'}
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-slate-950/40 border border-amber-300/40 text-amber-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>BẢNG VÀNG THÀNH TÍCH CÁ NHÂN</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
                {studentInfo?.name || 'Học sinh Lớp 9'}
              </h1>
              <p className="text-xs md:text-sm text-amber-100 font-medium">
                {studentInfo?.className || 'Lớp 9'} • {studentInfo?.school || 'Trường THCS'} — Unit 12: Career Choices
              </p>
            </div>
          </div>

          {/* Certificate Action Button */}
          <button
            onClick={handleOpenCertificate}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-950 text-amber-300 font-black text-sm rounded-2xl border-2 border-amber-300 shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all group"
          >
            <Award className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>XEM GIẤY KHEN THÀNH TÍCH 📜</span>
          </button>
        </div>

        {/* Level & Points Summary Banner */}
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Level Card */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-amber-400/30">
            <div className="text-xs text-amber-200 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>CẤP ĐỘ CÁ NHÂN</span>
              <span className="text-amber-300">Level {levelInfo.level}</span>
            </div>
            <div className="text-lg font-black text-white mt-1 truncate">
              {levelInfo.title}
            </div>
            {/* Progress bar */}
            <div className="mt-2 space-y-1">
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-amber-200/80 font-bold text-right">
                {levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP ({progressPercent}%)
              </div>
            </div>
          </div>

          {/* Total Points */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-amber-400/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-2xl font-black">
              ⚡
            </div>
            <div>
              <div className="text-xs text-amber-200 font-bold uppercase tracking-wider">
                TỔNG ĐIỂM TÍCH LŨY
              </div>
              <div className="text-2xl font-black text-amber-300">
                {progress.totalPoints.toLocaleString('vi-VN')} <span className="text-xs text-white">XP</span>
              </div>
            </div>
          </div>

          {/* Stars Collected */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-amber-400/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 flex items-center justify-center text-2xl font-black">
              ⭐
            </div>
            <div>
              <div className="text-xs text-amber-200 font-bold uppercase tracking-wider">
                TỔNG NGÔI SAO
              </div>
              <div className="text-2xl font-black text-yellow-300">
                {progress.totalStars} <span className="text-xs text-white">Stars</span>
              </div>
            </div>
          </div>

          {/* Badges Count */}
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-amber-400/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pink-400/20 text-pink-300 border border-pink-400/40 flex items-center justify-center text-2xl font-black">
              🏅
            </div>
            <div>
              <div className="text-xs text-amber-200 font-bold uppercase tracking-wider">
                HUY CHƯƠNG ĐẠT ĐƯỢC
              </div>
              <div className="text-2xl font-black text-pink-300">
                {unlockedCount} / {ALL_BADGES.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Vocab Stat */}
        <div className="bg-slate-900/80 border-2 border-sky-500/40 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center text-2xl">
              📚
            </div>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
              Từ Vựng
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {progress.vocabLearnedCount} / 17 <span className="text-xs font-semibold text-slate-400">Từ vựng</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Từ vựng Unit 12 đã mở khóa & thực hành
            </p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-sky-400 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((progress.vocabLearnedCount / 17) * 100))}%` }} />
          </div>
        </div>

        {/* Minigames Stat */}
        <div className="bg-slate-900/80 border-2 border-emerald-500/40 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl">
              🎮
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Minigames
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {progress.gamesPlayedCount} <span className="text-xs font-semibold text-slate-400">Trò chơi</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Số lượt thử thách game Pixar đã hoàn thành
            </p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${Math.min(100, progress.gamesPlayedCount * 25)}%` }} />
          </div>
        </div>

        {/* Assessment Stat */}
        <div className="bg-slate-900/80 border-2 border-purple-500/40 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center text-2xl">
              📝
            </div>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              Kiểm Tra
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {progress.assessmentHighScore} <span className="text-xs font-semibold text-slate-400">/ 100 Điểm</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Điểm cao nhất bài đánh giá năng lực
            </p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-400 h-full rounded-full" style={{ width: `${progress.assessmentHighScore}%` }} />
          </div>
        </div>

        {/* AI Tutor Stat */}
        <div className="bg-slate-900/80 border-2 border-fuchsia-500/40 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-400 flex items-center justify-center text-2xl">
              🤖
            </div>
            <span className="text-xs font-bold text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-1 rounded-full border border-fuchsia-500/20">
              Gia Sư AI
            </span>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {progress.aiQuestionsCount} <span className="text-xs font-semibold text-slate-400">Câu hỏi</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Số câu hỏi tương tác giải đáp cùng Sparky 3D
            </p>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-fuchsia-400 h-full rounded-full" style={{ width: `${Math.min(100, progress.aiQuestionsCount * 20)}%` }} />
          </div>
        </div>
      </div>

      {/* BADGES SHOWCASE SECTION */}
      <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Medal className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-black text-white tracking-tight">
                BỘ SƯU TẬP HUY CHƯƠNG danh dự
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Hoàn thành các mốc học tập để mở khóa trọn bộ huy chương Pixar!
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0 no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'vocab', label: 'Từ vựng' },
              { id: 'game', label: 'Games' },
              { id: 'assessment', label: 'Kiểm tra' },
              { id: 'ai', label: 'AI Tutor' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { playClickSound(); setSelectedCategory(tab.id as any); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map(badge => {
            const isUnlocked = unlockedSet.has(badge.id);
            return (
              <div
                key={badge.id}
                className={`relative p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-amber-400/60 shadow-lg shadow-amber-500/10 hover:-translate-y-1'
                    : 'bg-slate-950/60 border-slate-800 opacity-60 grayscale hover:grayscale-0 hover:opacity-80'
                }`}
              >
                {/* Badge Icon Container */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner flex-shrink-0 ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 to-orange-500 ring-2 ring-amber-300'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {badge.icon}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-black text-sm ${isUnlocked ? 'text-amber-300' : 'text-slate-400'}`}>
                      {badge.title}
                    </h3>
                    {isUnlocked ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã mở
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Chưa mở
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVITY LOG & LEADERBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Logs (Left 2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-lg text-white">LỊCH SỬ TÍCH ĐIỂM HOẠT ĐỘNG</h3>
            </div>
            <span className="text-xs text-slate-400">
              {progress.activityLogs.length} ghi nhận gần nhất
            </span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {progress.activityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-sm">
                    {log.category === 'vocab' && '📚'}
                    {log.category === 'game' && '🎮'}
                    {log.category === 'assessment' && '📝'}
                    {log.category === 'ai' && '🤖'}
                    {log.category === 'daily' && '🚀'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {log.activityName}
                    </div>
                    {log.detail && (
                      <div className="text-[11px] text-slate-400">
                        {log.detail}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    +{log.pointsEarned} XP
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {log.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Classroom Benchmarks Leaderboard (Right 1 col) */}
        <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h3 className="font-black text-lg text-white">BẢNG VÀNG THI ĐUÔI</h3>
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full">
              Lớp 9
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { rank: 1, name: 'Nguyễn Hoàng Nam', class: '9A1', xp: 2450, avatar: '🧑‍🔬', title: 'Chuyên gia Hướng nghiệp' },
              { rank: 2, name: 'Lê Minh Anh', class: '9A2', xp: 2100, avatar: '👩‍💻', title: 'Kỹ sư Từ vựng' },
              { rank: 3, name: studentInfo?.name || 'Bạn', class: studentInfo?.className || '9A1', xp: progress.totalPoints, avatar: studentInfo?.avatar || '🧑‍🎓', isUser: true, title: levelInfo.title },
              { rank: 4, name: 'Trần Vũ Bảo', class: '9A1', xp: 950, avatar: '🧑‍✈️', title: 'Chiến thần Luyện tập' },
              { rank: 5, name: 'Phạm Quỳnh Chi', class: '9A3', xp: 820, avatar: '👨‍🎨', title: 'Học viên Tiềm năng' },
            ].map((st) => (
              <div
                key={st.rank}
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  st.isUser
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                    st.rank === 1 ? 'bg-yellow-400 text-slate-950' :
                    st.rank === 2 ? 'bg-slate-300 text-slate-950' :
                    st.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    #{st.rank}
                  </div>
                  <div className="text-xl">{st.avatar}</div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{st.name}</span>
                      {st.isUser && <span className="text-[10px] text-amber-300 font-extrabold">(Bạn)</span>}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {st.class} • {st.title}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-black text-amber-300">
                  {st.xp.toLocaleString()} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRINTABLE CERTIFICATE MODAL */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-amber-50 border-8 border-amber-600 rounded-3xl p-8 shadow-2xl text-slate-900 space-y-6 overflow-hidden">
            {/* Certificate Decorative Border */}
            <div className="absolute inset-2 border-2 border-amber-700/40 rounded-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => { playClickSound(); setShowCertificateModal(false); }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all z-20 print:hidden"
            >
              ✕
            </button>

            {/* Certificate Header */}
            <div className="text-center space-y-2 relative z-10 pt-4">
              <div className="text-amber-800 font-extrabold text-sm uppercase tracking-widest">
                BỘ GIÁO DỤC VÀ ĐÀO TẠO • BÀI HỌC UNIT 12
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-amber-900 tracking-tight">
                GIẤY KHEN THÀNH TÍCH
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 mx-auto rounded-full" />
              <p className="text-xs md:text-sm text-slate-700 italic font-medium pt-1">
                Tuyên dương thành xuất sắc trong chương trình học Tiếng Anh Lớp 9 Global Success
              </p>
            </div>

            {/* Student Certificate Details */}
            <div className="text-center space-y-4 relative z-10 py-4">
              <p className="text-sm text-slate-700">Trân trọng trao tặng cho Học sinh:</p>
              
              <div className="text-3xl md:text-4xl font-black text-amber-800 underline decoration-amber-400 decoration-wavy">
                {studentInfo?.name || 'Nguyễn Văn An'}
              </div>

              <p className="text-sm font-bold text-slate-800">
                Lớp: <span className="text-amber-900">{studentInfo?.className || '9A1'}</span> — Trường: <span className="text-amber-900">{studentInfo?.school || 'THCS Nguyễn Du'}</span>
              </p>

              <div className="p-4 bg-amber-100/80 border border-amber-300 rounded-2xl max-w-xl mx-auto space-y-1">
                <div className="text-xs text-amber-900 font-bold uppercase tracking-wider">
                  DANH HIỆU ĐẠT ĐƯỢC
                </div>
                <div className="text-2xl font-black text-orange-700">
                  {levelInfo.title}
                </div>
                <div className="text-xs font-semibold text-slate-700 pt-1">
                  Tổng điểm tích lũy: <strong className="text-amber-900">{progress.totalPoints} XP</strong> • Ngôi sao: <strong className="text-amber-900">{progress.totalStars} ⭐</strong>
                </div>
              </div>
            </div>

            {/* Certificate Footer Seals */}
            <div className="flex items-center justify-between pt-6 border-t-2 border-amber-200 text-center relative z-10 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-800">TRỢ LÝ AI SPARKY 3D</div>
                <div className="text-[10px] text-slate-500">Giáo viên Hướng nghiệp</div>
                <div className="text-2xl pt-1">🤖</div>
              </div>

              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-1 flex items-center justify-center text-3xl shadow-lg font-black text-white">
                🏅
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-800">NGÀY CẤP BẰNG</div>
                <div className="text-[10px] text-slate-600 font-semibold">{new Date().toLocaleDateString('vi-VN')}</div>
                <div className="text-[10px] text-amber-800 font-bold">CAREER ADVENTURE 3D</div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-center gap-3 pt-4 print:hidden relative z-10">
              <button
                onClick={handlePrintCertificate}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>IN / LƯU GIẤY KHEN (PDF)</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
