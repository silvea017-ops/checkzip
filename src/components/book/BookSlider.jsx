// components/book/BookSlider.jsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCard";

const BookSlider = ({ books, onBookClick, title, icon }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      console.log(`Scrolling ${direction}`);
    }
  };

  if (!books || books.length === 0) {
    console.log("No books to display in slider");
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
          더보기
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="relative">
        {/* 네비게이션 버튼 */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:bg-blue-50 hover:border-blue-500 transition-all"
          aria-label="이전"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:bg-blue-50 hover:border-blue-500 transition-all"
          aria-label="다음"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>

        {/* 슬라이더 */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-0 pb-4 scroll-smooth"
        >
          {books.map((book, index) => (
            <BookCard
              key={book.itemId || index}
              book={book}
              onClick={onBookClick}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default BookSlider;
