// components/layout/Header.jsx
import React from "react";
import { Search, Book, Heart, User } from "lucide-react";

const Header = ({ onSearchClick, onLogoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            onClick={onLogoClick}
          >
            <Book className="w-8 h-8 text-[#6C63FF]" />
            <span className="text-xl font-bold text-[#1E1E1E]">
              Aladin Insight
            </span>
          </div>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            <button className="text-sm font-medium text-[#666] hover:text-[#6C63FF] transition">
              추천
            </button>
            <button className="text-sm font-medium text-[#666] hover:text-[#6C63FF] transition">
              베스트셀러
            </button>
            <button className="text-sm font-medium text-[#666] hover:text-[#6C63FF] transition">
              신간
            </button>
          </nav>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-4">
            <button
              onClick={onSearchClick}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="검색"
            >
              <Search className="w-5 h-5 text-[#666]" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="찜한 도서"
            >
              <Heart className="w-5 h-5 text-[#666]" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="내 정보"
            >
              <User className="w-5 h-5 text-[#666]" />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 네비게이션 */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button className="text-xs text-[#666] hover:text-[#6C63FF] py-2 px-4">
            추천
          </button>
          <button className="text-xs text-[#666] hover:text-[#6C63FF] py-2 px-4">
            베스트셀러
          </button>
          <button className="text-xs text-[#666] hover:text-[#6C63FF] py-2 px-4">
            신간
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
