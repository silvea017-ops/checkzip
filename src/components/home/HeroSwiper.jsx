// components/home/HeroSwiper.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "2025 베스트셀러",
    subtitle: "올해 가장 많이 읽힌 책들",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
    gradient: "from-blue-600/80 to-blue-800/80",
  },
  {
    id: 2,
    title: "신간 도서",
    subtitle: "이번 주 새로 출간된 책",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    gradient: "from-indigo-600/80 to-indigo-800/80",
  },
  {
    id: 3,
    title: "추천 도서",
    subtitle: "당신을 위한 맞춤 추천",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    gradient: "from-purple-600/80 to-purple-800/80",
  },
];

const HeroSwiper = () => {
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
      className="relative h-[400px] sm:h-[500px] overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 슬라이드들 */}
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
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
            ></div>
          </div>

          {/* 콘텐츠 - 중앙 정렬 */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fadeInUp">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 drop-shadow-lg animate-fadeInUp animation-delay-200">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* 네비게이션 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all z-20 hover:scale-110"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all z-20 hover:scale-110"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
      `}</style>
    </div>
  );
};

export default HeroSwiper;
