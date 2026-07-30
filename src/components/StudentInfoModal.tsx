import React, { useState } from 'react';
import { StudentInfo } from '../types';
import { playClickSound, playWinSound } from '../utils/audio';
import { Sparkles, User, GraduationCap, School, X, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface StudentInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (info: StudentInfo) => void;
  targetTabName?: string;
}

export const StudentInfoModal: React.FC<StudentInfoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  targetTabName
}) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('9A1');
  const [school, setSchool] = useState('THCS Nguyễn Du');
  const [selectedAvatar, setSelectedAvatar] = useState('🧑‍🎓');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const avatars = ['🧑‍🎓', '👩‍🎓', '🚀', '🧑‍🔬', '👨‍🍳', '🧑‍✈️', '👩‍💻', '👨‍🎨'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của bạn!');
      return;
    }
    setError('');
    playWinSound();
    onSave({
      name: name.trim(),
      className: className.trim() || 'Lớp 9',
      school: school.trim() || 'Trường THCS',
      avatar: selectedAvatar
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-slate-100 overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={() => { playClickSound(); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-10"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Yêu cầu thông tin học sinh</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            ĐIỀN THÔNG TIN HỌC SINH 🚀
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            {targetTabName ? (
              <span>
                Vui lòng điền thông tin học sinh để mở khóa truy cập vào mục <strong className="text-amber-300">{targetTabName}</strong> và lưu kết quả học tập!
              </span>
            ) : (
              <span>
                Vui lòng hoàn tất thông tin cá nhân để bắt đầu trải nghiệm đầy đủ bài học, trò chơi và kiểm tra.
              </span>
            )}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold text-center animate-shake">
              ⚠️ {error}
            </div>
          )}

          {/* Avatar selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Chọn Biểu Tượng Avatar:
            </label>
            <div className="flex items-center justify-between gap-1.5 bg-slate-950/70 p-2 rounded-2xl border border-slate-800">
              {avatars.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => { playClickSound(); setSelectedAvatar(av); }}
                  className={`text-2xl p-2 rounded-xl transition-all ${
                    selectedAvatar === av
                      ? 'bg-amber-500 text-white scale-110 shadow-lg ring-2 ring-amber-300'
                      : 'hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Input Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Họ và Tên Học Sinh <span className="text-rose-400">*</span></span>
              <span className="text-[10px] text-amber-400">Bắt buộc</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* Grid Class & School */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-300">
                Lớp Học
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Ví dụ: 9A1"
                className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-amber-400 rounded-2xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-300">
                Trường THCS
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Ví dụ: THCS Nguyễn Du"
                className="w-full bg-slate-950/80 border-2 border-slate-700 focus:border-amber-400 rounded-2xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={playClickSound}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group border-b-4 border-orange-700 mt-2"
          >
            <ShieldCheck className="w-5 h-5 text-amber-200" />
            <span>XÁC NHẬN & MỞ KHÓA BÀI HỌC</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-[11px] text-center text-slate-500 font-medium pt-2 border-t border-slate-800">
          🔒 Thông tin của bạn được lưu an toàn trong trình duyệt để cá nhân hóa kết quả học tập.
        </p>
      </div>
    </div>
  );
};
