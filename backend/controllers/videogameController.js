const videoGameModel = require("../models/videogameModel");

// Get all video games
const getVideoGames = (req, res) => {
  const videoGames = videoGameModel.getAllVideoGames();
  res.json(videoGames);
};

// Add new review to a video game
const addReview = (req, res) => {
  const gameId = req.params.id;
  const { review } = req.body;

  const updatedGame = videoGameModel.addReviewToGame(gameId, review);
  if (updatedGame) {
    res.json({
      success: true,
      message: "Review added successfully",
      game: updatedGame,
    });
  } else {
    res.status(404).json({ success: false, message: "Game not found" });
  }
};

// Delete all reviews for a specific game
const deleteAllReviews = (req, res) => {
  const gameId = req.params.id;

  const updatedGame = videoGameModel.deleteAllReviewsFromGame(gameId);
  if (updatedGame) {
    res.json({
      success: true,
      message: "Reviews deleted successfully",
      game: updatedGame,
    });
  } else {
    res.status(404).json({ success: false, message: "Game not found" });
  }
};

module.exports = { getVideoGames, addReview, deleteAllReviews };
