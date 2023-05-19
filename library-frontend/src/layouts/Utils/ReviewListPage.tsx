import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewModel } from "../../models/ReviewModel";
import { Review } from "./Review";
import { Pagination } from "./Pagination";
import { SpinnerLoading } from "./SpinnerLoading";
import * as ReviewsAPI from "../../services/reviews-api";

export const ReviewListPage = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { isbn, num } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    isbn && Number(num) === 1 && navigate(`/reviewlist/book/${isbn}`);

    num && setCurrentPage(Number(num));
  }, [isbn, num, navigate]);

  useEffect(() => {
    isbn &&
      ReviewsAPI.getReviewsByISBN(isbn, currentPage - 1, reviewsPerPage)
        .then((resultData: any) => {
        if (
            resultData._embedded &&
            resultData._embedded.reviews.length > 0 &&
            resultData.page
          ) {
            console.log(resultData)
            setReviews(resultData._embedded.reviews);
            setTotalReviews(resultData.page.totalElements);
            setTotalPages(resultData.page.totalPages);
          }
        })
        .catch((error: any) => {
          setHttpError(error.message);
        });
    setIsLoading(false);
  }, [isbn, currentPage, reviewsPerPage]);

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
    <div className="container mt-5">
      <div>
        <h3>Comments: ({reviews.length})</h3>
      </div>
      <p>
        {(currentPage - 1) * reviewsPerPage + 1} to{" "}
        {Math.min(currentPage * reviewsPerPage, totalReviews)} of {totalReviews}{" "}
        items:
      </p>
      <div className="row">
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseURI={`reviewlist/book/${isbn}`}
        />
      )}
    </div>
  );
};
