import { Link } from "react-router-dom";
import { ReviewModel } from "../../../models/ReviewModel";
import { Review } from "../../Utils/Review";

export const LatestReviews: React.FC<{
  reviews: ReviewModel[];
  isbn: string | undefined;
  mobile: boolean;
}> = ({ reviews, isbn, mobile }) => {
  return (
    <div className={mobile ? "mt-3" : "row mt-5"}>
      <div className={mobile ? "" : "col-sm-3 col-md-3"}>
        <h2>Latest Reviews: </h2>
      </div>
      <div className="col-sm-9 col-md-9">
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((review) => (
              <Review review={review} key={review.id}></Review>
            ))}

            <div className="mt-3 mb-3">
              <Link
                type="button"
                className="btn btn-outline-secondary main-color btn-md text-white"
                to="/#"
              >
                Reach all reviews
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-3 mb-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
};
