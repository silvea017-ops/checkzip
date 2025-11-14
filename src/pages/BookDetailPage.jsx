// pages/BookDetailPage.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Heart,
  ShoppingCart,
  Star,
  Calendar,
  User,
  Building,
} from "lucide-react";
import AladinAPI from "../services/aladinAPI";

const BookDetailPage = ({ book, onClose }) => {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (book?.itemId) {
      loadDetail();
    }
  }, [book]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const data = await AladinAPI.getDetail(book.itemId);
      setDetailData(data.item?.[0]);
    } catch (error) {
      console.error("Failed to load book detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    if (book.link) {
      window.open(book.link, "_blank");
    }
  };

  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 ml-auto block p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6C63FF] border-t-transparent"></div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              {/* 상단 정보 */}
              <div className="flex flex-col sm:flex-row gap-8 mb-8">
                {/* 표지 이미지 */}
                <div className="flex-shrink-0">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full sm:w-64 rounded-2xl shadow-xl"
                  />
                </div>

                {/* 기본 정보 */}
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-3">
                    {book.title}
                  </h1>

                  {/* 저자/출판사 정보 */}
                  <div className="space-y-2 mb-4 text-[#666]">
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
                                ? "fill-[#FFD66C] text-[#FFD66C]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-lg">
                        {(book.customerReviewRank / 2).toFixed(1)}
                      </span>
                    </div>
                  )}

                  {/* 가격 */}
                  <div className="mb-6">
                    {book.priceSales < book.priceStandard && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-400 line-through">
                          {book.priceStandard?.toLocaleString()}원
                        </span>
                        <span className="text-red-500 font-bold">
                          {Math.round(
                            (1 - book.priceSales / book.priceStandard) * 100
                          )}
                          %
                        </span>
                      </div>
                    )}
                    <div className="text-3xl font-bold text-[#6C63FF]">
                      {book.priceSales?.toLocaleString()}원
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition ${
                        isFavorite
                          ? "bg-red-50 text-red-500 border-2 border-red-500"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                      {isFavorite ? "찜 완료" : "찜하기"}
                    </button>
                    <button
                      onClick={handlePurchase}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5850E6] transition"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      구매하기
                    </button>
                  </div>
                </div>
              </div>

              {/* 책 소개 */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#1E1E1E] mb-4">
                  책 소개
                </h2>
                <p className="text-[#666] leading-relaxed whitespace-pre-line">
                  {detailData?.description ||
                    book.description ||
                    "책 소개 정보가 없습니다."}
                </p>
              </div>

              {/* 목차 */}
              {detailData?.bookinfo?.toc && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#1E1E1E] mb-4">
                    목차
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[#666] text-sm leading-relaxed whitespace-pre-line">
                      {detailData.bookinfo.toc}
                    </p>
                  </div>
                </div>
              )}

              {/* 리뷰 */}
              {detailData?.subInfo?.cardReviewImgList &&
                detailData.subInfo.cardReviewImgList.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-[#1E1E1E] mb-4">
                      리뷰
                    </h2>
                    <div className="space-y-4">
                      {detailData.subInfo.cardReviewImgList
                        .slice(0, 3)
                        .map((review, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-4"
                          >
                            <p className="text-[#666] text-sm">{review}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
