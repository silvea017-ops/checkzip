// pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { TrendingUp, Sparkles, Book } from "lucide-react";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/home/CategoryFilter";
import BookSlider from "../components/home/BookSlider";
import AladinAPI from "../services/aladinAPI";
import { STORAGE_KEYS } from "../utils/constants";

const HomePage = ({ onBookClick, onSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [recommendBooks, setRecommendBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    loadBooks();
  }, [selectedCategory]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      // 베스트셀러 가져오기
      const bestSellerData = await AladinAPI.getBestSeller(selectedCategory);
      setBestSellers(bestSellerData.item || []);

      // 신간 가져오기
      const newBooksData = await AladinAPI.getNewBooks(selectedCategory);
      setNewBooks(newBooksData.item || []);

      // 맞춤 추천 (사용자 선택 장르 기반)
      const savedGenres = localStorage.getItem(STORAGE_KEYS.SELECTED_GENRES);
      if (savedGenres) {
        const genres = JSON.parse(savedGenres);
        if (genres.length > 0) {
          const randomGenre = genres[Math.floor(Math.random() * genres.length)];
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
          const categoryId = genreMap[randomGenre] || 0;
          const recommendData = await AladinAPI.getBestSeller(categoryId);
          setRecommendBooks(recommendData.item || []);
        }
      }
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-[#6C63FF] to-[#9C8FFF] py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              당신을 위한 책을 찾아보세요
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              AI 기반 맞춤 추천으로 새로운 독서 경험을
            </p>
          </div>

          {/* 검색바 */}
          <SearchBar onSearch={onSearch} />
        </div>
      </section>

      {/* 카테고리 필터 */}
      <div className="max-w-7xl mx-auto pt-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6C63FF] border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* 맞춤 추천 */}
            {recommendBooks.length > 0 && (
              <BookSlider
                title="당신을 위한 추천"
                icon="✨"
                books={recommendBooks}
                onBookClick={onBookClick}
                cardSize="large"
              />
            )}

            {/* 베스트셀러 */}
            <BookSlider
              title="베스트셀러"
              icon="🔥"
              books={bestSellers}
              onBookClick={onBookClick}
            />

            {/* 신간 도서 */}
            <BookSlider
              title="신간 도서"
              icon="📚"
              books={newBooks}
              onBookClick={onBookClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
