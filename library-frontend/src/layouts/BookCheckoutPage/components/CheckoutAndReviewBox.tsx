import { Link } from "react-router-dom";
import { BookModel } from "../../../models/BookModel";
import { LeaveReviewForm } from "./LeaveReviewForm";

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  currentLoansCount: number;
  isAuthenticated: any;
  isCheckedOut: boolean;
  checkoutBook: any;
  isReviewed: boolean;
  submitReview: any;
}> = ({
  book,
  mobile,
  currentLoansCount,
  isAuthenticated,
  isCheckedOut,
  checkoutBook,
  isReviewed,
  submitReview,
}) => {
  const buttonRender = () => {
    if (isAuthenticated) {
      if (!isCheckedOut && currentLoansCount < 5) {
        return (
          <button className="btn btn-success btn-lg" onClick={checkoutBook}>
            Checkout
          </button>
        );
      } else if (isCheckedOut) {
        return (
          <p>
            <b>Book checked out. Enjoy!</b>
          </p>
        );
      } else if (!isCheckedOut) {
        return <p className="text-danger">Too many books checked out.</p>;
      }
    }
    return (
      <Link to={"/login"} className="btn btn-success btn-lg">
        Sign in
      </Link>
    );
  };

  const reviewRender = () => {
    if (isAuthenticated && !isReviewed) {
      return <LeaveReviewForm submitReview={submitReview} />;
    } else if (isAuthenticated && isReviewed) {
      return (
        <p>
          <b>Thank you for your review!</b>
        </p>
      );
    }
    return <p>Sign in to be able to leave review.</p>;
  };

  return (
    <div
      className={
        mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{currentLoansCount}/5 </b>
            books checked out
          </p>
          {/* <hr />
          {book ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>1</b>
              copies
            </p>
            <p className="col-6 lead">
              <b>1</b>
              available
            </p>
          </div> */}
        </div>
        {buttonRender()}
        <hr />
        {/* <p className="mt-3">
          This number can change until placing order has been complete.
        </p> */}
        {reviewRender()}
      </div>
    </div>
  );
};
