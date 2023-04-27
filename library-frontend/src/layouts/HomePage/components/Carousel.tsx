import { useEffect, useState } from "react";
import { BookItem } from "./BookItem";
import { BookModel } from "../../../models/BookModel";
import * as BooksAPI from "../../../services/itbooks-api";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

interface Response {
  title: string;
  subtitle: string;
  isbn13: string;
  image: string;
  url: string;
}

export const Carousel = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    BooksAPI.getNewBooks()
      .then((resultData: any) => resultData.books)
      .then((books: any) => {
        setBooks(books.sort(() => 0.5 - Math.random()).slice(0, 9));
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
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next book</h3>
      </div>

      {isLoading || books.length === 0 ? (
        <SpinnerLoading />
      ) : (
        <>
          {/* Desktop */}
          <div
            id="carouselControls"
            className="carousel carousel-dark slide mt-5 d-none d-lg-block"
            data-bs-interval="false"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row d-flex justify-content-center align-items-center">
                  {books.slice(0, 3).map((book) => (
                    <BookItem book={book} key={book.isbn13} />
                  ))}
                </div>
              </div>

              <div className="carousel-item">
                <div className="row d-flex justify-content-center align-items-center">
                  {books.slice(3, 6).map((book) => (
                    <BookItem book={book} key={book.isbn13} />
                  ))}
                </div>
              </div>

              <div className="carousel-item">
                <div className="row d-flex justify-content-center align-items-center">
                  {books.slice(6, 9).map((book) => (
                    <BookItem book={book} key={book.isbn13} />
                  ))}
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Mobile */}
          <div className="d-lg-none mt-3">
            <div className="row d-flex justify-content-center align-items-center">
              <BookItem
                book={books[Math.floor(Math.random() * books.length)]}
              />
            </div>
          </div>
          <div className="homepage-carousel-title mt-3">
            <a className="btn btn-outline-secondary btn-lg" href="#">
              View More
            </a>
          </div>
        </>
      )}
    </div>
  );
};
