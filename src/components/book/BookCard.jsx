// components/book/BookCard.jsx
import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

const BookCard = ({ book, onClick, size = "medium" }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // 로컬 스토리지에 찜 상태 저장 로직 추가
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    // 알라딘 상품 페이지로 이동
    if (book.link) {
      window.open(book.link, "_blank");
    }
  };

  // 크기별 스타일
  const sizeClasses = {
    small: "w-32",
    medium: "w-40 sm:w-48",
    large: "w-48 sm:w-56",
  };

  return (
    <div
      onClick={() => onClick(book)}
      className={`${sizeClasses[size]} flex-shrink-0 cursor-pointer group`}
    >
      {/* 카드 컨테이너 */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* 표지 이미지 */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {!imageError ? (
            <img
              src={book.cover}
              alt={book.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">📚</span>
            </div>
          )}

          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleFavoriteClick}
                className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                aria-label="찜하기"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                />
              </button>
              <button
                onClick={handleCartClick}
                className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                aria-label="구매하기"
              >
                <ShoppingCart className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* 베스트셀러 뱃지 */}
          {book.bestRank && (
            <div className="absolute top-2 left-2 bg-[#FFD66C] text-[#1E1E1E] text-xs font-bold px-2 py-1 rounded-lg">
              #{book.bestRank}
            </div>
          )}
        </div>

        {/* 도서 정보 */}
        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-sm sm:text-base text-[#1E1E1E] line-clamp-2 mb-1 group-hover:text-[#6C63FF] transition">
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#666] line-clamp-1 mb-2">
            {book.author}
          </p>

          {/* 평점 */}
          {book.customerReviewRank && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFD66C] text-[#FFD66C]" />
              <span className="text-xs sm:text-sm font-medium text-[#1E1E1E]">
                {(book.customerReviewRank / 2).toFixed(1)}
              </span>
            </div>
          )}

          {/* 가격 */}
          <div className="flex items-center justify-between">
            <div>
              {book.priceSales && book.priceSales < book.priceStandard && (
                <span className="text-xs text-[#666] line-through mr-1">
                  {book.priceStandard?.toLocaleString()}원
                </span>
              )}
              <span className="text-sm sm:text-base font-bold text-[#6C63FF]">
                {book.priceSales?.toLocaleString()}원
              </span>
            </div>
            {book.priceSales && book.priceSales < book.priceStandard && (
              <span className="text-xs font-bold text-red-500">
                {Math.round((1 - book.priceSales / book.priceStandard) * 100)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
