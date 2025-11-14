// components/home/BookSlider.jsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "../book/BookCard";

const BookSlider = ({
  title,
  books,
  icon,
  onBookClick,
  cardSize = "medium",
}) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-12">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">
            {title}
          </h2>
        </div>

        {/* 네비게이션 버튼 (데스크탑) */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-[#6C63FF] hover:text-white transition"
            aria-label="이전"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-[#6C63FF] hover:text-white transition"
            aria-label="다음"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 슬라이더 컨테이너 */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-0 pb-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {books && books.length > 0 ? (
            books.map((book, index) => (
              <BookCard
                key={book.itemId || index}
                book={book}
                onClick={onBookClick}
                size={cardSize}
              />
            ))
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-gray-400">
              <p>도서 정보를 불러오는 중입니다...</p>
            </div>
          )}
        </div>

        {/* 그라데이션 페이드 효과 */}
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#F5F5F5] to-transparent pointer-events-none hidden sm:block" />
      </div>
    </section>
  );
};

export default BookSlider;
