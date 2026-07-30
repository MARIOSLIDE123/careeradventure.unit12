import React from 'react';
import { StudentInfo, StudentProgress } from '../types';
import { Volume2, VolumeX, Sparkles, User, Award, BookOpen, Gamepad2, ClipboardList, Bot, Home, Lock, Trophy } from 'lucide-react';
import { getMuteState, toggleMute, playClickSound } from '../utils/audio';

interface HeaderProps {
  studentInfo: StudentInfo | null;
  progress?: StudentProgress;
  activeTab: 'home' | 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements';
  setActiveTab: (tab: 'home' | 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements') => void;
  onEditStudent: () => void;
  onRequireStudentInfo: (tab: 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements', label: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  studentInfo,
  progress,
  activeTab,
  setActiveTab,
  onEditStudent,
  onRequireStudentInfo
}) => {
  const [muted, setMuted] = React.useState(getMuteState());

  const handleToggleMute = () => {
    const isNowMuted = toggleMute();
    setMuted(isNowMuted);
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home, color: 'from-amber-400 to-orange-500' },
    { id: 'vocab', label: '1. Learn Vocab', icon: BookOpen, color: 'from-sky-400 to-blue-600' },
    { id: 'games', label: '2. Games', icon: Gamepad2, color: 'from-emerald-400 to-green-600' },
    { id: 'assessment', label: '3. Assessment', icon: ClipboardList, color: 'from-purple-400 to-pink-600' },
    { id: 'ai', label: '4. AI Tutor', icon: Bot, color: 'from-indigo-500 to-fuchsia-600' },
    { id: 'achievements', label: '5. Thành tích', icon: Trophy, color: 'from-amber-400 via-orange-500 to-yellow-500' },
  ] as const;

  const handleNavClick = (item: typeof navItems[number]) => {
    playClickSound();
    if (item.id !== 'home' && !studentInfo) {
      onRequireStudentInfo(item.id, item.label);
      return;
    }
    setActiveTab(item.id);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/30 px-4 py-3 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo Banner */}
        <div 
          onClick={() => { playClickSound(); setActiveTab('home'); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl">
              🚀
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400">
                CAREER ADVENTURE
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                Unit 12
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              3D Pixar Learning • Career Choices Grade 9
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <nav className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isLocked = item.id !== 'home' && !studentInfo;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap shadow-md ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-orange-500/20 scale-105 ring-2 ring-white/30`
                    : isLocked
                    ? 'bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-amber-500/40 hover:text-slate-200'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'animate-bounce' : ''}`} />
                <span>{item.label}</span>
                {isLocked && (
                  <Lock className="w-3 h-3 text-amber-400/80 ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Mute Controls */}
        <div className="flex items-center gap-2.5">
          {studentInfo ? (
            <button
              onClick={() => { playClickSound(); onEditStudent(); }}
              className="flex items-center gap-2 bg-slate-800/90 border border-amber-500/40 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs text-slate-200 transition-all hover:scale-102 shadow-md"
              title="Click để chỉnh sửa hồ sơ"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center font-bold text-white shadow">
                {studentInfo.avatar || studentInfo.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-amber-300 truncate max-w-[100px] flex items-center gap-1">
                  <span>{studentInfo.name}</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="text-amber-400 font-extrabold">{progress?.totalPoints || 0} XP</span>
                  <span>•</span>
                  <span>{studentInfo.className}</span>
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => { playClickSound(); onRequireStudentInfo('vocab', 'Bài học'); }}
              className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 transition-all hover:scale-102"
            >
              <User className="w-3.5 h-3.5" />
              <span>Nhập thông tin</span>
            </button>
          )}

          {/* Mute Button */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl border transition-all ${
              muted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
            }`}
            title={muted ? 'Sound muted (Click to turn sound on)' : 'Sound enabled (Click to mute)'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

