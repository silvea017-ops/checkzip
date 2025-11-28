// components/common/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BookLogo from "./BookLogo";

// Font Awesome SVG 아이콘들
const HeartIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 512 512">
    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 448 512">
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
  </svg>
);

const Header = ({ onLogoClick, onNavClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
    navigate("/");
  };

  const handleNavigation = (page) => {
    if (onNavClick) {
      onNavClick(page);
    }

    if (page === "recommendation") navigate("/recommendation");
    if (page === "bestseller") navigate("/bestseller");
    if (page === "new") navigate("/new");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 영역 */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition group"
            onClick={handleLogoClick}
          >
            <div className="transform group-hover:scale-102 transition-transform">
              <BookLogo className="w-12 h-12" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-permanent -ml-2">
              CheckZip
            </span>
          </div>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation("recommendation")}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              추천
            </button>
            <button
              onClick={() => handleNavigation("bestseller")}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              베스트셀러
            </button>
            <button
              onClick={() => handleNavigation("new")}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              신간
            </button>
          </nav>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-slate-600 hover:text-blue-600 transition"
              aria-label="찜한 책"
            >
              <HeartIcon className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-slate-600 hover:text-blue-600 transition"
              aria-label="마이페이지"
            >
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
