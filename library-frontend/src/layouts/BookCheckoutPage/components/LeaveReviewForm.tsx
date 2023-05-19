import { useState } from "react";
import { StarsReview } from "../../Utils/StarsReview";

export const LeaveReviewForm: React.FC<{ submitReview: any }> = ({
  submitReview,
}) => {
  const [starInput, setStarInput] = useState(0);
  const [displayInput, setDisplayInput] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");

  const starValue = (value: number) => {
    setStarInput(value);
    setDisplayInput(true);
  };

  return (
    <div className="dropdown" style={{ cursor: "pointer" }}>
      <h5
        className="dropdown-toggle"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
      >
        Leave a review?
      </h5>
      <ul
        id="submitReviewRating"
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
      >
        {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, index) => (
          <li key={index}>
            <button onClick={() => starValue(value)} className="dropdown-item">
              {value} star
            </button>
          </li>
        ))}
      </ul>
      <StarsReview rating={starInput} size={32} />

      {displayInput && (
        <form method="POST" action="#">
          <hr />
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              id="submitReviewDescription"
              placeholder="Optional"
              rows={3}
              onChange={(e) => setReviewDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => submitReview(starInput, reviewDescription)}
            >
              Submit Review
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
