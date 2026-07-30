import React, { useState, useEffect } from 'react';
import { GameStats } from '../types';
import { UNIT12_VOCAB, WORKPLACE_MAPPING } from '../data/unit12Data';
import { speakWord, playClickSound, playCorrectSound, playWrongSound, playWinSound, playWhackSound, playSpinSound } from '../utils/audio';
import { Gamepad2, Trophy, Star, Lock, CheckCircle2, RotateCcw, ArrowLeft, ArrowRight, Play, Award, Zap, Flame, Key, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';

interface GamesSectionProps {
  onEarnPoints?: (activityName: string, category: 'vocab' | 'game' | 'assessment' | 'ai' | 'daily', points: number, detail?: string) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onEarnPoints }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Game Stats & High Scores
  const [gameStats, setGameStats] = useState<GameStats>({
    unlockedGates: 1,
    totalStars: 12,
    gameHighScores: {
      quest: 0,
      whack: 0,
      guess: 0,
      factory: 0,
      sort: 0,
      wheel: 0,
      flip: 0,
      escape: 0,
      boss: 0
    },
    badgesEarned: ['Career Rookie']
  });

  // GAME 1: QUEST STATE
  const [questGate, setQuestGate] = useState<1 | 2 | 3>(1);
  const [questStep, setQuestStep] = useState(0);

  // GAME 2: WHACK-A-MOLE STATE
  const [whackScore, setWhackScore] = useState(0);
  const [whackLives, setWhackLives] = useState(3);
  const [whackCombo, setWhackCombo] = useState(0);
  const [whackTimeLeft, setWhackTimeLeft] = useState(30);
  const [whackIsPlaying, setWhackIsPlaying] = useState(false);
  const [moles, setMoles] = useState<{ id: number; text: string; isJob: boolean; active: boolean; emoji: string }[]>([]);

  // GAME 3: GUESS THE JOB STATE
  const [guessIndex, setGuessIndex] = useState(0);
  const [guessSelected, setGuessSelected] = useState<string | null>(null);
  const [guessShowPopup, setGuessShowPopup] = useState(false);

  // GAME 4: FACTORY CONVEYOR STATE
  const [factoryStep, setFactoryStep] = useState(0);
  const [factorySelectedWorkplace, setFactorySelectedWorkplace] = useState<string | null>(null);
  const [factoryScore, setFactoryScore] = useState(0);

  // GAME 5: DRAG & SORT STATE
  const [sortJobs, setSortJobs] = useState<{ id: string; name: string; workplace: string; emoji: string; sorted: boolean }[]>([
    { id: '1', name: 'Doctor', workplace: 'Hospital', emoji: '🩺', sorted: false },
    { id: '2', name: 'Pilot', workplace: 'Airport', emoji: '🧑‍✈️', sorted: false },
    { id: '3', name: 'Teacher', workplace: 'School', emoji: '📖', sorted: false },
    { id: '4', name: 'Garment Worker', workplace: 'Factory', emoji: '🧵', sorted: false },
    { id: '5', name: 'Software Engineer', workplace: 'Office', emoji: '💻', sorted: false },
    { id: '6', name: 'Chef', workplace: 'Restaurant', emoji: '👨‍🍳', sorted: false },
  ]);

  // GAME 6: SPIN THE WHEEL STATE
  const [wheelDegree, setWheelDegree] = useState(0);
  const [wheelIsSpinning, setWheelIsSpinning] = useState(false);
  const [wheelLandedJob, setWheelLandedJob] = useState<any>(null);

  // GAME 8: ESCAPE ROOM STATE
  const [escapeKeys, setEscapeKeys] = useState(0);
  const [escapeQIndex, setEscapeQIndex] = useState(0);

  // GAME 9: BOSS CHALLENGE STATE
  const [bossScore, setBossScore] = useState(0);
  const [bossTimeLeft, setBossTimeLeft] = useState(30);
  const [bossIsPlaying, setBossIsPlaying] = useState(false);
  const [bossCurrentQ, setBossCurrentQ] = useState<any>(null);

  // Whack-a-mole timer effect
  useEffect(() => {
    let timer: any;
    if (whackIsPlaying && whackTimeLeft > 0 && whackLives > 0) {
      timer = setInterval(() => {
        setWhackTimeLeft(prev => {
          if (prev <= 1) {
            setWhackIsPlaying(false);
            playWinSound();
            if (onEarnPoints && whackScore > 0) {
              onEarnPoints('Thử thách Whack-a-Mole', 'game', Math.max(30, whackScore * 10), `Đạt ${whackScore} điểm trong Whack-a-Mole!`);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [whackIsPlaying, whackTimeLeft, whackLives]);

  // Moles spawning logic
  useEffect(() => {
    let moleTimer: any;
    if (whackIsPlaying) {
      moleTimer = setInterval(() => {
        const pool = [
          { text: 'Doctor', isJob: true, emoji: '🩺' },
          { text: 'Garment Worker', isJob: true, emoji: '🧵' },
          { text: 'Chef', isJob: true, emoji: '👨‍🍳' },
          { text: 'Apple 🍎', isJob: false, emoji: '🍎' },
          { text: 'Tiger 🐯', isJob: false, emoji: '🐯' },
          { text: 'Architect', isJob: true, emoji: '🏛️' },
          { text: 'Pizza 🍕', isJob: false, emoji: '🍕' },
          { text: 'Pilot', isJob: true, emoji: '🧑‍✈️' },
          { text: 'Bicycle 🚲', isJob: false, emoji: '🚲' }
        ];

        const newMoles = Array.from({ length: 6 }).map((_, i) => {
          const item = pool[Math.floor(Math.random() * pool.length)];
          return { id: i, ...item, active: Math.random() > 0.4 };
        });
        setMoles(newMoles);
      }, 1200);
    }
    return () => clearInterval(moleTimer);
  }, [whackIsPlaying]);

  // Start Whack a mole
  const startWhackGame = () => {
    playClickSound();
    setWhackScore(0);
    setWhackLives(3);
    setWhackCombo(0);
    setWhackTimeLeft(30);
    setWhackIsPlaying(true);
  };

  const handleWhackMole = (mole: any) => {
    if (!whackIsPlaying || !mole.active) return;

    if (mole.isJob) {
      playWhackSound();
      setWhackScore(prev => prev + 100 * (whackCombo + 1));
      setWhackCombo(prev => prev + 1);
    } else {
      playWrongSound();
      setWhackCombo(0);
      setWhackLives(prev => {
        const next = prev - 1;
        if (next <= 0) setWhackIsPlaying(false);
        return next;
      });
    }
    setMoles(prev => prev.map(m => m.id === mole.id ? { ...m, active: false } : m));
  };

  // Spin the wheel handler
  const spinWheel = () => {
    if (wheelIsSpinning) return;
    setWheelIsSpinning(true);
    playSpinSound();

    const randomRotation = 1440 + Math.floor(Math.random() * 360);
    setWheelDegree(prev => prev + randomRotation);

    setTimeout(() => {
      setWheelIsSpinning(false);
      const chosen = UNIT12_VOCAB[Math.floor(Math.random() * UNIT12_VOCAB.length)];
      setWheelLandedJob(chosen);
      playWinSound();
      speakWord(chosen.word);
    }, 3000);
  };

  // Start Boss challenge
  const startBossGame = () => {
    playClickSound();
    setBossScore(0);
    setBossTimeLeft(30);
    setBossIsPlaying(true);
    loadNextBossQ();
  };

  const loadNextBossQ = () => {
    const qList = [
      { audioPrompt: "I work in a hospital and examine sick patients.", options: ["Doctor", "Chef", "Pilot", "Garment Worker"], answer: "Doctor" },
      { audioPrompt: "I mix delicious drinks and mocktails at a bar.", options: ["Bartender", "Architect", "Electrician", "Teacher"], answer: "Bartender" },
      { audioPrompt: "I fly airplanes safely from airport to airport.", options: ["Pilot", "Mechanic", "Tour Guide", "Librarian"], answer: "Pilot" },
      { audioPrompt: "I design blueprints for modern buildings and skyscrapers.", options: ["Architect", "Chef", "Nurse", "Garment Worker"], answer: "Architect" },
    ];
    const picked = qList[Math.floor(Math.random() * qList.length)];
    setBossCurrentQ(picked);
    speakWord(picked.audioPrompt);
  };

  const handleBossAnswer = (opt: string) => {
    if (!bossIsPlaying || !bossCurrentQ) return;
    if (opt === bossCurrentQ.answer) {
      playCorrectSound();
      setBossScore(prev => prev + 100);
      loadNextBossQ();
    } else {
      playWrongSound();
    }
  };

  // Boss challenge countdown timer
  useEffect(() => {
    let timer: any;
    if (bossIsPlaying && bossTimeLeft > 0) {
      timer = setInterval(() => {
        setBossTimeLeft(prev => {
          if (prev <= 1) {
            setBossIsPlaying(false);
            playWinSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [bossIsPlaying, bossTimeLeft]);

  // List of 9 Adventure Games
  const gamesList = [
    { id: 'quest', name: 'Game 1: Career Adventure Quest', desc: 'Vượt qua 3 cánh cổng thử thách điền từ, kéo thả & trắc nghiệm', emoji: '🎯', color: 'from-amber-400 to-orange-500' },
    { id: 'whack', name: 'Game 2: Whack-a-Mole', desc: 'Đập chuột mang tên nghề nghiệp, né tránh đồ ăn & động vật', emoji: '🔨', color: 'from-emerald-400 to-teal-600' },
    { id: 'guess', name: 'Game 3: Guess the Job', desc: 'Đọc 3 mô tả manh mối và chọn tên nghề nghiệp chính xác', emoji: '🎲', color: 'from-sky-400 to-blue-600' },
    { id: 'factory', name: 'Game 4: Career Match Factory', desc: 'Băng chuyền nhà máy chạy liên tục: Ghép Ảnh ➔ Tên Nghề ➔ Nơi làm việc', emoji: '🏭', color: 'from-purple-400 to-indigo-600' },
    { id: 'sort', name: 'Game 5: Drag & Sort', desc: 'Phân loại nghề nghiệp vào đúng 6 thùng nơi làm việc tương ứng', emoji: '🧩', color: 'from-pink-400 to-rose-600' },
    { id: 'wheel', name: 'Game 6: Spin the Career Wheel', desc: 'Vòng quay ngẫu nhiên thử thách phát âm, đọc mô tả & chọn workplace', emoji: '🎡', color: 'from-yellow-400 to-amber-600' },
    { id: 'flip', name: 'Game 7: Memory Flip', desc: 'Lật mở thẻ bài tìm cặp hình ảnh và tên nghề nghiệp', emoji: '🧠', color: 'from-cyan-400 to-blue-600' },
    { id: 'escape', name: 'Game 8: Career Escape Room', desc: 'Trả lời đúng 5 câu hỏi thu thập 5 chìa khóa mở cửa phòng thoát hiểm', emoji: '🚀', color: 'from-fuchsia-400 to-purple-600' },
    { id: 'boss', name: 'Game 9: Boss Challenge', desc: 'Thử thách tốc độ! Nghe AI đọc gợi ý và chọn nghề dưới 30 giây', emoji: '🏆', color: 'from-red-500 to-rose-600' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <h2 className="text-2xl font-black text-white">2. ADVENTURE GAMES</h2>
          </div>
          <p className="text-xs text-slate-400">9 Trò chơi thử thách kiến thức Unit 12 Career Choices</p>
        </div>

        {activeGame && (
          <button
            onClick={() => { playClickSound(); setActiveGame(null); }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về Bản đồ</span>
          </button>
        )}
      </div>

      {/* ----------------- ADVENTURE MAP VIEW (SELECT GAME) ----------------- */}
      {!activeGame && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-amber-300 uppercase tracking-wider">
              🗺️ MAP PHIÊU LƯU 3D PIXAR
            </h3>
            <p className="text-xs text-slate-400">Chọn một trò chơi bên dưới để chinh phục và ghi điểm cao!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gamesList.map((g, idx) => (
              <div
                key={g.id}
                onClick={() => { playClickSound(); setActiveGame(g.id); }}
                className="group cursor-pointer relative bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-400 rounded-3xl p-5 transition-all hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${g.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {g.emoji}
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-500/40">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>3/3 Stars</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      {g.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {g.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Chơi game ngay</span>
                  <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- GAME 1: CAREER ADVENTURE QUEST ----------------- */}
      {activeGame === 'quest' && (
        <div className="bg-slate-800/90 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Game 1</span>
              <h3 className="text-2xl font-black text-white">🎯 Career Adventure Quest</h3>
            </div>
            {/* 3 Gates Indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((g) => (
                <div
                  key={g}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1 border ${
                    questGate >= g
                      ? 'bg-amber-500 text-white border-amber-300'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  {questGate >= g ? <ShieldCheck className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>Gate {g}</span>
                </div>
              ))}
            </div>
          </div>

          {questGate === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-sky-300">Cánh Cổng 1: Fill in the Blank</h4>
              <p className="text-sm text-slate-200">
                "An <strong className="text-amber-300">__________</strong> designs architectural blueprints for modern high-rise buildings."
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['architect', 'electrician', 'bartender', 'garment worker'].map((ans) => (
                  <button
                    key={ans}
                    onClick={() => {
                      if (ans === 'architect') {
                        playCorrectSound();
                        setQuestGate(2);
                      } else {
                        playWrongSound();
                      }
                    }}
                    className="p-3 bg-slate-900 hover:bg-amber-500/20 hover:border-amber-400 border border-slate-700 rounded-xl text-sm font-bold text-white capitalize"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          )}

          {questGate === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-lg font-bold text-emerald-300">Cánh Cổng 2: Drag & Drop / Match</h4>
              <p className="text-sm text-slate-200">Where does a <strong className="text-amber-300">Flight Attendant</strong> work?</p>
              <div className="grid grid-cols-2 gap-3">
                {['Hospital', 'Airport & Plane', 'Factory', 'Restaurant'].map((ans) => (
                  <button
                    key={ans}
                    onClick={() => {
                      if (ans === 'Airport & Plane') {
                        playCorrectSound();
                        setQuestGate(3);
                      } else {
                        playWrongSound();
                      }
                    }}
                    className="p-3 bg-slate-900 hover:bg-emerald-500/20 hover:border-emerald-400 border border-slate-700 rounded-xl text-sm font-bold text-white"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          )}

          {questGate === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-lg font-bold text-pink-300">Cánh Cổng 3: Multiple Choice</h4>
              <p className="text-sm text-slate-200">
                Which phrase means "thuộc về dạy nghề, hướng nghiệp"?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Theoretical', 'Vocational training', 'Job prospect', 'Qualification'].map((ans) => (
                  <button
                    key={ans}
                    onClick={() => {
                      if (ans === 'Vocational training') {
                        playWinSound();
                        alert('Chúc mừng bạn đã hoàn thành tất cả 3 cánh cổng của Quest!');
                      } else {
                        playWrongSound();
                      }
                    }}
                    className="p-3 bg-slate-900 hover:bg-pink-500/20 hover:border-pink-400 border border-slate-700 rounded-xl text-sm font-bold text-white"
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- GAME 2: WHACK-A-MOLE ----------------- */}
      {activeGame === 'whack' && (
        <div className="bg-slate-800/90 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-700 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Game 2</span>
              <h3 className="text-2xl font-black text-white">🔨 Whack-a-Mole (Đập Chuột Nghề Nghiệp)</h3>
            </div>

            <div className="flex items-center gap-4 text-sm font-black">
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-amber-300">
                ⭐ Score: {whackScore}
              </div>
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-rose-400">
                ❤️ Lives: {whackLives}
              </div>
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-sky-400">
                ⏱️ Time: {whackTimeLeft}s
              </div>
            </div>
          </div>

          {!whackIsPlaying ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-6xl animate-bounce">🐹🔨</div>
              <h4 className="text-xl font-extrabold text-white">Nhiệm vụ của bạn:</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Đập chú chuột mang tên <strong className="text-emerald-300">Nghề nghiệp</strong>! Không được đập Động vật, Đồ ăn hoặc Đồ vật!
              </p>
              <button
                onClick={startWhackGame}
                className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-black text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                BẮT ĐẦU CHƠI
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 min-h-[280px]">
              {moles.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleWhackMole(m)}
                  className={`min-h-[100px] rounded-2xl border-4 flex flex-col items-center justify-center p-3 transition-all duration-200 transform ${
                    m.active
                      ? 'bg-gradient-to-b from-amber-400 to-amber-600 border-amber-200 text-slate-900 scale-102 shadow-2xl cursor-pointer'
                      : 'bg-slate-900/60 border-slate-800 text-slate-700'
                  }`}
                >
                  {m.active ? (
                    <>
                      <span className="text-3xl">{m.emoji}</span>
                      <span className="font-black text-xs mt-1">{m.text}</span>
                    </>
                  ) : (
                    <span className="text-2xl text-slate-700">🕳️</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ----------------- GAME 3: GUESS THE JOB ----------------- */}
      {activeGame === 'guess' && (
        <div className="bg-slate-800/90 border-2 border-sky-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Game 3</span>
            <h3 className="text-2xl font-black text-white">🎲 Guess the Job (Đoán Nghề Qua Gợi Ý)</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-extrabold text-amber-300 uppercase">3 Manh mối gợi ý:</span>
              <ul className="text-sm text-slate-200 space-y-1 list-disc list-inside">
                <li>I wear a white coat and work in a large hospital.</li>
                <li>I examine sick people and prescribe medicines.</li>
                <li>I use a stethoscope to listen to patient heartbeats.</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['Doctor', 'Pilot', 'Garment Worker', 'Architect'].map((ans) => (
                <button
                  key={ans}
                  onClick={() => {
                    if (ans === 'Doctor') {
                      playCorrectSound();
                      setGuessShowPopup(true);
                    } else {
                      playWrongSound();
                    }
                  }}
                  className="p-4 bg-slate-900 hover:bg-sky-500/20 hover:border-sky-400 border border-slate-700 rounded-2xl text-base font-bold text-white capitalize"
                >
                  {ans}
                </button>
              ))}
            </div>

            {guessShowPopup && (
              <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-3xl p-6 text-center space-y-3 animate-fade-in">
                <span className="text-5xl">🩺👨‍⚕️</span>
                <h4 className="text-xl font-black text-emerald-300">ĐÁP ÁN CHÍNH XÁC: DOCTOR (BÁC SĨ)</h4>
                <p className="text-xs text-slate-300">Doctor làm việc ở Hospital và chăm sóc bệnh nhân!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- GAME 4: CAREER MATCH FACTORY ----------------- */}
      {activeGame === 'factory' && (
        <div className="bg-slate-800/90 border-2 border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Game 4</span>
            <h3 className="text-2xl font-black text-white">🏭 Career Match Factory (Băng Chuyền Nhà Máy)</h3>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-700 text-center space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase">Thẻ đang chạy trên băng chuyền:</span>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-2xl text-white font-black text-xl shadow-xl animate-pulse">
                <span>👨‍🍳 CHEF (ĐẦU BẾP)</span>
              </div>
              <p className="text-xs text-slate-300">Chọn Nơi Làm Việc (Workplace) thích hợp cho Chef:</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Restaurant', 'Hospital', 'Airport', 'School'].map((wp) => (
                  <button
                    key={wp}
                    onClick={() => {
                      if (wp === 'Restaurant') {
                        playWinSound();
                        alert('Chính xác! Chef làm việc ở Restaurant! +100 Points');
                      } else {
                        playWrongSound();
                      }
                    }}
                    className="p-3.5 bg-slate-800 hover:bg-purple-500/20 border border-slate-700 hover:border-purple-400 rounded-2xl text-sm font-bold text-white"
                  >
                    {wp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- GAME 5: DRAG & SORT ----------------- */}
      {activeGame === 'sort' && (
        <div className="bg-slate-800/90 border-2 border-pink-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Game 5</span>
            <h3 className="text-2xl font-black text-white">🧩 Drag & Sort (Phân Loại Nghề Nghiệp)</h3>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-slate-300">Nhấp vào thẻ Nghề Nghiệp bên dưới để đưa vào đúng Thùng Nơi Làm Việc!</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sortJobs.map((j) => (
                <button
                  key={j.id}
                  onClick={() => {
                    playCorrectSound();
                    setSortJobs(prev => prev.map(item => item.id === j.id ? { ...item, sorted: true } : item));
                  }}
                  className={`p-3 rounded-2xl border flex items-center gap-2 font-bold text-xs transition-all ${
                    j.sorted
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 line-through opacity-60'
                      : 'bg-slate-900 border-slate-700 text-white hover:border-pink-400'
                  }`}
                >
                  <span className="text-xl">{j.emoji}</span>
                  <span>{j.name} ➔ {j.workplace}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- GAME 6: SPIN THE WHEEL ----------------- */}
      {activeGame === 'wheel' && (
        <div className="bg-slate-800/90 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-6 text-center">
          <div className="border-b border-slate-700 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Game 6</span>
            <h3 className="text-2xl font-black text-white">🎡 Spin the Career Wheel (Vòng Quay may mắn)</h3>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <div
              className="w-56 h-56 rounded-full border-8 border-amber-400 bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 shadow-2xl flex items-center justify-center text-4xl text-white font-black transition-all duration-3000 ease-out"
              style={{ transform: `rotate(${wheelDegree}deg)` }}
            >
              🎡
            </div>

            <button
              onClick={spinWheel}
              disabled={wheelIsSpinning}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-black text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              {wheelIsSpinning ? 'Đang quay...' : 'QUAY VÒNG QUAY'}
            </button>

            {wheelLandedJob && (
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 max-w-md w-full space-y-2 animate-bounce">
                <span className="text-3xl">{wheelLandedJob.emoji}</span>
                <h4 className="text-xl font-black text-amber-300 capitalize">{wheelLandedJob.word}</h4>
                <p className="text-xs text-slate-300 font-semibold">{wheelLandedJob.meaning}</p>
                <button
                  onClick={() => speakWord(wheelLandedJob.word)}
                  className="px-3 py-1 bg-sky-500 text-white rounded-lg text-xs font-bold"
                >
                  🔊 Listen Pronunciation
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- GAME 8: CAREER ESCAPE ROOM ----------------- */}
      {activeGame === 'escape' && (
        <div className="bg-slate-800/90 border-2 border-fuchsia-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest">Game 8</span>
              <h3 className="text-2xl font-black text-white">🚀 Career Escape Room</h3>
            </div>
            <div className="flex items-center gap-1 bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-xl text-xs font-bold border border-fuchsia-500/40">
              <Key className="w-4 h-4 text-amber-400" />
              <span>{escapeKeys} / 5 Golden Keys</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-white">Mở Khóa Cánh Cửa Escape Room:</h4>
              <p className="text-xs text-slate-300">
                "Nick prefers taking a <strong className="text-amber-300">__________</strong> course to studying pure theory."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['vocational', 'theoretical', 'qualification', 'prospect'].map((ans) => (
                <button
                  key={ans}
                  onClick={() => {
                    if (ans === 'vocational') {
                      playWinSound();
                      setEscapeKeys(prev => Math.min(5, prev + 1));
                    } else {
                      playWrongSound();
                    }
                  }}
                  className="p-3 bg-slate-900 hover:bg-fuchsia-500/20 border border-slate-700 hover:border-fuchsia-400 rounded-2xl text-sm font-bold text-white capitalize"
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- GAME 9: BOSS CHALLENGE ----------------- */}
      {activeGame === 'boss' && (
        <div className="bg-slate-800/90 border-2 border-red-500/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Game 9</span>
              <h3 className="text-2xl font-black text-white">🏆 Boss Challenge (Thử Thách Tốc Độ)</h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-black">
              <span className="bg-slate-900 px-3 py-1 rounded-xl text-amber-300 border border-slate-700">
                Score: {bossScore}
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-xl text-rose-400 border border-slate-700">
                Time: {bossTimeLeft}s
              </span>
            </div>
          </div>

          {!bossIsPlaying ? (
            <div className="text-center py-6 space-y-4">
              <div className="text-6xl animate-bounce">🤖⚡</div>
              <h4 className="text-xl font-extrabold text-white">Thử Thách Nghe & Chọn Nghề Siêu Tốc!</h4>
              <button
                onClick={startBossGame}
                className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-black text-sm rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                BẮT ĐẦU BOSS CHALLENGE
              </button>
            </div>
          ) : (
            bossCurrentQ && (
              <div className="space-y-4">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-red-400 uppercase">AI Audio Prompt:</span>
                    <p className="text-sm font-bold text-white mt-1">"{bossCurrentQ.audioPrompt}"</p>
                  </div>
                  <button
                    onClick={() => speakWord(bossCurrentQ.audioPrompt)}
                    className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {bossCurrentQ.options.map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => handleBossAnswer(opt)}
                      className="p-4 bg-slate-900 hover:bg-red-500/20 border border-slate-700 hover:border-red-400 rounded-2xl text-base font-bold text-white"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
