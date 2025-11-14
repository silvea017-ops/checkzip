import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Book,
  User,
  TrendingUp,
  Sparkles,
  Check,
  ArrowRight,
  Calendar,
  Building,
} from "lucide-react";

// ============ 상수 ============
const CATEGORIES = [
  { id: 0, name: "전체", icon: "📚" },
  { id: 1, name: "소설", icon: "📖" },
  { id: 336, name: "경제경영", icon: "💼" },
  { id: 351, name: "자기계발", icon: "🌱" },
  { id: 798, name: "에세이", icon: "✍️" },
  { id: 656, name: "건강", icon: "💪" },
];

const GENRE_OPTIONS = [
  { id: 1, name: "소설/문학", icon: "📖", categoryId: 1 },
  { id: 2, name: "경제/경영", icon: "💼", categoryId: 336 },
  { id: 3, name: "자기계발", icon: "🌱", categoryId: 351 },
  { id: 4, name: "에세이", icon: "✍️", categoryId: 798 },
  { id: 5, name: "인문/사회", icon: "🧠", categoryId: 656 },
  { id: 6, name: "과학/기술", icon: "🔬", categoryId: 108 },
  { id: 7, name: "예술/문화", icon: "🎨", categoryId: 55890 },
  { id: 8, name: "건강/취미", icon: "💪", categoryId: 55889 },
];

const SEARCH_TYPES = [
  { value: "Title", label: "제목" },
  { value: "Author", label: "저자" },
  { value: "Publisher", label: "출판사" },
];

// ============ API Service ============
const AladinAPI = {
  TTB_KEY: "ttbdlsgks12031544001",
  BASE_URL: "https://www.aladin.co.kr/ttb/api",

  search: async (query, queryType = "Title") => {
    try {
      const url = `${AladinAPI.BASE_URL}/ItemSearch.aspx?ttbkey=${
        AladinAPI.TTB_KEY
      }&Query=${encodeURIComponent(
        query
      )}&QueryType=${queryType}&MaxResults=20&start=1&SearchTarget=Book&output=js&Version=20131101`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Search Error:", error);
      return { item: [] };
    }
  },

  getBestSeller: async (categoryId = 0) => {
    try {
      const url = `${AladinAPI.BASE_URL}/ItemList.aspx?ttbkey=${AladinAPI.TTB_KEY}&QueryType=BestSeller&MaxResults=20&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=${categoryId}`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("BestSeller Error:", error);
      return { item: [] };
    }
  },

  getNewBooks: async (categoryId = 0) => {
    try {
      const url = `${AladinAPI.BASE_URL}/ItemList.aspx?ttbkey=${AladinAPI.TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=20&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=${categoryId}`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("NewBooks Error:", error);
      return { item: [] };
    }
  },
};

