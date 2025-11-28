// components/home/InfiniteScrollBanner.jsx
import React, { useState, useEffect } from "react";

const InfiniteScrollBanner = ({ books }) => {
  const [bannerBooks, setBannerBooks] = useState([]);

  useEffect(() => {
    // 베스트셀러 상위 10-20권 선택
    if (books && books.length > 0) {
      const selectedBooks = books.slice(9, 20); // 10위~20위
      setBannerBooks(selectedBooks);
    }
  }, [books]);

  if (!bannerBooks || bannerBooks.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden  py-6">
      {/* 그라데이션 오버레이 (양쪽 페이드 효과) */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#ffffff] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#ffffff] to-transparent z-10"></div>

      {/* 무한 스크롤 컨테이너 */}
      <div className="flex animate-scroll-books">
        {/* 첫 번째 세트 */}
        {bannerBooks.map((book, index) => (
          <div
            key={`first-${book.itemId || index}`}
            className="flex-shrink-0 mx-3 group cursor-pointer"
          >
            <div className="w-32 h-44 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}

        {/* 두 번째 세트 (끊김 없는 무한 스크롤) */}
        {bannerBooks.map((book, index) => (
          <div
            key={`second-${book.itemId || index}`}
            className="flex-shrink-0 mx-3 group cursor-pointer"
          >
            <div className="w-32 h-44 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}

        {/* 세 번째 세트 (더 부드러운 무한 스크롤) */}
        {bannerBooks.map((book, index) => (
          <div
            key={`third-${book.itemId || index}`}
            className="flex-shrink-0 mx-3 group cursor-pointer"
          >
            <div className="w-32 h-44 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-books {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-books {
          animation: scroll-books 40s linear infinite;
        }

        .animate-scroll-books:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrollBanner;
