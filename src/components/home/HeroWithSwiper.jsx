// components/home/HeroWithSwiper.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, BookOpen } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "2025 베스트셀러",
    subtitle: "올해 가장 많이 읽힌 책들",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200",
    gradient: "from-blue-600/70 to-blue-800/70",
  },
  {
    id: 2,
    title: "신간 도서",
    subtitle: "이번 주 새로 출간된 책",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200",
    gradient: "from-indigo-600/70 to-indigo-800/70",
  },
  {
    id: 3,
    title: "추천 도서",
    subtitle: "당신을 위한 맞춤 추천",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200",
    gradient: "from-purple-600/70 to-purple-800/70",
  },
];

const HeroWithSwiper = ({ onSurveyClick, onQuickRecommendClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // 자동 슬라이드
  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (!isPaused) {
        intervalRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
      }
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div
      className="relative h-[500px] sm:h-[600px] overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 배경 슬라이드들 */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* 배경 이미지 */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* 그라데이션 오버레이 */}
            <div className={`${slide.gradient}`}></div>
          </div>
        </div>
      ))}

      {/* 어두운 오버레이 (콘텐츠 가독성 향상) */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* 콘텐츠 레이어 */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-4xl mx-auto px-4 text-center w-full">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 drop-shadow-2xl animate-fadeInUp">
            당신만을 위한 책 추천
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-10 drop-shadow-lg animate-fadeInUp animation-delay-200">
            취향에 맞는 완벽한 책을 찾아보세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-400">
            {/* 맞춤추천 받기 버튼 */}
            <button
              onClick={onSurveyClick}
              className="relative group px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-20 flex items-center justify-center gap-2 whitespace-nowrap">
                <Sparkles className="w-5 h-5" />
                맞춤추천 받기
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-50 to-indigo-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </button>

            {/* 나만의 책 고르기 버튼 */}
            <button
              onClick={onQuickRecommendClick}
              className="relative group px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg border-2 border-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-20 flex items-center justify-center gap-2 whitespace-nowrap">
                <BookOpen className="w-5 h-5" />
                나만의 책 고르기
              </span>
              <span className="absolute inset-0 z-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </button>
          </div>

          <p className="text-white/90 text-sm mt-6 drop-shadow-md animate-fadeInUp animation-delay-600">
            이미 <span className="font-bold text-white">10,000명+</span>이
            자신만의 책을 찾았습니다
          </p>
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all z-30 hover:scale-110"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all z-30 hover:scale-110"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HeroWithSwiper;
