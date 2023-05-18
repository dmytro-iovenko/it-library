import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewModel } from "../../models/ReviewModel";
import * as ReviewsAPI from "../../services/reviews-api";

export const ReviewListPage = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { isbn } = useParams();

  useEffect(() => {
    isbn &&
      ReviewsAPI.getReviewsByISBN(isbn)
        .then((resultData: any) => {
          if (resultData._embedded && resultData._embedded.reviews.length > 0) {
            setReviews(resultData._embedded.reviews);
            setTotalReviews(resultData._embedded.totalElements);
            setTotalPages(resultData._embedded.totalPages);
          }
        })
        .catch((error: any) => {
          setHttpError(error.message);
        });
    setIsLoading(false);
  }, [isbn, currentPage]);

  return <></>;
};
