// Updated BookCard.jsx — title text now shows full line with ellipsis without clipping height
import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

const BookCard = ({ book, onClick, size = "medium" }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (book.link) window.open(book.link, "_blank");
  };

  const handleCardClick = () => {
    if (onClick) onClick(book);
  };

  const sizeClasses = {
    small: "w-32",
    medium: "w-40 sm:w-48",
    large: "w-48 sm:w-56",
  };

  const imageUrl = book.cover;

  return (
    <div
      onClick={handleCardClick}
      className={`${sizeClasses[size]} flex-shrink-0 cursor-pointer group`}
    >
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 h-full flex flex-col">
        {/* 이미지 */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-50 flex-shrink-0">
          {!imageError ? (
            <img
              src={imageUrl}
              alt={book.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
              <div className="text-center">
                <span className="text-4xl block mb-2">📚</span>
                <span className="text-xs text-slate-400">이미지 없음</span>
              </div>
            </div>
          )}
        </div>

        {/* 도서 정보 */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col min-h-0">
          {/* 제목 - 1줄 + ... */}
          <h3
            className="font-bold text-sm sm:text-base text-slate-800 mb-1 group-hover:text-blue-600 transition truncate"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={book.title}
          >
            {book.title}
          </h3>

          {/* 저자 */}
          <p
            className="text-xs sm:text-sm text-slate-500 mb-2 truncate"
            title={book.author}
          >
            {book.author}
          </p>

          {book.customerReviewRank && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">
                {(book.customerReviewRank / 2).toFixed(1)}
              </span>
            </div>
          )}

          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                {book.priceSales && book.priceStandard > book.priceSales && (
                  <div className="text-xs text-slate-400 line-through truncate">
                    {book.priceStandard?.toLocaleString()}원
                  </div>
                )}
                <div className="text-sm sm:text-base font-bold text-blue-600 truncate">
                  {book.priceSales?.toLocaleString()}원
                </div>
              </div>

              {book.priceSales && book.priceStandard > book.priceSales && (
                <span className="text-xs font-bold text-red-500 ml-2">
                  {Math.round((1 - book.priceSales / book.priceStandard) * 100)}
                  %
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
