// components/recommendation/RecommendationPage.jsx
import React from "react";
import { ArrowLeft, Heart, Star, Sparkles, RefreshCw } from "lucide-react";

const RecommendationPage = ({ books, context, onBookClick, onBack }) => {
  // 컨텍스트에 따른 제목 생성
  const getTitle = () => {
    if (context.type === "full") {
      return `${context.genres.join(", ")} 맞춤 추천`;
    }
    if (context.type === "quick") {
      return `${context.mood} 기분에 딱 맞는 ${context.genre}`;
    }
    return "추천 도서";
  };

  const getSubtitle = () => {
    if (context.type === "full") {
      const goalText = {
        relaxation: "휴식과 힐링",
        growth: "자기계발",
        knowledge: "지식 습득",
        entertainment: "재미와 즐거움",
      };
      const timeText = {
        morning: "아침",
        afternoon: "오후",
        evening: "저녁",
        night: "밤",
      };
      return `${goalText[context.goal] || context.goal} 목표와 ${
        timeText[context.time] || context.time
      } 시간대에 맞춰 선정했어요`;
    }
    if (context.type === "quick") {
      return `${context.length} 분량으로 준비했습니다`;
    }
    return "당신을 위한 특별한 책들";
  };

  const isLoading = !books || books.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">홈으로 돌아가기</span>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-800">{getTitle()}</h1>
          </div>
          <p className="text-slate-600">{getSubtitle()}</p>
          {books && books.length > 0 && (
            <p className="text-sm text-blue-600 font-medium mt-2">
              총 {books.length}권의 책을 추천합니다
            </p>
          )}
        </div>
      </div>

      {/* 로딩 또는 빈 상태 */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block mb-6">
              <RefreshCw className="w-16 h-16 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">
              추천 도서를 찾고 있어요
            </h3>
            <p className="text-slate-500 mb-8">
              최적의 책을 선별하는 중입니다...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* 책 그리드 */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book, index) => (
                <div
                  key={book.itemId || index}
                  onClick={() => onBookClick(book)}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                >
                  {/* 책 표지 */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center gap-1 text-white text-xs">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">
                            {book.customerReviewRank
                              ? (book.customerReviewRank / 2).toFixed(1)
                              : "4.5"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 책 정보 */}
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-1">
                      {book.author}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-600 font-medium">
                        {book.categoryName || "도서"}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 hover:fill-red-500 transition" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 추가 안내 */}
          <div className="max-w-7xl mx-auto px-4 pb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                💡 추천이 마음에 드시나요?
              </h3>
              <p className="text-slate-600 mb-4">
                더 정확한 추천을 받으려면 평가를 남겨주세요. 당신의 취향을 더 잘
                이해할 수 있습니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  다른 추천 받기
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  홈으로
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationPage;
