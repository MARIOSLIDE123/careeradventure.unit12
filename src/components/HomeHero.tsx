import React, { useState } from 'react';
import { StudentInfo } from '../types';
import { playClickSound, playWinSound } from '../utils/audio';
import { Sparkles, BookOpen, Gamepad2, ClipboardList, Bot, ArrowRight, Award, CheckCircle2, Star, Lock, UserCheck, Edit3 } from 'lucide-react';

interface HomeHeroProps {
  studentInfo: StudentInfo | null;
  onSaveStudentInfo: (info: StudentInfo) => void;
  onStartModule: (tab: 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements') => void;
  onRequireStudentInfo: (tab: 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements', label: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  studentInfo,
  onSaveStudentInfo,
  onStartModule,
  onRequireStudentInfo
}) => {
  const [name, setName] = useState(studentInfo?.name || '');
  const [className, setClassName] = useState(studentInfo?.className || '9A1');
  const [school, setSchool] = useState(studentInfo?.school || 'THCS Nguyễn Du');
  const [selectedAvatar, setSelectedAvatar] = useState(studentInfo?.avatar || '🧑‍🎓');
  const [isEditing, setIsEditing] = useState(!studentInfo);

  const avatars = ['🧑‍🎓', '👩‍🎓', '🚀', '🧑‍🔬', '👨‍🍳', '🧑‍✈️', '👩‍💻', '👨‍🎨'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    playWinSound();
    onSaveStudentInfo({
      name: name.trim(),
      className: className.trim() || 'Lớp 9',
      school: school.trim() || 'Trường THCS',
      avatar: selectedAvatar
    });
    setIsEditing(false);
  };

  const handleCardClick = (tab: 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements', label: string) => {
    playClickSound();
    if (!studentInfo) {
      onRequireStudentInfo(tab, label);
    } else {
      onStartModule(tab);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 3D Pixar Banner Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 border-2 border-amber-500/40 p-6 md:p-10 shadow-2xl">
        {/* Background Glowing Circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3D Titles */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 px-4 py-1.5 rounded-full text-amber-300 font-bold text-xs uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Grade 9 English • Unit 12</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-md leading-tight">
              CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400">ADVENTURE</span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 font-medium max-w-xl mx-auto lg:mx-0">
              Khám phá thế giới nghề nghiệp 3D Pixar sinh động! Nhập thông tin học sinh để mở khóa từ vựng, 9 trò chơi thử thách, bài kiểm tra và Gia sư AI cá nhân.
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span className="text-amber-400 text-base">📚</span> 18+ Từ Vựng Nghề Nghiệp
              </div>
              <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span className="text-emerald-400 text-base">🎮</span> 9 Minigames Phiêu Lưu
              </div>
              <div className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span className="text-pink-400 text-base">🤖</span> Trợ Lý AI Gia Sư
              </div>
            </div>
          </div>

          {/* Right Column: Pixar 3D Graphic Cards / Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            {studentInfo && !isEditing ? (
              /* Already filled student profile card */
              <div className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-md border-2 border-emerald-400/60 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>ĐÃ HOÀN TẤT THÔNG TIN</span>
                </div>

                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 p-1 shadow-xl flex items-center justify-center text-4xl">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    {studentInfo.avatar || '🧑‍🎓'}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white">
                    {studentInfo.name}
                  </h3>
                  <p className="text-sm font-bold text-amber-300">
                    Lớp: {studentInfo.className} • Trường: {studentInfo.school}
                  </p>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-xs text-emerald-200 font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Đã mở khóa toàn bộ bài học, minigames & trợ lý AI!</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => { playClickSound(); setIsEditing(true); }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Sửa thông tin</span>
                  </button>
                  <button
                    onClick={() => { playClickSound(); onStartModule('vocab'); }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-all shadow-md"
                  >
                    <span>VÀO HỌC NGAY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form Card */
              <div className="relative w-full max-w-md bg-slate-800/90 backdrop-blur-md border-2 border-amber-400/60 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>BẮT BỤỢC ĐIỀN THÔNG TIN ĐỂ TRUY CẬP</span>
                  </div>
                  <h3 className="text-xl font-black text-amber-300 pt-1">THÔNG TIN HỌC SINH</h3>
                  <p className="text-xs text-slate-400">Vui lòng nhập họ tên & trường lớp trước khi học!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Avatar Picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Chọn Avatar
                    </label>
                    <div className="flex items-center justify-between gap-1 bg-slate-900/60 p-2 rounded-xl border border-slate-700">
                      {avatars.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => { playClickSound(); setSelectedAvatar(av); }}
                          className={`text-xl p-1.5 rounded-lg transition-transform ${
                            selectedAvatar === av
                              ? 'bg-amber-500 text-white scale-110 shadow-md ring-2 ring-amber-300'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Họ và Tên <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập họ và tên..."
                      className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 transition-all outline-none"
                    />
                  </div>

                  {/* Grid Inputs Class & School */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Lớp
                      </label>
                      <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="VD: 9A1"
                        className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Trường THCS
                      </label>
                      <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="VD: Nguyễn Du"
                        className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* START Button */}
                  <button
                    type="submit"
                    onClick={playClickSound}
                    className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 group border-b-4 border-orange-700"
                  >
                    <span>LƯU & BẮT ĐẦU HỌC 🚀</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Main Learning Modules Cards */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400">
            CHỌN MỤC HỌC TẬP
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            {studentInfo
              ? 'Tất cả phần học đã sẵn sàng, hãy lựa chọn mục muốn học ngay!'
              : '⚠️ Bạn cần điền thông tin học sinh ở trên để mở khóa các phần học bên dưới'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Card 1: Vocab */}
          <div
            onClick={() => handleCardClick('vocab', 'LEARN VOCABULARY')}
            className={`group cursor-pointer relative bg-slate-800/80 hover:bg-slate-800 border-2 ${
              studentInfo ? 'border-sky-500/40 hover:border-sky-400' : 'border-slate-700 hover:border-amber-500/60'
            } rounded-3xl p-6 transition-all hover:-translate-y-1.5 shadow-xl hover:shadow-sky-500/20 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  📚
                </div>
                {!studentInfo ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-amber-400" /> Khóa
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded-full">
                    ✓ Mở khóa
                  </span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-sky-400 tracking-wider uppercase bg-sky-500/20 px-2.5 py-0.5 rounded-full">
                  Phần 1
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-sky-300 transition-colors">
                  LEARN VOCABULARY
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  18+ từ vựng 3D minh họa, phiên âm IPA, audio phát âm, Flashcards & Memory game.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300">
              <span>{studentInfo ? 'Khám phá ngay' : 'Điền thông tin để mở'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Games */}
          <div
            onClick={() => handleCardClick('games', 'ADVENTURE GAMES')}
            className={`group cursor-pointer relative bg-slate-800/80 hover:bg-slate-800 border-2 ${
              studentInfo ? 'border-emerald-500/40 hover:border-emerald-400' : 'border-slate-700 hover:border-amber-500/60'
            } rounded-3xl p-6 transition-all hover:-translate-y-1.5 shadow-xl hover:shadow-emerald-500/20 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-green-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🎮
                </div>
                {!studentInfo ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-amber-400" /> Khóa
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded-full">
                    ✓ Mở khóa
                  </span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Phần 2
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                  ADVENTURE GAMES
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  9 Minigames thử thách: Whack-a-Mole, Conveyor Factory, Escape Room, Boss Challenge.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>{studentInfo ? 'Chơi trò chơi' : 'Điền thông tin để mở'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Assessment */}
          <div
            onClick={() => handleCardClick('assessment', 'ASSESSMENT')}
            className={`group cursor-pointer relative bg-slate-800/80 hover:bg-slate-800 border-2 ${
              studentInfo ? 'border-purple-500/40 hover:border-purple-400' : 'border-slate-700 hover:border-amber-500/60'
            } rounded-3xl p-6 transition-all hover:-translate-y-1.5 shadow-xl hover:shadow-purple-500/20 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-400 to-pink-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  📝
                </div>
                {!studentInfo ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-amber-400" /> Khóa
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded-full">
                    ✓ Mở khóa
                  </span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-purple-400 tracking-wider uppercase bg-purple-500/20 px-2.5 py-0.5 rounded-full">
                  Phần 3
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-purple-300 transition-colors">
                  ASSESSMENT
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Kỳ kiểm tra mini 10 dạng bài: Trắc nghiệm, Điền từ, Nghe, Đọc, Odd One Out, Dialogue.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300">
              <span>{studentInfo ? 'Làm bài kiểm tra' : 'Điền thông tin để mở'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: AI Tutor */}
          <div
            onClick={() => handleCardClick('ai', 'AI ASSISTANT')}
            className={`group cursor-pointer relative bg-slate-800/80 hover:bg-slate-800 border-2 ${
              studentInfo ? 'border-fuchsia-500/40 hover:border-fuchsia-400' : 'border-slate-700 hover:border-amber-500/60'
            } rounded-3xl p-6 transition-all hover:-translate-y-1.5 shadow-xl hover:shadow-fuchsia-500/20 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-fuchsia-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🤖
                </div>
                {!studentInfo ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-amber-400" /> Khóa
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2 py-1 rounded-full">
                    ✓ Mở khóa
                  </span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-fuchsia-400 tracking-wider uppercase bg-fuchsia-500/20 px-2.5 py-0.5 rounded-full">
                  Phần 4
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-fuchsia-300 transition-colors">
                  AI ASSISTANT
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Trợ lý gia sư AI tiếng Anh thông minh: Giải thích ngữ pháp, đặt câu, tạo bài tập tự chọn.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-fuchsia-400 group-hover:text-fuchsia-300">
              <span>{studentInfo ? 'Hỏi đáp cùng AI' : 'Điền thông tin để mở'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Achievements & Certificate */}
          <div
            onClick={() => handleCardClick('achievements', 'BẢNG VÀNG THÀNH TÍCH')}
            className={`group cursor-pointer relative bg-slate-800/80 hover:bg-slate-800 border-2 ${
              studentInfo ? 'border-amber-500/50 hover:border-amber-400' : 'border-slate-700 hover:border-amber-500/60'
            } rounded-3xl p-6 transition-all hover:-translate-y-1.5 shadow-xl hover:shadow-amber-500/20 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                  🏆
                </div>
                {!studentInfo ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3 text-amber-400" /> Khóa
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-1 rounded-full">
                    ✓ Mở khóa
                  </span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase bg-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Phần 5
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 group-hover:text-amber-300 transition-colors">
                  THÀNH TÍCH 🏆
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Theo dõi điểm XP, cấp độ, huy chương đạt được và in Giấy Khen danh dự Pixar!
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
              <span>{studentInfo ? 'Xem thành tích' : 'Điền thông tin để mở'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

