// components/onboarding/QuickRecommendSurvey.jsx
import React, { useState } from "react";
import { X, Check, ArrowRight } from "lucide-react";

const QuickRecommendSurvey = ({ onComplete, onClose }) => {
  const [mood, setMood] = useState("");
  const [length, setLength] = useState("");
  const [genre, setGenre] = useState("");

  // 옵션 데이터
  const MOOD_OPTIONS = [
    { value: "편안한", label: "편안한 😌", icon: "☁️" },
    { value: "설레는", label: "설레는 💕", icon: "✨" },
    { value: "집중하는", label: "집중하는 🎯", icon: "📚" },
    { value: "흥미진진한", label: "흥미진진한 🎢", icon: "🔥" },
  ];

  const LENGTH_OPTIONS = [
    { value: "짧은", label: "짧은 (1-2시간)", icon: "⚡" },
    { value: "중간", label: "중간 (3-5시간)", icon: "📖" },
    { value: "긴", label: "긴 (5시간+)", icon: "📚" },
  ];

  const GENRE_OPTIONS = [
    { value: "소설", label: "소설", icon: "📖" },
    { value: "에세이", label: "에세이", icon: "✍️" },
    { value: "자기계발", label: "자기계발", icon: "🎯" },
    { value: "경제/경영", label: "경제/경영", icon: "💼" },
    { value: "과학", label: "과학", icon: "🔬" },
    { value: "역사", label: "역사", icon: "🏛️" },
  ];

  const handleComplete = () => {
    if (mood && length && genre) {
      onComplete({ mood, length, genre });
    }
  };

  const canProceed = mood && length && genre;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col relative shadow-2xl animate-fadeIn">
        {/* 고정 헤더 */}
        <div className="flex-shrink-0 p-8 pb-4 border-b border-slate-100">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition z-10"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>

          {/* 헤더 */}
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              빠르게 책 찾기
            </h2>
            <p className="text-slate-600">
              간단한 3가지 질문으로 딱 맞는 책을 추천해드려요
            </p>
          </div>
        </div>

        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* 질문 1: 기분 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-700 mb-4">
              1️⃣ 지금 기분은 어떠세요?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`p-4 rounded-xl transition-all text-left ${
                    mood === option.value
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-semibold">{option.label}</span>
                  </div>
                  {mood === option.value && (
                    <div className="mt-2 flex justify-end">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 질문 2: 분량 */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-700 mb-4">
              2️⃣ 얼마나 읽으실 건가요?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {LENGTH_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLength(option.value)}
                  className={`p-4 rounded-xl transition-all ${
                    length === option.value
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  {length === option.value && (
                    <div className="mt-2 flex justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 질문 3: 장르 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-700 mb-4">
              3️⃣ 어떤 분야를 읽고 싶으세요?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {GENRE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setGenre(option.value)}
                  className={`p-4 rounded-xl transition-all ${
                    genre === option.value
                      ? "bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                  {genre === option.value && (
                    <div className="mt-2 flex justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 고정 푸터 (완료 버튼) */}
        <div className="flex-shrink-0 p-8 pt-4 border-t border-slate-100">
          <div className="flex justify-center">
            <button
              onClick={handleComplete}
              disabled={!canProceed}
              className={`px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${
                canProceed
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-2xl hover:scale-105"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              책 추천받기
              {canProceed && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* 스크롤바 스타일링 */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default QuickRecommendSurvey;
