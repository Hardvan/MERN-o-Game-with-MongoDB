import React from "react";
import PropTypes from "prop-types";

function ReviewInput({ review, onReviewChange, onAddReview }) {
  return (
    <div className="review-input">
      <input
        type="text"
        placeholder="Add a review"
        value={review}
        onChange={onReviewChange}
      />
      <button onClick={onAddReview}>+ Add Review</button>
    </div>
  );
}

// Add prop-types for validation
ReviewInput.propTypes = {
  review: PropTypes.string.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onAddReview: PropTypes.func.isRequired,
};

export default ReviewInput;
