import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookModel } from "../../models/BookModel";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";
import { ReviewModel } from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { useOktaAuth } from "@okta/okta-react";
import * as ITBooksAPI from "../../services/itbooks-api";
import * as BooksAPI from "../../services/books-api";
import * as ReviewsAPI from "../../services/reviews-api";

export const BookCheckoutPage = () => {
  const { authState } = useOktaAuth();
  const { isbn } = useParams();
  const he = require("he");

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
    useState(true);

  // Is Book Check Out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

  useEffect(() => {
    isbn &&
      ITBooksAPI.getBookByISBN(isbn)
        .then((resultData: any) => setBook(resultData))
        .catch((error: any) => {
          setHttpError(error.message);
        });
    setIsLoading(false);
  }, [isbn]);

  useEffect(() => {
    isbn &&
      ReviewsAPI.getReviewsByISBN(isbn)
        .then((resultData: any) => {
          if (resultData._embedded && resultData._embedded.reviews.length > 0) {
            const allReviews = resultData._embedded.reviews;
            setReviews(allReviews);
            const totalReviews = allReviews.length;
            let totalRating: number = allReviews
              .map((review: ReviewModel) => review.rating)
              .reduce((acc: number, rating: number) => acc + rating);
            const averageRating = (
              Math.round((totalRating / totalReviews) * 2) / 2
            ).toFixed(1);
            setTotalStars(Number(averageRating));
          }
        })
        .catch((error: any) => {
          setHttpError(error.message);
        });
    setIsLoadingReviews(false);
  }, [isbn]);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const config = {
        headers: {
          Authorization: "Bearer " + authState.accessToken?.accessToken,
          "Content-Type": "application/json",
        },
      };

      BooksAPI.getUserCurrentLoansCount(config)
        .then((resultData: any) => setCurrentLoansCount(resultData))
        .catch((error: any) => {
          setHttpError(error.message);
        });
    }
    setIsLoadingCurrentLoansCount(false);
  }, [authState]);

  useEffect(() => {
    if (isbn && authState && authState.isAuthenticated) {
      const config = {
        headers: {
          Authorization: "Bearer " + authState.accessToken?.accessToken,
          "Content-Type": "application/json",
        },
      };

      BooksAPI.getIsCheckedOutByUser(isbn, config)
        .then((resultData: any) => setIsCheckedOut(resultData))
        .catch((error: any) => {
          setHttpError(error.message);
        });
    }
    setIsLoadingBookCheckedOut(false);
  }, [isbn, authState]);

  if (isLoading || isLoadingReviews || isLoadingCurrentLoansCount) {
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
    <>
      {book && (
        <div>
          <div className="container card book d-none d-lg-block">
            <div className="row mt-5">
              <div className="col-sm-3 col-md-3">
                <img src={book.image} alt="Book" />
              </div>
              <div className="col-4 col-md-4 container">
                <div className="ml-2 card-body">
                  <h2 className="card-title">{book.title}</h2>
                  <h5 className="mb-3 text-primary">{book.authors}</h5>
                  <p className="m-0 text-muted">Released: {book.year}</p>
                  <p className="m-0 text-muted">
                    Publisher(s): {book?.publisher}
                  </p>
                  <p className="m-0 text-muted">Pages: {book.pages}</p>
                  <p className="m-0 text-muted">ISBN: {book.isbn13}</p>
                  <p className="mt-3 lead">{he.decode(book.desc)}</p>
                  <StarsReview rating={totalStars} size={32} />
                </div>
              </div>
              <CheckoutAndReviewBox
                book={book}
                mobile={false}
                currentLoansCount={currentLoansCount}
                isAuthenticated={authState?.isAuthenticated}
                isCheckedOut={isCheckedOut}
              />
            </div>
            <hr />
            <LatestReviews
              reviews={reviews}
              isbn={book.isbn13}
              mobile={false}
            />
          </div>
          <div className="container d-lg-none mt-5">
            <div className="d-flex justify-content-center alighn-items-center">
              <img src={book.image} alt="Book" />
            </div>
            <div className="mt-4">
              <div className="ml-2">
                <h2>{book.title}</h2>
                <h5 className="mb-3 text-primary">{book.authors}</h5>
                <p className="m-0 text-muted">Released: {book.year}</p>
                <p className="m-0 text-muted">Publisher(s): {book.publisher}</p>
                <p className="m-0 text-muted">Pages: {book.pages}</p>
                <p className="m-0 text-muted">ISBN: {book.isbn13}</p>
                <p className="mt-3 lead">{he.decode(book.desc)}</p>
                <StarsReview rating={totalStars} size={32} />
              </div>
            </div>
            <CheckoutAndReviewBox
              book={book}
              mobile={true}
              currentLoansCount={currentLoansCount}
              isAuthenticated={authState?.isAuthenticated}
              isCheckedOut={isCheckedOut}
            />
            <hr />
            <LatestReviews reviews={reviews} isbn={book.isbn13} mobile={true} />
          </div>
        </div>
      )}
    </>
  );
};
