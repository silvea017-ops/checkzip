// components/search/SearchBar.jsx
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { SEARCH_TYPES } from "../../utils/constants";

const SearchBar = ({
  onSearch,
  placeholder = "책 제목, 저자, 출판사를 검색해보세요",
}) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("Title");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center bg-white rounded-2xl shadow-lg transition-all ${
            isFocused ? "ring-2 ring-[#6C63FF]" : ""
          }`}
        >
          {/* 검색 타입 선택 */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="pl-4 pr-2 py-4 text-sm text-[#666] bg-transparent border-none outline-none cursor-pointer"
          >
            {SEARCH_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* 구분선 */}
          <div className="w-px h-6 bg-gray-300"></div>

          {/* 검색 입력 */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 px-4 py-4 text-sm bg-transparent border-none outline-none"
          />

          {/* 입력 지우기 버튼 */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 hover:bg-gray-100 rounded-full transition mr-2"
              aria-label="검색어 지우기"
            >
              <X className="w-4 h-4 text-[#666]" />
            </button>
          )}

          {/* 검색 버튼 */}
          <button
            type="submit"
            className="px-6 py-4 bg-[#6C63FF] text-white rounded-r-2xl hover:bg-[#5850E6] transition"
            aria-label="검색"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* 최근 검색어 (추후 구현) */}
      {isFocused && (
        <div className="mt-2 bg-white rounded-xl shadow-lg p-4">
          <p className="text-xs text-[#666]">최근 검색어</p>
          {/* 최근 검색어 목록 */}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
