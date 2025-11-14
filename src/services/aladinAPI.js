// services/aladinAPI.js

const AladinAPI = {
  TTB_KEY: "ttbjubaekro1123001", // 실제 알라딘 TTB 키로 교체 필요
  BASE_URL: "/aladin-api",

  /**
   * 도서 검색
   * @param {string} query - 검색어
   * @param {string} queryType - Title, Author, Publisher 등
   * @param {number} page - 페이지 번호
   */
  search: async (query, queryType = "Title", page = 1) => {
    try {
      const url = `${AladinAPI.BASE_URL}/ItemSearch.aspx?ttbkey=${
        AladinAPI.TTB_KEY
      }&Query=${encodeURIComponent(
        query
      )}&QueryType=${queryType}&MaxResults=20&start=${page}&SearchTarget=Book&output=js&Version=20131101`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Search API Error:", error);
      throw error;
    }
  },

  /**
   * 도서 상세 정보 조회
   * @param {string} itemId - 도서 ID
   */
  getDetail: async (itemId) => {
    try {
      const url = `${AladinAPI.BASE_URL}/ItemLookUp.aspx?ttbkey=${AladinAPI.TTB_KEY}&itemIdType=ItemId&ItemId=${itemId}&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Detail API Error:", error);
      throw error;
    }
  },

  /**
   * 베스트셀러 목록
   * @param {number} categoryId - 카테고리 ID
   */
  getBestSeller: async (categoryId = 0) => {
    try {
      const url = `${AladinAPI.BASE_URL}/ItemList.aspx?ttbkey=${AladinAPI.TTB_KEY}&QueryType=BestSeller&MaxResults=20&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=${categoryId}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("BestSeller API Error:", error);
      throw error;
    }
  },

  /**
   * 신간 목록
   * @param {number} categoryId - 카테고리 ID
   */
  getNewBooks: async (categoryId = 0) => {
    try {
      const url = `${AladinAPI.BASE_URL}/ItemList.aspx?ttbkey=${AladinAPI.TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=20&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=${categoryId}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("NewBooks API Error:", error);
      throw error;
    }
  },
};

export default AladinAPI;
