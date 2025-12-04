// services/aladinAPI.js

const AladinAPI = {
  // API 설정
  TTB_KEY: import.meta.env.VITE_TTB_KEY,
  PROXY_URL: import.meta.env.VITE_PROXY_URL,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  /**
   * URL 생성 헬퍼
   */
  buildUrl: (endpoint, params) => {
    const queryString = new URLSearchParams(params).toString();
    const aladinUrl = `${AladinAPI.BASE_URL}${endpoint}?${queryString}`;
    return `${AladinAPI.PROXY_URL}${encodeURIComponent(aladinUrl)}`;
  },

  /**
   * 이미지 URL을 고화질로 변환
   */
  enhanceImageQuality: (item) => {
    if (!item) return item;

    if (item.cover) {
      item.cover = item.cover
        .replace("/cover200/", "/cover500/")
        .replace("_200.", "_500.");
    }

    return item;
  },

  /**
   * 응답 데이터의 모든 이미지를 고화질로 변환
   */
  enhanceAllImages: (data) => {
    if (data && data.item && Array.isArray(data.item)) {
      data.item = data.item.map((item) => AladinAPI.enhanceImageQuality(item));
    }
    return data;
  },

  /**
   * 베스트셀러 가져오기
   */
  getBestSeller: async (start = 0, maxResults = 20) => {
    try {
      const url = AladinAPI.buildUrl("/ItemList.aspx", {
        ttbkey: AladinAPI.TTB_KEY,
        QueryType: "Bestseller",
        MaxResults: maxResults,
        start: start,
        SearchTarget: "Book",
        output: "js",
        Version: "20131101",
        Cover: "Big",
      });

      console.log("BestSeller URL:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Bestsellers fetched:", data.item?.length);

      const enhancedData = AladinAPI.enhanceAllImages(data);
      return enhancedData;
    } catch (error) {
      console.error("Error fetching bestsellers:", error);
      return { item: [] };
    }
  },

  /**
   * 신간 도서 가져오기
   */
  getNewBooks: async (start = 0, maxResults = 20) => {
    try {
      const url = AladinAPI.buildUrl("/ItemList.aspx", {
        ttbkey: AladinAPI.TTB_KEY,
        QueryType: "ItemNewAll",
        MaxResults: maxResults,
        start: start,
        SearchTarget: "Book",
        output: "js",
        Version: "20131101",
        Cover: "Big",
      });

      console.log("NewBooks URL:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("New books fetched:", data.item?.length);

      const enhancedData = AladinAPI.enhanceAllImages(data);
      return enhancedData;
    } catch (error) {
      console.error("Error fetching new books:", error);
      return { item: [] };
    }
  },

  /**
   * 검색
   */
  search: async (query, searchType = "Title", start = 1, maxResults = 20) => {
    try {
      const url = AladinAPI.buildUrl("/ItemSearch.aspx", {
        ttbkey: AladinAPI.TTB_KEY,
        Query: query,
        QueryType: searchType,
        MaxResults: maxResults,
        start: start,
        SearchTarget: "Book",
        output: "js",
        Version: "20131101",
        Cover: "Big",
      });

      console.log("Search URL:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Search results:",
        data.item?.length,
        "books for query:",
        query
      );

      const enhancedData = AladinAPI.enhanceAllImages(data);
      return enhancedData;
    } catch (error) {
      console.error("Error searching books:", error);
      return { item: [] };
    }
  },

  /**
   * 장르명을 알라딘 카테고리 ID로 매핑
   */
  getGenreCategoryId: (genreName) => {
    const categoryMap = {
      "소설/문학": "1",
      "경제/경영": "170",
      자기계발: "336",
      에세이: "1383",
      "인문/사회": "798",
      "과학/기술": "987",
      "예술/문화": "1237",
      "건강/취미": "1108",
      소설: "1",
      에세이: "1383",
      자기계발: "336",
      경제: "170",
      경영: "170",
      과학: "987",
      역사: "2551",
    };
    return categoryMap[genreName] || "0";
  },

  /**
   * 맞춤 추천 (설문조사 결과 기반) - 개선된 버전
   * 여러 전략을 시도하여 결과 확보
   */
  getRecommendedBooks: async (genres, goal, time) => {
    try {
      console.log("=== 추천 시작 ===");
      console.log("입력값:", { genres, goal, time });

      let allBooks = [];

      // 전략 1: 각 장르별로 베스트셀러 가져오기
      for (const genre of genres) {
        const categoryId = AladinAPI.getGenreCategoryId(genre);
        console.log(`${genre} 장르 (카테고리 ID: ${categoryId}) 검색 중...`);

        try {
          const url = AladinAPI.buildUrl("/ItemList.aspx", {
            ttbkey: AladinAPI.TTB_KEY,
            QueryType: "Bestseller",
            MaxResults: 10,
            start: 1,
            SearchTarget: "Book",
            CategoryId: categoryId,
            output: "js",
            Version: "20131101",
            Cover: "Big",
          });

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data.item && data.item.length > 0) {
              console.log(`${genre}: ${data.item.length}권 찾음`);
              allBooks = allBooks.concat(data.item);
            }
          }
        } catch (error) {
          console.error(`${genre} 검색 실패:`, error);
        }
      }

      // 전략 2: 장르 키워드로 직접 검색
      if (allBooks.length < 5) {
        console.log("베스트셀러로 충분하지 않음, 키워드 검색 시도...");

        for (const genre of genres.slice(0, 2)) {
          // 처음 2개 장르만
          try {
            const url = AladinAPI.buildUrl("/ItemSearch.aspx", {
              ttbkey: AladinAPI.TTB_KEY,
              Query: genre,
              QueryType: "Keyword",
              MaxResults: 10,
              start: 1,
              SearchTarget: "Book",
              output: "js",
              Version: "20131101",
              Cover: "Big",
            });

            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              if (data.item && data.item.length > 0) {
                console.log(`키워드 "${genre}": ${data.item.length}권 찾음`);
                allBooks = allBooks.concat(data.item);
              }
            }
          } catch (error) {
            console.error(`키워드 "${genre}" 검색 실패:`, error);
          }
        }
      }

      // 전략 3: 여전히 부족하면 전체 베스트셀러 가져오기
      if (allBooks.length < 5) {
        console.log("여전히 부족함, 전체 베스트셀러 사용...");
        const fallbackData = await AladinAPI.getBestSeller(0, 20);
        if (fallbackData.item && fallbackData.item.length > 0) {
          allBooks = allBooks.concat(fallbackData.item);
        }
      }

      // 중복 제거
      const uniqueBooks = [];
      const seenIds = new Set();

      for (const book of allBooks) {
        if (!seenIds.has(book.itemId)) {
          seenIds.add(book.itemId);
          uniqueBooks.push(book);
        }
      }

      console.log(`총 ${uniqueBooks.length}권의 고유한 책 발견`);

      // 이미지 품질 향상 및 15개로 제한
      const enhancedData = AladinAPI.enhanceAllImages({ item: uniqueBooks });
      const finalBooks = enhancedData.item.slice(0, 15);

      console.log(`최종 추천: ${finalBooks.length}권`);
      console.log("=== 추천 완료 ===");

      return { item: finalBooks };
    } catch (error) {
      console.error("추천 오류:", error);
      // 오류 발생 시 베스트셀러 반환
      console.log("오류 발생, 베스트셀러로 대체");
      return await AladinAPI.getBestSeller(0, 15);
    }
  },

  /**
   * 빠른 추천 (나만의 책 고르기) - 개선된 버전
   */
  getQuickRecommendations: async (mood, length, genre) => {
    try {
      console.log("=== 빠른 추천 시작 ===");
      console.log("입력값:", { mood, length, genre });

      let books = [];

      // 전략 1: 장르의 카테고리 ID로 베스트셀러 검색
      const categoryId = AladinAPI.getGenreCategoryId(genre);
      console.log(`카테고리 ID ${categoryId}로 검색 중...`);

      try {
        const url = AladinAPI.buildUrl("/ItemList.aspx", {
          ttbkey: AladinAPI.TTB_KEY,
          QueryType: "Bestseller",
          MaxResults: 15,
          start: 1,
          SearchTarget: "Book",
          CategoryId: categoryId,
          output: "js",
          Version: "20131101",
          Cover: "Big",
        });

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.item && data.item.length > 0) {
            console.log(`베스트셀러에서 ${data.item.length}권 찾음`);
            books = data.item;
          }
        }
      } catch (error) {
        console.error("베스트셀러 검색 실패:", error);
      }

      // 전략 2: 장르 키워드로 검색
      if (books.length < 5) {
        console.log("베스트셀러 부족, 키워드 검색 시도...");

        try {
          const url = AladinAPI.buildUrl("/ItemSearch.aspx", {
            ttbkey: AladinAPI.TTB_KEY,
            Query: genre,
            QueryType: "Keyword",
            MaxResults: 15,
            start: 1,
            SearchTarget: "Book",
            output: "js",
            Version: "20131101",
            Cover: "Big",
          });

          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data.item && data.item.length > 0) {
              console.log(`키워드 검색에서 ${data.item.length}권 찾음`);
              books = books.concat(data.item);
            }
          }
        } catch (error) {
          console.error("키워드 검색 실패:", error);
        }
      }

      // 전략 3: 여전히 부족하면 신간 도서 사용
      if (books.length < 5) {
        console.log("여전히 부족함, 신간 도서 사용...");
        const fallbackData = await AladinAPI.getNewBooks(0, 12);
        if (fallbackData.item && fallbackData.item.length > 0) {
          books = books.concat(fallbackData.item);
        }
      }

      // 중복 제거
      const uniqueBooks = [];
      const seenIds = new Set();

      for (const book of books) {
        if (!seenIds.has(book.itemId)) {
          seenIds.add(book.itemId);
          uniqueBooks.push(book);
        }
      }

      console.log(`총 ${uniqueBooks.length}권의 고유한 책 발견`);

      // 이미지 품질 향상 및 12개로 제한
      const enhancedData = AladinAPI.enhanceAllImages({ item: uniqueBooks });
      const finalBooks = enhancedData.item.slice(0, 12);

      console.log(`최종 추천: ${finalBooks.length}권`);
      console.log("=== 빠른 추천 완료 ===");

      return { item: finalBooks };
    } catch (error) {
      console.error("빠른 추천 오류:", error);
      // 오류 발생 시 신간 도서 반환
      console.log("오류 발생, 신간 도서로 대체");
      return await AladinAPI.getNewBooks(0, 12);
    }
  },

  /**
   * 카테고리별 도서 가져오기
   */
  getBooksByCategory: async (categoryId, start = 1, maxResults = 20) => {
    try {
      const url = AladinAPI.buildUrl("/ItemList.aspx", {
        ttbkey: AladinAPI.TTB_KEY,
        QueryType: "ItemNewSpecial",
        SearchTarget: "Book",
        CategoryId: categoryId,
        MaxResults: maxResults,
        start: start,
        output: "js",
        Version: "20131101",
        Cover: "Big",
      });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const enhancedData = AladinAPI.enhanceAllImages(data);
      return enhancedData;
    } catch (error) {
      console.error("Error fetching books by category:", error);
      return { item: [] };
    }
  },

  /**
   * 도서 상세 정보
   */
  getDetail: async (itemId) => {
    try {
      const url = AladinAPI.buildUrl("/ItemLookUp.aspx", {
        ttbkey: AladinAPI.TTB_KEY,
        itemIdType: "ItemId",
        ItemId: itemId,
        output: "js",
        Version: "20131101",
        OptResult: "ebookList,usedList,reviewList",
        Cover: "Big",
      });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.item && data.item.length > 0) {
        data.item[0] = AladinAPI.enhanceImageQuality(data.item[0]);
      }

      return data;
    } catch (error) {
      console.error("Error fetching book detail:", error);
      throw error;
    }
  },
};

export default AladinAPI;
