import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookModel } from "../../models/BookModel";
import { Pagination } from "../Utils/Pagination";
import { SearchBooksItem } from "./components/SearchBooksItem";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import * as BooksAPI from "../../services/itbooks-api";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { query, num } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    query && query.trim().length === 0 && navigate(`/search`);
    query && Number(num) === 1 && navigate(`/search/query/${query}`);
    if (query) {
      setSearchQuery(query);
      setSearchInput(query);
    } else {
      setSearchQuery(BooksAPI.defaultQuery);
    }
    num && setCurrentPage(Number(num));
  }, [num, query]);

  const startSearch = () => {
    if (searchInput.trim().length > 0) {
      setCurrentPage(1);
      setSearchQuery(searchInput.trim());
    }
  };

  useEffect(() => {
    console.log(searchQuery, currentPage);
    searchQuery.length > 0 &&
      BooksAPI.searchBooks(searchQuery, currentPage)
        .then((resultData: any) => {
          setBooks(resultData.books);
          const total = Math.min(resultData.total, 1000);
          setTotalBooks(total);
          setTotalPages(Math.ceil(total / 10));
        })
        .catch((error: any) => {
          setHttpError(error.message);
        });
    window.scrollTo(0, 0);
    setIsLoading(false);
  }, [currentPage, searchQuery]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

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
        <div className="row mt-5">
          <div className="col-12">
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-labelledby="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="btn btn-outline-success" onClick={startSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        {totalBooks > 0 ? (
          <>
            <div className="mt-3">
              <h5>Number of results: ({totalBooks})</h5>
            </div>
            <p>
              {currentPage * 10 - 9} to {Math.min(currentPage * 10, totalBooks)}{" "}
              of {totalBooks} items:
            </p>
            <div className="row grid-style">
              {books.map((book) => (
                <SearchBooksItem book={book} key={book.isbn13} />
              ))}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  searchQuery={searchQuery}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </>
        ) : (
          <div className="m-5 text-center">
            <h3>Can't find what you are looking for?</h3>
            <a
              type="button"
              className="btn btn-outline-primary main-color px-4 fw-bold text-white"
              href="#"
            >
              Library Services
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
