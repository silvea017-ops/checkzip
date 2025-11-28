// components/home/HeroSection.jsx
import React from "react";
import { Sparkles, BookOpen } from "lucide-react";

const HeroSection = ({ onSurveyClick, onQuickRecommendClick }) => {
  return (
    <section className="relative text-white py-20">
      {/* 배경 오버레이 (스와이퍼 위에 어두운 효과) */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          당신만을 위한 책 추천
        </h1>
        <p className="text-xl text-white/90 mb-10 drop-shadow-md">
          취향에 맞는 완벽한 책을 찾아보세요
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* 맞춤추천 받기 버튼 */}
          <button
            onClick={onSurveyClick}
            className="relative group px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
          >
            {/* 텍스트 레이어 */}
            <span className="relative z-20 flex items-center justify-center gap-2 whitespace-nowrap">
              <Sparkles className="w-5 h-5" />
              맞춤추천 받기
            </span>

            {/* 호버 배경 효과 */}
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-50 to-indigo-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>

          {/* 나만의 책 고르기 버튼 */}
          <button
            onClick={onQuickRecommendClick}
            className="relative group px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg border-2 border-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
          >
            {/* 텍스트 레이어 */}
            <span className="relative z-20 flex items-center justify-center gap-2 whitespace-nowrap">
              <BookOpen className="w-5 h-5" />
              나만의 책 고르기
            </span>

            {/* 호버 배경 효과 */}
            <span className="absolute inset-0 z-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>
        </div>

        <p className="text-white/90 text-sm mt-6 drop-shadow-md">
          <span className="font-bold text-white">10,000명+</span>이 자신만의
          책을 찾았습니다
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
