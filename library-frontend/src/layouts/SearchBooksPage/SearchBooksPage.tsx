import { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import * as BooksAPI from "../../services/itbooks-api";
import { SearchBooksItem } from "./components/SearchBooksItem";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    BooksAPI.searchBooks("sql", 0)
      .then((resultData: any) => resultData.books)
      .then((books: any) => {
        setBooks(books);
      })
      .catch((error: any) => {
        setHttpError(error.message);
      });
    setIsLoading(false);
  }, []);

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
            <h5>Number of results: (22)</h5>
          </div>
          <p>1 to 5 of 22 items:</p>
          <div className="row grid-style">
            {books.map((book) => (
              <SearchBooksItem book={book} key={book.isbn13} />
            ))}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};
