import { useState } from "react";
import { StarsReview } from "../Utils/StarsReview";

export const LeaveReviewForm: React.FC<{}> = (props) => {
  const [starInput, setStarInput] = useState(0);

  const starValue = (value: number) => {
    setStarInput(value);
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
    </div>
  );
};
