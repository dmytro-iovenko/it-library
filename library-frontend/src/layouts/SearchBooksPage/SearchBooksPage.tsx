import { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SearchBooksItem } from "./components/SearchBooksItem";
import { Pagination } from "../Utils/Pagination";
import * as BooksAPI from "../../services/itbooks-api";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    BooksAPI.searchBooks("sql", currentPage)
      .then((resultData: any) => {
        setBooks(resultData.books);
        setTotalBooks(resultData.total);
        setTotalPages(Math.ceil(resultData.total / 10));
      })
      .catch((error: any) => {
        setHttpError(error.message);
      });
    setIsLoading(false);
  }, [currentPage]);

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        {/* <div> */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-labelledby="Search"
              />
              <button className="btn btn-outline-success">Search</button>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h5>Number of results: ({totalBooks})</h5>
        </div>
        <p>
          {currentPage * 10 - 9} to {Math.min(currentPage * 10, totalBooks)} of{" "}
          {totalBooks} items:
        </p>
        <div className="row grid-style">
          {books.map((book) => (
            <SearchBooksItem book={book} key={book.isbn13} />
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};