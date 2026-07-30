import React, { useState, useEffect } from 'react';
import { QuizQuestion, AssessmentResult } from '../types';
import { ASSESSMENT_QUESTIONS } from '../data/unit12Data';
import { speakWord, playClickSound, playCorrectSound, playWrongSound, playWinSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ClipboardList, CheckCircle2, XCircle, Trophy, Clock, Award, RotateCcw, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface AssessmentSectionProps {
  onEarnPoints?: (activityName: string, category: 'vocab' | 'game' | 'assessment' | 'ai' | 'daily', points: number, detail?: string) => void;
}

export const AssessmentSection: React.FC<AssessmentSectionProps> = ({ onEarnPoints }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Exam timer
  useEffect(() => {
    let timer: any;
    if (timerActive && !isSubmitted) {
      timer = setInterval(() => {
        setTimeSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, isSubmitted]);

  const handleSelectOption = (questionId: string, answer: string) => {
    if (isSubmitted) return;
    playClickSound();
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleTextAnswer = (questionId: string, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: answer.trim().toLowerCase() }));
  };

  const handleSubmit = () => {
    playClickSound();
    setTimerActive(false);

    let correct = 0;
    ASSESSMENT_QUESTIONS.forEach(q => {
      const userAns = userAnswers[q.id]?.toLowerCase().trim();
      const correctAns = Array.isArray(q.correctAnswer)
        ? q.correctAnswer.map(a => a.toLowerCase().trim())
        : q.correctAnswer.toLowerCase().trim();

      if (Array.isArray(correctAns)) {
        if (userAns && correctAns.includes(userAns)) correct++;
      } else {
        if (userAns === correctAns) correct++;
      }
    });

    const total = ASSESSMENT_QUESTIONS.length;
    const wrong = total - correct;
    const accuracy = Math.round((correct / total) * 100);
    const score = Math.round((correct / total) * 100);

    let badge: 'Bronze' | 'Silver' | 'Gold' | 'Career Master' = 'Bronze';
    if (accuracy >= 95) badge = 'Career Master';
    else if (accuracy >= 80) badge = 'Gold';
    else if (accuracy >= 50) badge = 'Silver';

    let rank = 'Học viên Triển vọng';
    if (accuracy >= 90) rank = 'Chuyên gia Hướng nghiệp (Rank #1)';
    else if (accuracy >= 75) rank = 'Thành thạo Nghề nghiệp (Rank #5)';
    else if (accuracy >= 50) rank = 'Tập sự Nghề nghiệp (Rank #12)';

    const res: AssessmentResult = {
      score,
      totalQuestions: total,
      correctCount: correct,
      wrongCount: wrong,
      accuracy,
      timeInSeconds: timeSeconds,
      rank,
      badge,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setResult(res);
    setIsSubmitted(true);
    playWinSound();

    if (onEarnPoints) {
      const earnedXp = Math.max(50, score * 5);
      onEarnPoints(
        `Hoàn thành Bài kiểm tra đánh giá`,
        'assessment',
        earnedXp,
        `Đạt ${correct}/${total} câu đúng (Chính xác ${accuracy}%, score:${score})`
      );
    }

    // Trigger confetti explosion!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleResetExam = () => {
    playClickSound();
    setUserAnswers({});
    setIsSubmitted(false);
    setTimeSeconds(0);
    setTimerActive(true);
    setResult(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <h2 className="text-2xl font-black text-white">3. ASSESSMENT (KỲ KIỂM TRA MINI)</h2>
          </div>
          <p className="text-xs text-slate-400">Đa dạng 10 dạng bài: Trắc nghiệm, Điền từ, Nghe, Đọc, True/False, Dialogue...</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-2 font-black text-amber-300 text-sm">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Thời gian: {formatTime(timeSeconds)}</span>
          </div>

          {isSubmitted && (
            <button
              onClick={handleResetExam}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài</span>
            </button>
          )}
        </div>
      </div>

      {/* ----------------- EXAM RESULT SUMMARY CARD ----------------- */}
      {isSubmitted && result && (
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <span className="text-6xl">
              {result.badge === 'Career Master' ? '🏆' : result.badge === 'Gold' ? '🥇' : result.badge === 'Silver' ? '🥈' : '🥉'}
            </span>
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400">
              KẾT QUẢ KỲ KIỂM TRA
            </h3>
            <div className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Huy Hiệu: {result.badge}
            </div>
          </div>

          {/* Grid Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">⭐ Điểm số</span>
              <p className="text-2xl font-black text-amber-400">{result.score} / 100</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">⭐ Số câu đúng</span>
              <p className="text-2xl font-black text-emerald-400">{result.correctCount} câu</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">⭐ Số câu sai</span>
              <p className="text-2xl font-black text-rose-400">{result.wrongCount} câu</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">⭐ Độ chính xác</span>
              <p className="text-2xl font-black text-sky-400">{result.accuracy}%</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">⭐ Thời gian</span>
              <p className="text-2xl font-black text-purple-400">{formatTime(result.timeInSeconds)}</p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 text-center">
            <span className="text-xs text-slate-400 font-bold">Xếp hạng của bạn: </span>
            <span className="text-sm font-black text-amber-300">{result.rank}</span>
          </div>
        </div>
      )}

      {/* ----------------- EXAM QUESTIONS LIST ----------------- */}
      <div className="space-y-6">
        {ASSESSMENT_QUESTIONS.map((q, idx) => {
          const isCorrect = isSubmitted && (
            userAnswers[q.id]?.toLowerCase().trim() ===
            (Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer).toLowerCase().trim()
          );

          return (
            <div
              key={q.id}
              className={`bg-slate-800/90 border-2 rounded-3xl p-6 shadow-xl space-y-4 ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-500/80 bg-emerald-950/20'
                    : 'border-rose-500/80 bg-rose-950/20'
                  : 'border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                    {q.partName}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1.5">
                    Câu {idx + 1}: {q.question}
                  </h3>
                </div>

                {/* Listening Audio Button */}
                {q.type === 'listening' && q.audioText && (
                  <button
                    onClick={() => { playClickSound(); speakWord(q.audioText!); }}
                    className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe câu hỏi</span>
                  </button>
                )}
              </div>

              {/* Multiple Choice / Options */}
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    const isSelected = userAnswers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(q.id, opt)}
                        disabled={isSubmitted}
                        className={`p-3.5 rounded-2xl border text-left text-sm font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-300 shadow-md'
                            : 'bg-slate-900/80 text-slate-200 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Fill in the Blank Text Input */}
              {q.type === 'blank' && (
                <div>
                  <input
                    type="text"
                    disabled={isSubmitted}
                    placeholder="Nhập câu trả lời của bạn..."
                    onChange={(e) => handleTextAnswer(q.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              )}

              {/* Explanation upon submission */}
              {isSubmitted && (
                <div className="mt-2 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 text-xs space-y-1">
                  <span className="font-bold text-amber-300">
                    Đáp án đúng: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer}
                  </span>
                  <p className="text-slate-300">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 text-white font-black text-lg uppercase tracking-wider rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all border-b-4 border-purple-800"
          >
            NỘP BÀI KIỂM TRA
          </button>
        </div>
      )}
    </div>
  );
};
