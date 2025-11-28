import React, { useEffect, useState, useCallback } from "react";
import Header from "../components/common/Header";
import BookCard from "../components/book/BookCard";
import BookDetailModal from "../components/book/BookDetailModal";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import AladinAPI from "../services/aladinAPI";

export default function NewBooksPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const result = await AladinAPI.getNewBooks(page);

    setBooks((prev) => [...prev, ...(result.item || [])]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [page, loading]);

  useInfiniteScroll(loadMore);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">신간 도서</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.itemId}
              book={book}
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-6">
            <div className="spinner" />
          </div>
        )}
      </div>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
