// utils/constants.js

// 카테고리 정의 (연파랑/남색 테마)
export const CATEGORIES = [
  { id: 0, name: "전체", icon: "📚", color: "#1E3A8A" },
  { id: 1, name: "소설", icon: "📖", color: "#3B82F6" },
  { id: 336, name: "경제경영", icon: "💼", color: "#2563EB" },
  { id: 351, name: "자기계발", icon: "🌱", color: "#60A5FA" },
  { id: 798, name: "에세이", icon: "✍️", color: "#1D4ED8" },
  { id: 656, name: "건강", icon: "💪", color: "#3B82F6" },
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
];

// 인기 검색어
export const POPULAR_SEARCHES = [
  "퓨처 셀프",
  "트렌드 코리아 2025",
  "세이노의 가르침",
  "불편한 편의점",
  "데일 카네기 인간관계론",
  "아몬드",
  "역행자",
  "관계의 본질",
];

// 색상 테마 (연파랑/남색)
export const COLORS = {
  primary: "#2563EB", // 밝은 파랑
  primaryDark: "#1E3A8A", // 남색
  secondary: "#60A5FA", // 연파랑
  accent: "#3B82F6", // 중간 파랑
  background: "#F8FAFC",
  text: "#1E293B",
  textLight: "#64748B",
  border: "#E2E8F0",
  cardBg: "#FFFFFF",
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  SELECTED_GENRES: "aladin_selected_genres",
  FAVORITE_BOOKS: "aladin_favorite_books",
  SEARCH_HISTORY: "aladin_search_history",
  ONBOARDING_COMPLETE: "aladin_onboarding_complete",
};
