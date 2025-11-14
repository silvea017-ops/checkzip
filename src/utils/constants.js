// utils/constants.js

// 카테고리 정의 (알라딘 API CategoryId 기준)
export const CATEGORIES = [
  { id: 0, name: "전체", icon: "📚", color: "#6C63FF" },
  { id: 1, name: "소설", icon: "📖", color: "#FF6B9D" },
  { id: 336, name: "경제경영", icon: "💼", color: "#4CAF50" },
  { id: 351, name: "자기계발", icon: "🌱", color: "#FFC107" },
  { id: 798, name: "에세이", icon: "✍️", color: "#9C27B0" },
  { id: 656, name: "건강", icon: "💪", color: "#00BCD4" },
  { id: 50, name: "어린이", icon: "🧒", color: "#FF9800" },
  { id: 108, name: "과학", icon: "🔬", color: "#3F51B5" },
];

// 온보딩 장르 선택 옵션
export const GENRE_OPTIONS = [
  { id: 1, name: "소설/문학", icon: "📖", categoryId: 1 },
  { id: 2, name: "경제/경영", icon: "💼", categoryId: 336 },
  { id: 3, name: "자기계발", icon: "🌱", categoryId: 351 },
  { id: 4, name: "에세이", icon: "✍️", categoryId: 798 },
  { id: 5, name: "인문/사회", icon: "🧠", categoryId: 656 },
  { id: 6, name: "과학/기술", icon: "🔬", categoryId: 108 },
  { id: 7, name: "예술/문화", icon: "🎨", categoryId: 55890 },
  { id: 8, name: "건강/취미", icon: "💪", categoryId: 55889 },
];

// 검색 타입
export const SEARCH_TYPES = [
  { value: "Title", label: "제목" },
  { value: "Author", label: "저자" },
  { value: "Publisher", label: "출판사" },
  { value: "Keyword", label: "키워드" },
];

// 정렬 옵션
export const SORT_OPTIONS = [
  { value: "Accuracy", label: "정확도순" },
  { value: "PublishTime", label: "출간일순" },
  { value: "Title", label: "제목순" },
  { value: "SalesPoint", label: "판매량순" },
  { value: "CustomerRating", label: "평점순" },
];

// 색상 테마
export const COLORS = {
  primary: "#6C63FF",
  secondary: "#FFD66C",
  background: "#F5F5F5",
  text: "#1E1E1E",
  textLight: "#666666",
  border: "#E0E0E0",
  cardBg: "#FFFFFF",
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FF9800",
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  SELECTED_GENRES: "aladin_selected_genres",
  FAVORITE_BOOKS: "aladin_favorite_books",
  SEARCH_HISTORY: "aladin_search_history",
  ONBOARDING_COMPLETE: "aladin_onboarding_complete",
};
