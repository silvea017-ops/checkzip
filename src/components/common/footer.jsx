// components/common/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 로고 & 소개 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CZ</span>
              </div>
              <span className="text-xl font-bold text-white">CheckZip</span>
            </div>
            <p className="text-sm text-slate-400">
              당신을 위한 맞춤 도서 추천 서비스
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="font-semibold text-white mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  홈
                </a>
              </li>
              <li>
                <a
                  href="/bestseller"
                  className="hover:text-blue-400 transition"
                >
                  베스트셀러
                </a>
              </li>
              <li>
                <a href="/new" className="hover:text-blue-400 transition">
                  신간
                </a>
              </li>
              <li>
                <a href="/favorites" className="hover:text-blue-400 transition">
                  찜목록
                </a>
              </li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h3 className="font-semibold text-white mb-4">정보</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Powered by Aladin API</li>
              <li>© 2024 CheckZip</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">
          <p>모든 도서 정보는 알라딘에서 제공됩니다.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
