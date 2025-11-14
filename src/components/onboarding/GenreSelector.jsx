// components/onboarding/GenreSelector.jsx
import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { GENRE_OPTIONS, STORAGE_KEYS } from "../../utils/constants";

const GenreSelector = ({ onComplete }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleComplete = () => {
    if (selectedGenres.length > 0) {
      // 로컬 스토리지에 저장
      localStorage.setItem(
        STORAGE_KEYS.SELECTED_GENRES,
        JSON.stringify(selectedGenres)
      );
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true");
      onComplete(selectedGenres);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] to-[#9C8FFF] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl">📚</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            어떤 책을 좋아하시나요?
          </h1>
          <p className="text-lg text-white/90">
            관심있는 분야를 선택하면 맞춤 추천을 받을 수 있어요
          </p>
          <p className="text-sm text-white/70 mt-2">
            (최소 1개 이상 선택해주세요)
          </p>
        </div>

        {/* 장르 선택 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {GENRE_OPTIONS.map((genre) => {
            const isSelected = selectedGenres.includes(genre.id);
            return (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className={`relative p-6 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? "bg-white text-[#6C63FF] shadow-xl scale-105"
                    : "bg-white/20 text-white hover:bg-white/30 shadow-lg"
                }`}
              >
                {/* 선택 체크 표시 */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#6C63FF] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* 아이콘 */}
                <div className="text-4xl mb-3">{genre.icon}</div>

                {/* 장르명 */}
                <div
                  className={`font-bold text-sm ${
                    isSelected ? "text-[#6C63FF]" : "text-white"
                  }`}
                >
                  {genre.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* 완료 버튼 */}
        <div className="text-center">
          <button
            onClick={handleComplete}
            disabled={selectedGenres.length === 0}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all ${
              selectedGenres.length > 0
                ? "bg-white text-[#6C63FF] hover:shadow-2xl hover:scale-105"
                : "bg-white/30 text-white/50 cursor-not-allowed"
            }`}
          >
            시작하기
            <ArrowRight className="w-5 h-5" />
          </button>
          {selectedGenres.length > 0 && (
            <p className="text-white/80 text-sm mt-4">
              {selectedGenres.length}개 선택됨
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreSelector;
