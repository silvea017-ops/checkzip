// components/onboarding/OnboardingSurvey.jsx
import React, { useState } from "react";
import { X, Check, ArrowRight } from "lucide-react";

const OnboardingSurvey = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [readingGoal, setReadingGoal] = useState("");
  const [favoriteTime, setFavoriteTime] = useState("");

  // 장르 옵션 (이모지 사용)
  const GENRE_OPTIONS = [
    {
      id: 1,
      name: "소설/문학",
      icon: "📖",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 2,
      name: "경제/경영",
      icon: "💼",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      name: "자기계발",
      icon: "🎯",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "에세이",
      icon: "✍️",
      color: "from-purple-500 to-violet-500",
    },
    {
      id: 5,
      name: "인문/사회",
      icon: "🤔",
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 6,
      name: "과학/기술",
      icon: "🔬",
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: 7,
      name: "예술/문화",
      icon: "🎨",
      color: "from-amber-500 to-orange-500",
    },
    { id: 8, name: "건강/취미", icon: "💪", color: "from-red-500 to-pink-500" },
  ];

  const READING_GOALS = [
    { value: "relaxation", label: "휴식과 힐링", icon: "😌" },
    { value: "growth", label: "자기계발", icon: "🚀" },
    { value: "knowledge", label: "지식 습득", icon: "🧠" },
    { value: "entertainment", label: "재미와 즐거움", icon: "🎉" },
  ];

  const READING_TIMES = [
    { value: "morning", label: "아침", icon: "🌅" },
    { value: "afternoon", label: "오후", icon: "☀️" },
    { value: "evening", label: "저녁", icon: "🌆" },
    { value: "night", label: "밤", icon: "🌙" },
  ];

  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else handleComplete();
  };

  const handleComplete = () => {
    onComplete({
      genres: selectedGenres,
      goal: readingGoal,
      time: favoriteTime,
    });
  };

  const canProceed = () => {
    if (step === 0) return selectedGenres.length > 0;
    if (step === 1) return readingGoal !== "";
    if (step === 2) return favoriteTime !== "";
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col relative shadow-2xl animate-fadeIn">
        {/* 고정 헤더 */}
        <div className="flex-shrink-0 p-8 pb-4">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition z-10"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>

          {/* 진행 바 */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full mx-1 transition-all ${
                    i <= step ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-600 text-center">
              {step + 1} / 3 단계
            </p>
          </div>
        </div>

        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto px-8">
          {/* Step 0: 장르 선택 */}
          {step === 0 && (
            <div className="animate-slideIn pb-6">
              <h2 className="text-3xl font-bold text-center mb-3">
                어떤 책을 좋아하시나요? 📚
              </h2>
              <p className="text-slate-600 text-center mb-8">
                관심있는 분야를 모두 선택해주세요
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {GENRE_OPTIONS.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`relative p-6 rounded-2xl transition-all duration-300 ${
                      selectedGenres.includes(genre.id)
                        ? `bg-gradient-to-br ${genre.color} scale-105 shadow-2xl`
                        : "bg-slate-50 hover:bg-slate-100 shadow-md"
                    }`}
                  >
                    {selectedGenres.includes(genre.id) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                    <div className="text-5xl mb-3">{genre.icon}</div>
                    <div
                      className={`font-bold text-sm ${
                        selectedGenres.includes(genre.id)
                          ? "text-white"
                          : "text-slate-700"
                      }`}
                    >
                      {genre.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: 독서 목표 */}
          {step === 1 && (
            <div className="animate-slideIn pb-6">
              <h2 className="text-3xl font-bold text-center mb-3">
                독서를 통해 무엇을 얻고 싶으신가요? 🎯
              </h2>
              <p className="text-slate-600 text-center mb-8">
                하나를 선택해주세요
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {READING_GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setReadingGoal(goal.value)}
                    className={`p-8 rounded-2xl transition-all ${
                      readingGoal === goal.value
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white scale-105 shadow-2xl"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 shadow-md"
                    }`}
                  >
                    <div className="text-6xl mb-4">{goal.icon}</div>
                    <div className="font-bold text-lg">{goal.label}</div>
                    {readingGoal === goal.value && (
                      <div className="mt-3 flex justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: 선호 시간대 */}
          {step === 2 && (
            <div className="animate-slideIn pb-6">
              <h2 className="text-3xl font-bold text-center mb-3">
                주로 언제 책을 읽으시나요? ⏰
              </h2>
              <p className="text-slate-600 text-center mb-8">
                선호하는 시간대를 알려주세요
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {READING_TIMES.map((time) => (
                  <button
                    key={time.value}
                    onClick={() => setFavoriteTime(time.value)}
                    className={`p-8 rounded-2xl transition-all ${
                      favoriteTime === time.value
                        ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white scale-105 shadow-2xl"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 shadow-md"
                    }`}
                  >
                    <div className="text-6xl mb-4">{time.icon}</div>
                    <div className="font-bold text-lg">{time.label}</div>
                    {favoriteTime === time.value && (
                      <div className="mt-3 flex justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 고정 푸터 (버튼들) */}
        <div className="flex-shrink-0 p-8 pt-4 border-t border-slate-100">
          <div className="flex gap-4 justify-center">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                canProceed()
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-lg"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              {step < 2 ? "다음" : "완료"}
              {canProceed() && <ArrowRight className="w-5 h-5" />}
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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
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

export default OnboardingSurvey;
