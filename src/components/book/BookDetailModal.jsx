// components/book/BookDetailModal.jsx
import React, { useState } from "react";
import {
  X,
  Heart,
  ShoppingCart,
  Star,
  Calendar,
  User,
  Building,
} from "lucide-react";

const BookDetailModal = ({ book, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!book) return null;

  const handlePurchase = () => {
    console.log("Purchase clicked:", book.title);
    if (book.link) {
      window.open(book.link, "_blank");
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("Favorite in modal:", book.title, !isFavorite);
  };

  const handleBackdropClick = (e) => {
    console.log("Backdrop clicked");
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
          onClick={handleModalClick}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-slate-100 transition z-10"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>

          <div className="p-6 sm:p-8">
            {/* 상단 정보 */}
            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              {/* 표지 이미지 */}
              <div className="flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full sm:w-64 rounded-xl shadow-lg"
                />
              </div>

              {/* 기본 정보 */}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                  {book.title}
                </h1>

                {/* 저자/출판사 정보 */}
                <div className="space-y-2 mb-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{book.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{book.publisher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{book.pubDate}</span>
                  </div>
                </div>

                {/* 평점 */}
                {book.customerReviewRank && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(book.customerReviewRank / 2)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-lg text-slate-700">
                      {(book.customerReviewRank / 2).toFixed(1)}
                    </span>
                  </div>
                )}

                {/* 가격 */}
                <div className="mb-6">
                  {book.priceSales < book.priceStandard && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-400 line-through">
                        {book.priceStandard?.toLocaleString()}원
                      </span>
                      <span className="text-red-500 font-bold">
                        {Math.round(
                          (1 - book.priceSales / book.priceStandard) * 100
                        )}
                        % 할인
                      </span>
                    </div>
                  )}
                  <div className="text-3xl font-bold text-blue-600">
                    {book.priceSales?.toLocaleString()}원
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-3">
                  <button
                    onClick={handleFavorite}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition ${
                      isFavorite
                        ? "bg-red-50 text-red-500 border-2 border-red-500"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                    {isFavorite ? "찜 완료" : "찜하기"}
                  </button>
                  <button
                    onClick={handlePurchase}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    구매하기
                  </button>
                </div>
              </div>
            </div>

            {/* 책 소개 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">책 소개</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {book.description || "책 소개 정보가 없습니다."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
