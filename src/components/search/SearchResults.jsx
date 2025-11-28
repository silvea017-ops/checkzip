// components/search/SearchResults.jsx
import React, { useState, useEffect } from "react";
import BookCard from "../book/BookCard";
import Loading from "../common/Loading";

const SearchResults = ({ results, loading, onBookClick, query }) => {
  const [displayedResults, setDisplayedResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    // 결과가 변경되면 첫 페이지로 리셋
    setCurrentPage(1);
    if (results && results.length > 0) {
      setDisplayedResults(results.slice(0, ITEMS_PER_PAGE));
    }
  }, [results]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    setDisplayedResults(results.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const hasMore = currentPage < totalPages;
  const showingCount = displayedResults.length;
  const totalCount = results.length;

  if (loading) {
    return <Loading />;
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4"></div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          검색 결과가 없습니다
        </h3>
        <p className="text-slate-600">다른 검색어로 다시 시도해보세요</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* 검색 결과 헤더 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">검색 결과</h2>
          {query && (
            <p className="text-slate-600 mt-2">
              '<span className="font-semibold text-blue-600">{query}</span>'
              검색 결과
            </p>
          )}
          <p className="text-sm text-slate-500 mt-1">
            {showingCount}개 표시 중 / 전체 {totalCount}개
          </p>
        </div>

        {/* 그리드 레이아웃 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {displayedResults.map((book, i) => (
            <div key={book.itemId || i} className="h-full">
              <BookCard book={book} onClick={onBookClick} />
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-lg inline-flex items-center gap-2"
            >
              <span>더보기</span>
              <span className="text-sm opacity-90">
                ({showingCount}/{totalCount})
              </span>
            </button>
          </div>
        )}

        {/* 모두 표시됨 메시지 */}
        {!hasMore && totalCount > ITEMS_PER_PAGE && (
          <div className="text-center">
            <p className="text-slate-600">
              모든 검색 결과를 표시했습니다 ({totalCount}개)
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
