import React from "react";
import ReviewInput from "./ReviewInput";
import PropTypes from "prop-types";

function VideoGameCard({
  game,
  reviews,
  onReviewChange,
  onAddReview,
  onDeleteAllReviews,
}) {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} />
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <div className="reviews">
        <h3>Reviews:</h3>
        {game.reviews.length > 0 ? (
          game.reviews.map((review, index) => (
            <p key={review._id || index}>{review.text}</p>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
      <ReviewInput
        review={reviews[game._id] || ""}
        onReviewChange={(e) => onReviewChange(game._id, e.target.value)}
        onAddReview={() => onAddReview(game._id)}
      />
      <button onClick={() => onDeleteAllReviews(game._id)}>
        Delete All Reviews
      </button>
    </div>
  );
}

// Add prop-types for validation
VideoGameCard.propTypes = {
  game: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onAddReview: PropTypes.func.isRequired,
  onDeleteAllReviews: PropTypes.func.isRequired,
};

export default VideoGameCard;
