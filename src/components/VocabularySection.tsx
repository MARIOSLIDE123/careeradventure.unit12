import React, { useState } from 'react';
import { VocabItem } from '../types';
import { UNIT12_VOCAB } from '../data/unit12Data';
import { speakWord, playClickSound, playCorrectSound, playWinSound } from '../utils/audio';
import { Volume2, Heart, Bookmark, RotateCcw, Search, Filter, Layers, Brain, List, ChevronLeft, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';

interface VocabularySectionProps {
  onEarnPoints?: (activityName: string, category: 'vocab' | 'game' | 'assessment' | 'ai' | 'daily', points: number, detail?: string) => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({ onEarnPoints }) => {
  const [vocabList, setVocabList] = useState<VocabItem[]>(UNIT12_VOCAB);
  const [activeSubTab, setActiveSubTab] = useState<'cards' | 'flashcards' | 'memory' | 'list'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'favorite' | 'saved'>('all');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Memory game state
  const [memoryCards, setMemoryCards] = useState<{ id: string; content: string; type: 'word' | 'meaning'; isFlipped: boolean; isMatched: boolean; pairId: string }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    playClickSound();
    setVocabList(prev => prev.map(item => {
      if (item.id === id) {
        const updatedFav = !item.isFavorite;
        if (updatedFav && onEarnPoints) {
          onEarnPoints(`Yêu thích từ: ${item.word}`, 'vocab', 15, `Đã đánh dấu yêu thích từ vựng ${item.word}`);
        }
        return { ...item, isFavorite: updatedFav };
      }
      return item;
    }));
  };

  // Toggle saved
  const toggleSaved = (id: string) => {
    playClickSound();
    setVocabList(prev => prev.map(item => item.id === id ? { ...item, isSaved: !item.isSaved } : item));
  };

  // Filter items
  const filteredVocab = vocabList.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'favorite') return matchesSearch && item.isFavorite;
    if (filterType === 'saved') return matchesSearch && item.isSaved;
    return matchesSearch;
  });

  // Init Memory game
  const initMemoryGame = () => {
    playClickSound();
    // Select 6 random vocab items
    const sampled = [...UNIT12_VOCAB].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cards: any[] = [];
    sampled.forEach(item => {
      cards.push({ id: `w-${item.id}`, content: `${item.emoji} ${item.word}`, type: 'word', isFlipped: false, isMatched: false, pairId: item.id });
      cards.push({ id: `m-${item.id}`, content: item.meaning, type: 'meaning', isFlipped: false, isMatched: false, pairId: item.id });
    });
    setMemoryCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchedPairsCount(0);
  };

  const handleMemoryCardClick = (index: number) => {
    if (selectedCards.length >= 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    playClickSound();
    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const idx1 = newSelected[0];
      const idx2 = newSelected[1];
      if (memoryCards[idx1].pairId === memoryCards[idx2].pairId) {
        // Match!
        playCorrectSound();
        setTimeout(() => {
          setMemoryCards(prev => prev.map((card, i) => i === idx1 || i === idx2 ? { ...card, isMatched: true } : card));
          setSelectedCards([]);
          setMatchedPairsCount(prev => {
            const count = prev + 1;
            if (count === 6) {
              playWinSound();
              if (onEarnPoints) {
                onEarnPoints('Thắng Memory Match từ vựng', 'vocab', 50, 'Ghép đúng 6 cặp từ vựng Unit 12!');
              }
            }
            return count;
          });
        }, 500);
      } else {
        // Mis-match
        setTimeout(() => {
          setMemoryCards(prev => prev.map((card, i) => i === idx1 || i === idx2 ? { ...card, isFlipped: false } : card));
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  React.useEffect(() => {
    if (activeSubTab === 'memory' && memoryCards.length === 0) {
      initMemoryGame();
    }
  }, [activeSubTab]);

  return (
    <div className="space-y-6 pb-12">
      {/* Sub Header & Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h2 className="text-2xl font-black text-white">1. LEARN VOCABULARY</h2>
          </div>
          <p className="text-xs text-slate-400">Unit 12: Career Choices • 18 Từ vựng quan trọng</p>
        </div>

        {/* Sub Navigation Modes */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => { playClickSound(); setActiveSubTab('cards'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'cards' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Thẻ Từ 3D</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveSubTab('flashcards'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'flashcards' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveSubTab('memory'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'memory' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Memory Game</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveSubTab('list'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'list' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Danh Sách</span>
          </button>
        </div>
      </div>

      {/* ----------------- SUB TAB 1: 3D VOCABULARY CARDS ----------------- */}
      {activeSubTab === 'cards' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm từ vựng hoặc nghĩa tiếng Việt..."
                className="w-full bg-slate-800/80 border border-slate-700/80 focus:border-sky-400 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  filterType === 'all'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}
              >
                Tất cả ({vocabList.length})
              </button>
              <button
                onClick={() => setFilterType('favorite')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  filterType === 'favorite'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                <span>Yêu thích</span>
              </button>
              <button
                onClick={() => setFilterType('saved')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                  filterType === 'saved'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Đã lưu</span>
              </button>
            </div>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                className="relative bg-slate-800/90 border-2 border-slate-700/80 hover:border-sky-400/80 rounded-3xl p-5 shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                {/* Card Top: Emoji & Category */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item['3dIconBg']} flex items-center justify-center text-3xl shadow-lg border border-white/20 group-hover:scale-110 transition-transform`}>
                      {item.emoji}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          item.isFavorite
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-slate-700/50 text-slate-400 hover:text-rose-400'
                        }`}
                        title="❤️ Favorite"
                      >
                        <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-rose-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => toggleSaved(item.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          item.isSaved
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-slate-700/50 text-slate-400 hover:text-amber-400'
                        }`}
                        title="🔖 Save"
                      >
                        <Bookmark className={`w-4 h-4 ${item.isSaved ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => { playClickSound(); speakWord(item.word); }}
                        className="p-2 rounded-xl bg-slate-700/50 text-slate-400 hover:text-sky-300 hover:bg-slate-700 transition-colors"
                        title="🔄 Review again / Speak"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Word & IPA */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-white capitalize group-hover:text-sky-300 transition-colors">
                        {item.word}
                      </h3>
                      {/* Audio Button */}
                      <button
                        onClick={() => { playClickSound(); speakWord(item.word); }}
                        className="flex items-center gap-1 bg-sky-500 hover:bg-sky-400 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>
                    </div>
                    <p className="text-xs font-mono text-amber-300 font-semibold">{item.ipa}</p>
                  </div>

                  {/* Vietnamese Meaning */}
                  <div className="mt-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">
                      Nghĩa tiếng Việt
                    </span>
                    <p className="text-sm font-bold text-slate-100">{item.meaning}</p>
                  </div>

                  {/* Example sentence */}
                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-widest block">
                      Ví dụ
                    </span>
                    <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
                      "{item.example}"
                    </p>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="mt-4 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="bg-slate-900 px-2.5 py-0.5 rounded-full font-medium border border-slate-800">
                    Nơi làm việc: <strong className="text-amber-300">{item.workplace}</strong>
                  </span>
                  <span className="text-slate-500">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 2: FLASHCARDS MODE ----------------- */}
      {activeSubTab === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-extrabold text-amber-300">🎴 FLASHCARDS LẬT THẺ</h3>
            <p className="text-xs text-slate-400">Chạm vào thẻ để lật xem nghĩa & ví dụ minh họa!</p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>Thẻ thứ {flashcardIndex + 1} / {UNIT12_VOCAB.length}</span>
            <div className="w-1/2 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all"
                style={{ width: `${((flashcardIndex + 1) / UNIT12_VOCAB.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard Container */}
          <div
            onClick={() => { playClickSound(); setIsFlipped(!isFlipped); }}
            className="cursor-pointer min-h-[300px] bg-slate-800/90 border-4 border-amber-400/50 hover:border-amber-400 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center transition-all transform hover:scale-102 active:scale-98"
          >
            {!isFlipped ? (
              /* FRONT SIDE */
              <div className="space-y-4">
                <div className="text-6xl animate-bounce">{UNIT12_VOCAB[flashcardIndex].emoji}</div>
                <h2 className="text-4xl font-black text-white capitalize">
                  {UNIT12_VOCAB[flashcardIndex].word}
                </h2>
                <p className="text-lg font-mono text-amber-300 font-bold">
                  {UNIT12_VOCAB[flashcardIndex].ipa}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    speakWord(UNIT12_VOCAB[flashcardIndex].word);
                  }}
                  className="mt-2 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Phát âm (Listen)</span>
                </button>
                <div className="text-xs text-slate-400 pt-4">👇 Nhấp để lật thẻ xem nghĩa</div>
              </div>
            ) : (
              /* BACK SIDE */
              <div className="space-y-4">
                <div className="inline-block bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/40">
                  Nghĩa Tiếng Việt
                </div>
                <h3 className="text-3xl font-black text-emerald-300">
                  {UNIT12_VOCAB[flashcardIndex].meaning}
                </h3>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 text-left max-w-md">
                  <span className="text-[10px] font-extrabold text-sky-400 uppercase block mb-1">
                    Ví dụ câu:
                  </span>
                  <p className="text-sm text-slate-200 italic">
                    "{UNIT12_VOCAB[flashcardIndex].example}"
                  </p>
                </div>
                <div className="text-xs text-slate-400">👇 Nhấp để lật lại</div>
              </div>
            )}
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                playClickSound();
                setIsFlipped(false);
                setFlashcardIndex(prev => (prev === 0 ? UNIT12_VOCAB.length - 1 : prev - 1));
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Thẻ trước</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                speakWord(UNIT12_VOCAB[flashcardIndex].word);
              }}
              className="p-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-2xl shadow-lg"
              title="Nghe phát âm"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                playClickSound();
                setIsFlipped(false);
                setFlashcardIndex(prev => (prev === UNIT12_VOCAB.length - 1 ? 0 : prev + 1));
              }}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 flex items-center justify-center gap-2"
            >
              <span>Thẻ tiếp</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------- SUB TAB 3: MEMORY CARDS MINI-GAME ----------------- */}
      {activeSubTab === 'memory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-800/90 p-4 rounded-3xl border border-slate-700">
            <div>
              <h3 className="text-lg font-black text-emerald-300">🧠 MEMORY CARDS (GHI NHỚ TỪ VỰNG)</h3>
              <p className="text-xs text-slate-400">Ghép thẻ Tiếng Anh với nghĩa Tiếng Việt tương ứng!</p>
            </div>
            <button
              onClick={initMemoryGame}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi ván mới</span>
            </button>
          </div>

          {/* Grid of Memory Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {memoryCards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleMemoryCardClick(index)}
                className={`cursor-pointer min-h-[110px] rounded-2xl p-4 flex items-center justify-center text-center font-bold text-sm transition-all duration-300 shadow-xl border-2 ${
                  card.isMatched
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 opacity-60 pointer-events-none'
                    : card.isFlipped
                    ? 'bg-amber-500 border-amber-300 text-white scale-102'
                    : 'bg-slate-800 border-slate-700 text-transparent hover:border-slate-500 hover:bg-slate-700'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <span className="capitalize">{card.content}</span>
                ) : (
                  <span className="text-3xl text-slate-500">❓</span>
                )}
              </div>
            ))}
          </div>

          {matchedPairsCount === 6 && (
            <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-3xl p-6 text-center space-y-3 animate-bounce">
              <span className="text-4xl">🎉</span>
              <h3 className="text-2xl font-black text-emerald-300">XUẤT SẮC! BẠN ĐÃ TÌM THẤY TẤT CẢ CÁC CẶP THẺ!</h3>
              <button
                onClick={initMemoryGame}
                className="px-6 py-2.5 bg-emerald-500 text-white font-black text-sm rounded-xl shadow-xl hover:bg-emerald-400"
              >
                Chơi lại ván khác
              </button>
            </div>
          )}
        </div>
      )}

      {/* ----------------- SUB TAB 4: VOCABULARY LIST ----------------- */}
      {activeSubTab === 'list' && (
        <div className="bg-slate-800/90 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-900/80 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-lg font-black text-purple-300">📋 BAN BẢNG TỪ VỰNG UNIT 12</h3>
            <span className="text-xs text-slate-400">Tổng cộng {UNIT12_VOCAB.length} từ</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-xs uppercase font-extrabold text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="p-3.5">Từ vựng</th>
                  <th className="p-3.5">Phiên âm</th>
                  <th className="p-3.5">Nghĩa tiếng Việt</th>
                  <th className="p-3.5">Nơi làm việc</th>
                  <th className="p-3.5 text-center">Phát âm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-200">
                {UNIT12_VOCAB.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-700/40 transition-colors">
                    <td className="p-3.5 font-bold text-white capitalize flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <span>{item.word}</span>
                    </td>
                    <td className="p-3.5 font-mono text-amber-300">{item.ipa}</td>
                    <td className="p-3.5 font-semibold text-emerald-300">{item.meaning}</td>
                    <td className="p-3.5 text-xs text-slate-300">{item.workplace}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => { playClickSound(); speakWord(item.word); }}
                        className="p-2 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500 hover:text-white transition-all inline-flex items-center gap-1 font-bold text-xs"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Listen</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
