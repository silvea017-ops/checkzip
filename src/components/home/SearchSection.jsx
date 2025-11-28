// components/home/SearchSection.jsx
import React, { useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";

const SEARCH_TYPES = [
  { value: "Title", label: "제목" },
  { value: "Author", label: "저자" },
  { value: "Publisher", label: "출판사" },
];

const POPULAR_SEARCHES = [
  "퓨처 셀프",
  "트렌드 코리아 2025",
  "세이노의 가르침",
  "불편한 편의점",
  "데일 카네기",
  "아몬드",
];

const SearchSection = ({
  onSearch,
  initialQuery = "",
  initialType = "Title",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState(initialType);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery, searchType);
    }
  };

  const handlePopularClick = (keyword) => {
    setSearchQuery(keyword);
    onSearch(keyword, searchType);
  };

  return (
    <div className="w-full">
      {/* 검색바 */}
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="flex items-center bg-white rounded-xl shadow-lg border-2 border-slate-200 focus-within:border-blue-500 transition-all">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="pl-4 pr-2 py-4 text-sm text-slate-600 bg-transparent border-none outline-none cursor-pointer"
          >
            {SEARCH_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <div className="w-px h-6 bg-slate-300"></div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="책 제목, 저자, ISBN으로 검색하세요"
            className="flex-1 px-4 py-4 text-base bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-2 hover:bg-slate-100 rounded-full transition mr-2"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}

          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition font-medium"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* 인기 검색어 */}
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-semibold text-slate-700">
          인기 검색어
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((keyword, index) => (
          <button
            key={keyword}
            onClick={() => handlePopularClick(keyword)}
            className="px-4 py-2 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-500 rounded-full text-sm text-slate-700 hover:text-blue-600 transition-all"
          >
            <span className="font-bold text-blue-600 mr-1.5">{index + 1}</span>
            {keyword}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSection;
