import React, { useState, useEffect } from 'react';
import { StudentInfo, StudentProgress } from './types';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { VocabularySection } from './components/VocabularySection';
import { GamesSection } from './components/GamesSection';
import { AssessmentSection } from './components/AssessmentSection';
import { AIAssistantSection } from './components/AIAssistantSection';
import { AchievementsSection } from './components/AchievementsSection';
import { StudentInfoModal } from './components/StudentInfoModal';
import { loadProgress, saveProgress, addPointsToProgress } from './utils/progress';
import { playWinSound } from './utils/audio';
import confetti from 'canvas-confetti';

export default function App() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(() => {
    try {
      const saved = localStorage.getItem('career_adventure_student');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [progress, setProgress] = useState<StudentProgress>(() => {
    return loadProgress(studentInfo?.name);
  });

  const [activeTab, setActiveTab] = useState<'home' | 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements'>('home');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [pendingTarget, setPendingTarget] = useState<{ tab: 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements'; label: string } | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; points: number; show: boolean } | null>(null);

  // Sync progress when studentInfo name changes
  useEffect(() => {
    if (studentInfo?.name) {
      const loaded = loadProgress(studentInfo.name);
      setProgress(loaded);
    }
  }, [studentInfo?.name]);

  // Guard against navigating directly without student info
  useEffect(() => {
    if (activeTab !== 'home' && !studentInfo) {
      setActiveTab('home');
      setIsInfoModalOpen(true);
    }
  }, [activeTab, studentInfo]);

  const handleEarnPoints = (
    activityName: string,
    category: 'vocab' | 'game' | 'assessment' | 'ai' | 'daily',
    points: number,
    detail?: string
  ) => {
    if (!studentInfo?.name) return;

    const { updatedProgress, newlyUnlockedBadges } = addPointsToProgress(
      progress,
      activityName,
      category,
      points,
      detail
    );

    setProgress(updatedProgress);
    saveProgress(studentInfo.name, updatedProgress);

    // Show Toast
    setToast({
      message: activityName,
      points,
      show: true,
    });

    setTimeout(() => {
      setToast(null);
    }, 3500);

    // If new badge unlocked, trigger celebration sound and confetti
    if (newlyUnlockedBadges.length > 0) {
      playWinSound();
      try {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    }
  };

  const handleSaveStudentInfo = (info: StudentInfo) => {
    setStudentInfo(info);
    try {
      localStorage.setItem('career_adventure_student', JSON.stringify(info));
    } catch (e) {}

    const loaded = loadProgress(info.name);
    setProgress(loaded);

    // Navigate to pending tab if requested, else default to 'vocab'
    if (pendingTarget) {
      setActiveTab(pendingTarget.tab);
      setPendingTarget(null);
    }
  };

  const handleRequireStudentInfo = (tab: 'vocab' | 'games' | 'assessment' | 'ai' | 'achievements', label: string) => {
    if (!studentInfo) {
      setPendingTarget({ tab, label });
      setIsInfoModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleEditStudent = () => {
    setActiveTab('home');
    setIsInfoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Floating Toast Notification for Points Earned */}
      {toast && toast.show && (
        <div className="fixed top-16 right-4 z-[100] bg-slate-900/95 border-2 border-amber-400 text-white px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-bounce">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center font-black text-slate-950 text-sm">
            ⚡
          </div>
          <div>
            <div className="text-xs font-black text-amber-300">
              +{toast.points} XP THƯỞNG!
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              {toast.message}
            </div>
          </div>
        </div>
      )}

      {/* Pixar Glowing Header Navbar */}
      <Header
        studentInfo={studentInfo}
        progress={progress}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab !== 'home' && !studentInfo) {
            handleRequireStudentInfo(tab, 'Bài học');
          } else {
            setActiveTab(tab);
          }
        }}
        onEditStudent={handleEditStudent}
        onRequireStudentInfo={handleRequireStudentInfo}
      />

      {/* Student Registration Modal */}
      <StudentInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        onSave={(info) => {
          handleSaveStudentInfo(info);
          setIsInfoModalOpen(false);
        }}
        targetTabName={pendingTarget?.label}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 pb-12">
        {activeTab === 'home' && (
          <HomeHero
            studentInfo={studentInfo}
            onSaveStudentInfo={(info) => {
              handleSaveStudentInfo(info);
              if (!pendingTarget) {
                setActiveTab('vocab');
              }
            }}
            onStartModule={(tab) => {
              if (!studentInfo) {
                handleRequireStudentInfo(tab, 'Bài học');
              } else {
                setActiveTab(tab);
              }
            }}
            onRequireStudentInfo={handleRequireStudentInfo}
          />
        )}

        {activeTab === 'vocab' && studentInfo && (
          <VocabularySection onEarnPoints={handleEarnPoints} />
        )}

        {activeTab === 'games' && studentInfo && (
          <GamesSection onEarnPoints={handleEarnPoints} />
        )}

        {activeTab === 'assessment' && studentInfo && (
          <AssessmentSection onEarnPoints={handleEarnPoints} />
        )}

        {activeTab === 'ai' && studentInfo && (
          <AIAssistantSection studentInfo={studentInfo} onEarnPoints={handleEarnPoints} />
        )}

        {activeTab === 'achievements' && studentInfo && (
          <AchievementsSection
            studentInfo={studentInfo}
            progress={progress}
            onRequireStudentInfo={handleRequireStudentInfo}
          />
        )}
      </main>

      {/* Pixar Style Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-extrabold text-slate-200">CAREER ADVENTURE • Unit 12: Career Choices</span>
          </div>
          <p className="text-slate-500">
            Ứng dụng Học tập Tiếng Anh Lớp 9 Phong cách 3D Pixar • Đầy đủ Flashcards, 9 Games & Trợ lý Gia sư AI
          </p>
        </div>
      </footer>
    </div>
  );
}

