const {
  VideoGame,
  getAllVideoGames,
  findVideoGameById,
  addReviewToGame,
  deleteAllReviewsFromGame,
} = require("../models/videogameModel");

// Get all video games
const getVideoGames = async (req, res) => {
  try {
    const videoGames = await getAllVideoGames();
    res.json(videoGames);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching video games",
      error: error.message,
    });
  }
};

// Add new review to a video game
const addReview = async (req, res) => {
  try {
    const gameId = req.params.id;
    const { review } = req.body;

    // Validate review
    if (!review || review.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Review cannot be empty",
      });
    }

    const updatedGame = await addReviewToGame(gameId, review);

    if (updatedGame) {
      res.json({
        success: true,
        message: "Review added successfully",
        game: updatedGame,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding review",
      error: error.message,
    });
  }
};

// Delete all reviews for a specific game
const deleteAllReviews = async (req, res) => {
  try {
    const gameId = req.params.id;

    const updatedGame = await deleteAllReviewsFromGame(gameId);

    if (updatedGame) {
      res.json({
        success: true,
        message: "Reviews deleted successfully",
        game: updatedGame,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting reviews",
      error: error.message,
    });
  }
};

// Add a script to seed initial data (optional)
const seedInitialData = async () => {
  try {
    // Check if any games exist
    const existingGames = await VideoGame.countDocuments();

    if (existingGames === 0) {
      // Import the existing JSON data
      const initialGames = require("../data/videogames_data.json");

      // Convert JSON data to Mongoose documents
      const gamesToInsert = initialGames.map((game) => ({
        title: game.title,
        description: game.description,
        image: game.image,
        reviews: game.reviews
          ? game.reviews.map((review) => ({ text: review }))
          : [],
      }));

      // Insert games into the database
      await VideoGame.insertMany(gamesToInsert);
      console.log("Initial data seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding initial data:", error);
  }
};

// Call seed function when this module is imported
seedInitialData();

module.exports = {
  getVideoGames,
  addReview,
  deleteAllReviews,
};
