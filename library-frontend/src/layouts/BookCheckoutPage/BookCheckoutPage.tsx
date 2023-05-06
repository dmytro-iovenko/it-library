import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookModel } from "../../models/BookModel";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { ReviewModel } from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import * as BooksAPI from "../../services/itbooks-api";
import * as ReviewsAPI from "../../services/reviews-api";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const { isbn } = useParams();
  const he = require("he");

  useEffect(() => {
    isbn &&
      BooksAPI.getBookByISBN(isbn)
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

  if (isLoading || isLoadingReviews) {
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
              <CheckoutAndReviewBox book={book} mobile={false} />
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
            <CheckoutAndReviewBox book={book} mobile={true} />
            <hr />
            <LatestReviews reviews={reviews} isbn={book.isbn13} mobile={true} />
          </div>
        </div>
      )}
    </>
  );
};
