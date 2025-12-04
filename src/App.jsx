console.log("🔍 Environment Variables:", {
  TTB_KEY: import.meta.env.VITE_TTB_KEY,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  PROXY_URL: import.meta.env.VITE_PROXY_URL,
});

// App.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Sparkles } from "lucide-react";

import AladinAPI from "./services/aladinAPI";
import Header from "./components/common/Header";
import HeroWithSwiper from "./components/home/HeroWithSwiper";
import SearchSection from "./components/home/SearchSection";
import InfiniteScrollBanner from "./components/home/InfiniteScrollBanner";
import BookSlider from "./components/book/BookSlider";
import BookDetailModal from "./components/book/BookDetailModal";
import OnboardingSurvey from "./components/onboarding/OnboardingSurvey";
import QuickRecommendSurvey from "./components/onboarding/QuickRecommendSurvey";
import RecommendationPage from "./components/recommendation/RecommendationPage";
import Loading from "./components/common/Loading";
import SearchResults from "./components/search/SearchResults";

export default function App() {
  const navigate = useNavigate();

  const [bestSellers, setBestSellers] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [showQuickSurvey, setShowQuickSurvey] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 추천 페이지 상태
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [recommendContext, setRecommendContext] = useState(null);

  // 네비게이션 클릭 처리 - navigate 사용
  const handleNavClick = (page) => {
    if (page === "recommendation") {
      setShowSurvey(true);
    } else if (page === "bestseller") {
      navigate("/bestseller");
    } else if (page === "new") {
      navigate("/new");
    }
  };

  // 로고 클릭 → 홈으로 초기화
  const handleLogoClick = () => {
    console.log("Logo clicked, resetting...");
    setSearchResults([]);
    setSearchQuery("");
    setSelectedBook(null);
    setShowRecommendation(false);
    setRecommendedBooks([]);
    setRecommendContext(null);
    navigate("/"); // React Router의 navigate 사용
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 책 API 불러오기
  const loadBooks = async () => {
    setLoading(true);
    try {
      console.log("Loading bestsellers and new books...");
      const [best, newB] = await Promise.all([
        AladinAPI.getBestSeller(0),
        AladinAPI.getNewBooks(0),
      ]);

      console.log("Books loaded:", {
        bestsellers: best.item?.length,
        newBooks: newB.item?.length,
      });

      setBestSellers(best.item || []);
      setNewBooks(newB.item || []);
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 최초 실행 시 책 로딩
  useEffect(() => {
    console.log("App mounted, loading books...");
    loadBooks();
  }, []);

  // 검색 처리
  const handleSearch = async (query, searchType = "Title") => {
    if (!query.trim()) return;

    console.log("Searching for:", query, "Type:", searchType);
    setIsSearching(true);
    setSearchQuery(query);
    setShowRecommendation(false);

    try {
      const data = await AladinAPI.search(query, searchType);
      console.log("Search results:", data.item?.length, "books");
      setSearchResults(data.item || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookClick = (book) => {
    console.log("Opening book detail for:", book.title);
    setSelectedBook(book);
  };

  const handleSurveyComplete = async (surveyData) => {
    console.log("Survey completed with data:", surveyData);
    setShowSurvey(false);
    setLoading(true);

    try {
      const GENRE_MAP = {
        1: "소설/문학",
        2: "경제/경영",
        3: "자기계발",
        4: "에세이",
        5: "인문/사회",
        6: "과학/기술",
        7: "예술/문화",
        8: "건강/취미",
      };

      const genreNames = surveyData.genres
        .map((id) => GENRE_MAP[id])
        .filter(Boolean);

      const data = await AladinAPI.getRecommendedBooks(
        genreNames,
        surveyData.goal,
        surveyData.time
      );

      setRecommendedBooks(data.item || []);
      setRecommendContext({
        type: "full",
        genres: genreNames,
        goal: surveyData.goal,
        time: surveyData.time,
      });
      setShowRecommendation(true);
      setSearchResults([]);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  // 빠른 설문 완료
  const handleQuickSurveyComplete = async (quickData) => {
    console.log("Quick survey completed:", quickData);
    setShowQuickSurvey(false);
    setLoading(true);

    try {
      const data = await AladinAPI.getQuickRecommendations(
        quickData.mood,
        quickData.length,
        quickData.genre
      );

      setRecommendedBooks(data.item || []);
      setRecommendContext({
        type: "quick",
        mood: quickData.mood,
        length: quickData.length,
        genre: quickData.genre,
      });
      setShowRecommendation(true);
      setSearchResults([]);
    } catch (error) {
      console.error("Failed to load quick recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  // UI 렌더링
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <Header onLogoClick={handleLogoClick} onNavClick={handleNavClick} />

      {/* 추천 결과 페이지 */}
      {showRecommendation ? (
        <RecommendationPage
          books={recommendedBooks}
          context={recommendContext}
          onBookClick={handleBookClick}
          onBack={handleLogoClick}
        />
      ) : (
        <>
          {/* 히어로 섹션 with 스와이퍼 */}
          <HeroWithSwiper
            onSurveyClick={() => setShowSurvey(true)}
            onQuickRecommendClick={() => setShowQuickSurvey(true)}
          />

          {/* 검색 섹션 */}
          <section className="bg-white py-8 border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4">
              <SearchSection
                onSearch={handleSearch}
                initialQuery={searchQuery}
              />
            </div>
          </section>

          {/* 검색 결과 */}
          {searchResults.length > 0 && (
            <SearchResults
              results={searchResults}
              loading={isSearching}
              onBookClick={handleBookClick}
              query={searchQuery}
            />
          )}

          {/* 무한 스크롤 배너 */}
          {!isSearching && searchResults.length === 0 && (
            <InfiniteScrollBanner books={bestSellers} />
          )}

          {/* 베스트셀러 & 신간 */}
          {!isSearching && searchResults.length === 0 && (
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
              <BookSlider
                books={bestSellers}
                onBookClick={handleBookClick}
                title="베스트셀러 추천"
                icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
              />

              <BookSlider
                books={newBooks}
                onBookClick={handleBookClick}
                title="신간 도서"
                icon={<Sparkles className="w-6 h-6 text-blue-600" />}
              />
            </div>
          )}
        </>
      )}

      {/* 로딩 */}
      {(loading || isSearching) && <Loading />}

      {/* 도서 상세 모달 */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {/* 전체 설문조사 모달 */}
      {showSurvey && (
        <OnboardingSurvey
          onComplete={handleSurveyComplete}
          onClose={() => setShowSurvey(false)}
        />
      )}

      {/* 빠른 설문조사 모달 */}
      {showQuickSurvey && (
        <QuickRecommendSurvey
          onComplete={handleQuickSurveyComplete}
          onClose={() => setShowQuickSurvey(false)}
        />
      )}
    </div>
  );
}
