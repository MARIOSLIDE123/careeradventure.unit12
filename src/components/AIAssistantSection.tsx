import React, { useState, useRef, useEffect } from 'react';
import { StudentInfo, ChatMessage } from '../types';
import { speakWord, playClickSound } from '../utils/audio';
import { Bot, Send, User, Sparkles, Volume2, RefreshCw, MessageSquare, Lightbulb, BookOpen, CheckCircle2 } from 'lucide-react';

interface AIAssistantProps {
  studentInfo: StudentInfo | null;
  onEarnPoints?: (activityName: string, category: 'vocab' | 'game' | 'assessment' | 'ai' | 'daily', points: number, detail?: string) => void;
}

export const AIAssistantSection: React.FC<AIAssistantProps> = ({ studentInfo, onEarnPoints }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: `Xin chào ${studentInfo?.name || 'em'}! 👋 Thầy/cô AI "Sparky 3D" luôn sẵn sàng đồng hành cùng em học tập **Unit 12: Career Choices**.

Em có thể hỏi thầy/cô về:
- 📖 Giải thích nghĩa từ vựng, phiên âm IPA & ví dụ
- 💬 Phân tích đoạn hội thoại Getting Started
- ❓ Giải thích đáp án bài kiểm tra
- 🎯 Đặt câu hoặc tạo bài tập trắc nghiệm mới!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    playClickSound();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    if (onEarnPoints) {
      onEarnPoints('Trò chuyện cùng Gia sư AI', 'ai', 15, `Hỏi AI Sparky: "${query.trim().substring(0, 30)}..."`);
    }

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          history: messages,
          studentInfo
        })
      });

      const data = await response.json();
      const botReply = data.reply || 'Dường như có gián đoạn kết nối. Thầy/cô AI vẫn đang sẵn sàng hỗ trợ em!';

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Thầy/cô AI đang khởi động lại hệ thống, em hãy thử đặt câu hỏi lại nhé!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "💬 Giải thích đoạn hội thoại Getting Started",
    "📚 Ôn tập 5 từ vựng khó nhất Unit 12",
    "❓ Tạo 3 câu hỏi trắc nghiệm mới để luyện tập",
    "💡 Gợi ý chọn nghề nghiệp phù hợp với học sinh THCS",
    "🔍 Phân tích ngữ pháp: prefer... to... vs would rather..."
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <h2 className="text-2xl font-black text-white">4. AI LEARNING ASSISTANT</h2>
          </div>
          <p className="text-xs text-slate-400">Gia sư Tiếng Anh AI cá nhân hóa chuyên sâu Unit 12 Career Choices</p>
        </div>

        <div className="bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1.5 rounded-2xl text-xs font-bold border border-fuchsia-500/40 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-fuchsia-400 animate-spin" />
          <span>Powered by Gemini AI</span>
        </div>
      </div>

      {/* Quick Action Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-fuchsia-600/30 hover:border-fuchsia-400 border border-slate-700 text-xs font-bold text-slate-200 transition-all whitespace-nowrap shrink-0 shadow-md"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-900/90 rounded-3xl border-2 border-slate-800 p-4 sm:p-6 min-h-[450px] max-h-[550px] overflow-y-auto flex flex-col justify-between shadow-2xl space-y-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-tr from-amber-400 to-orange-500'
                    : 'bg-gradient-to-tr from-fuchsia-500 to-purple-600'
                }`}
              >
                {msg.role === 'user' ? (studentInfo?.avatar || '🧑‍🎓') : '🤖'}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] rounded-3xl p-4 text-sm leading-relaxed shadow-md space-y-2 ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-white font-semibold rounded-tr-none'
                    : 'bg-slate-800/90 text-slate-100 border border-slate-700 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/40">
                  <span>{msg.timestamp}</span>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => speakWord(msg.content.slice(0, 150))}
                      className="p-1 hover:text-amber-300 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-fuchsia-400 font-bold bg-slate-800 p-3 rounded-2xl w-fit">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Gia sư AI đang suy nghĩ câu trả lời...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative pt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi gia sư AI bất kỳ điều gì về Unit 12 Career Choices..."
            className="w-full bg-slate-800 border-2 border-slate-700 focus:border-fuchsia-500 rounded-2xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-3.5 p-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white font-bold disabled:opacity-40 transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
