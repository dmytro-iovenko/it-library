import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookModel } from "../../models/BookModel";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";
import { ReviewModel } from "../../models/ReviewModel";
import { ReviewRequestModel } from "../../models/ReviewRequestModel";
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

  const [isReviewed, setIsReviewed] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

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
  }, [isbn, isCheckedOut]);

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
  }, [isbn, isReviewed]);

  useEffect(() => {
    if (isbn && authState && authState.isAuthenticated) {
      const config = {
        headers: {
          Authorization: "Bearer " + authState.accessToken?.accessToken,
          "Content-Type": "application/json",
        },
      };

      ReviewsAPI.getIsReviewedByUser(isbn, config)
        .then((resultData: any) => setIsReviewed(resultData))
        .catch((error: any) => {
          setHttpError(error.message);
        });
    }
    setIsLoadingUserReview(false);
  }, [isbn, authState]);

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
  }, [authState, isCheckedOut]);

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

  if (
    isLoading ||
    isLoadingReviews ||
    isLoadingCurrentLoansCount ||
    isLoadingBookCheckedOut ||
    isLoadingUserReview
  ) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  //   const checkoutBook = () => {
  //     if (authState && isbn) {
  //       const config = {
  //         headers: {
  //           Authorization: "Bearer " + authState.accessToken?.accessToken,
  //           "Content-Type": "application/json",
  //         },
  //       };

  //       BooksAPI.checkoutBook(isbn, "", config)
  //         .then((resultData: any) => setIsCheckedOut(resultData))
  //         .catch((error: any) => {
  //           setHttpError(error.message);
  //         });
  //     }

  //     setIsCheckedOut(true);
  //   };

  const checkoutBook = async () => {
    const url = `http://localhost:8080/api/books/secure/checkout/?isbn=${book?.isbn13}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsCheckedOut(true);
  };

  const submitReview = async (starInput: number, reviewDescription: string) => {
    if (isbn) {
      const reviewRequestModel = new ReviewRequestModel(
        isbn,
        starInput,
        reviewDescription
      );
      const url = `http://localhost:8080/api/reviews/secure/postReview`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewRequestModel),
      };
      const returnResponse = await fetch(url, requestOptions);
      if (!returnResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setIsReviewed(true);
    }
  };

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
                checkoutBook={checkoutBook}
                isReviewed={isReviewed}
                submitReview={submitReview}
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
              checkoutBook={checkoutBook}
              isReviewed={isReviewed}
              submitReview={submitReview}
            />
            <hr />
            <LatestReviews reviews={reviews} isbn={book.isbn13} mobile={true} />
          </div>
        </div>
      )}
    </>
  );
};