// ============ BookCard 컴포넌트 ============
const BookCard = ({ book, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      onClick={() => onClick(book)}
      className="w-40 sm:w-48 flex-shrink-0 cursor-pointer group"
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all">
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFavorite(!isFavorite);
                }}
                className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-sm sm:text-base text-[#1E1E1E] line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#666] line-clamp-1 mb-2">
            {book.author}
          </p>
          {book.customerReviewRank && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-[#FFD66C] text-[#FFD66C]" />
              <span className="text-sm font-medium">
                {(book.customerReviewRank / 2).toFixed(1)}
              </span>
            </div>
          )}
          <div className="text-base font-bold text-[#6C63FF]">
            {book.priceSales?.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ BookSlider 컴포넌트 ============
const BookSlider = ({ title, books, icon, onBookClick }) => {
  const sliderRef = React.useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">
            {title}
          </h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-white shadow-md hover:bg-[#6C63FF] hover:text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-white shadow-md hover:bg-[#6C63FF] hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-0 pb-4"
      >
        {books?.map((book, i) => (
          <BookCard key={book.itemId || i} book={book} onClick={onBookClick} />
        ))}
      </div>
    </section>
  );
};

// ============ 메인 App ============
export default function App() {
  const [page, setPage] = useState("onboarding");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [recommendBooks, setRecommendBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("Title");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("onboarding_complete");
    if (completed) {
      setPage("home");
      const saved = localStorage.getItem("selected_genres");
      if (saved) setSelectedGenres(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (page === "home") {
      loadBooks();
    }
  }, [selectedCategory, page]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const [best, newB] = await Promise.all([
        AladinAPI.getBestSeller(selectedCategory),
        AladinAPI.getNewBooks(selectedCategory),
      ]);
      setBestSellers(best.item || []);
      setNewBooks(newB.item || []);

      if (selectedGenres.length > 0) {
        const genreMap = {
          1: 1,
          2: 336,
          3: 351,
          4: 798,
          5: 656,
          6: 108,
          7: 55890,
          8: 55889,
        };
        const randomGenre =
          selectedGenres[Math.floor(Math.random() * selectedGenres.length)];
        const categoryId = genreMap[randomGenre] || 0;
        const rec = await AladinAPI.getBestSeller(categoryId);
        setRecommendBooks(rec.item || []);
      }
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = (genres) => {
    setSelectedGenres(genres);
    localStorage.setItem("selected_genres", JSON.stringify(genres));
    localStorage.setItem("onboarding_complete", "true");
    setPage("home");
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setPage("search");
    try {
      const data = await AladinAPI.search(searchQuery, searchType);
      setSearchResults(data.item || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========== 온보딩 페이지 ==========
  if (page === "onboarding") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6C63FF] to-[#9C8FFF] flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-6xl">📚</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              어떤 책을 좋아하시나요?
            </h1>
            <p className="text-lg text-white/90">
              관심있는 분야를 선택하면 맞춤 추천을 받을 수 있어요
            </p>
            <p className="text-sm text-white/70 mt-2">
              (최소 1개 이상 선택해주세요)
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {GENRE_OPTIONS.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id);
              return (
                <button
                  key={genre.id}
                  onClick={() =>
                    setSelectedGenres((prev) =>
                      prev.includes(genre.id)
                        ? prev.filter((id) => id !== genre.id)
                        : [...prev, genre.id]
                    )
                  }
                  className={`relative p-6 rounded-2xl transition-all ${
                    isSelected
                      ? "bg-white text-[#6C63FF] shadow-xl scale-105"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#6C63FF] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-4xl mb-3">{genre.icon}</div>
                  <div className="font-bold text-sm">{genre.name}</div>
                </button>
              );
            })}
          </div>
          <div className="text-center">
            <button
              onClick={() =>
                selectedGenres.length > 0 &&
                handleOnboardingComplete(selectedGenres)
              }
              disabled={selectedGenres.length === 0}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all ${
                selectedGenres.length > 0
                  ? "bg-white text-[#6C63FF] hover:shadow-2xl hover:scale-105"
                  : "bg-white/30 text-white/50 cursor-not-allowed"
              }`}
            >
              시작하기 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== 홈 페이지 ==========
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setPage("home")}
            >
              <Book className="w-8 h-8 text-[#6C63FF]" />
              <span className="text-xl font-bold">Aladin Insight</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPage("search")}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 검색 페이지 */}
      {page === "search" && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-2 mb-8">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-3 border rounded-xl"
            >
              {SEARCH_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="검색어를 입력하세요"
              className="flex-1 px-4 py-3 border rounded-xl"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-[#6C63FF] text-white rounded-xl hover:bg-[#5850E6]"
            >
              검색
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6C63FF] border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map((book, i) => (
                <BookCard
                  key={book.itemId || i}
                  book={book}
                  onClick={setSelectedBook}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 홈 페이지 */}
      {page === "home" && (
        <>
          <section className="bg-gradient-to-br from-[#6C63FF] to-[#9C8FFF] py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-4">
                당신을 위한 책을 찾아보세요
              </h1>
              <p className="text-xl text-white/90 mb-8">
                AI 기반 맞춤 추천으로 새로운 독서 경험을
              </p>
              <button
                onClick={() => setPage("search")}
                className="px-8 py-4 bg-white text-[#6C63FF] rounded-2xl font-bold hover:shadow-2xl transition"
              >
                책 검색하기
              </button>
            </div>
          </section>

          <div className="max-w-7xl mx-auto pt-8">
            <div className="flex gap-3 overflow-x-auto px-4 pb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#6C63FF] text-white shadow-lg scale-105"
                      : "bg-white text-[#666] hover:bg-gray-50 shadow-md"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6C63FF] border-t-transparent"></div>
              </div>
            ) : (
              <>
                {recommendBooks.length > 0 && (
                  <BookSlider
                    title="당신을 위한 추천"
                    icon="✨"
                    books={recommendBooks}
                    onBookClick={setSelectedBook}
                  />
                )}
                <BookSlider
                  title="베스트셀러"
                  icon="🔥"
                  books={bestSellers}
                  onBookClick={setSelectedBook}
                />
                <BookSlider
                  title="신간 도서"
                  icon="📚"
                  books={newBooks}
                  onBookClick={setSelectedBook}
                />
              </>
            )}
          </div>
        </>
      )}

      {/* 도서 상세 모달 */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-8 relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col sm:flex-row gap-8">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="w-full sm:w-64 rounded-2xl shadow-xl"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-3">
                  {selectedBook.title}
                </h1>
                <div className="space-y-2 mb-4 text-[#666]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{selectedBook.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{selectedBook.publisher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedBook.pubDate}</span>
                  </div>
                </div>
                {selectedBook.customerReviewRank && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(selectedBook.customerReviewRank / 2)
                              ? "fill-[#FFD66C] text-[#FFD66C]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-lg">
                      {(selectedBook.customerReviewRank / 2).toFixed(1)}
                    </span>
                  </div>
                )}
                <div className="text-3xl font-bold text-[#6C63FF] mb-6">
                  {selectedBook.priceSales?.toLocaleString()}원
                </div>
                <button
                  onClick={() => window.open(selectedBook.link, "_blank")}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#6C63FF] text-white rounded-xl font-bold hover:bg-[#5850E6]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  구매하기
                </button>
                <p className="mt-6 text-[#666] leading-relaxed">
                  {selectedBook.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
