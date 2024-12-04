const mongoose = require("mongoose");

// Create a schema for reviews
const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a schema for video games
const videoGameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
});

// Create a model
const VideoGame = mongoose.model("VideoGame", videoGameSchema);

// Functions to interact with the database
const getAllVideoGames = async () => {
  return await VideoGame.find();
};

const findVideoGameById = async (id) => {
  return await VideoGame.findById(id);
};

const addReviewToGame = async (id, review) => {
  try {
    const game = await VideoGame.findById(id);
    if (game) {
      game.reviews.push({ text: review });
      await game.save();
      return game;
    }
    return null;
  } catch (error) {
    console.error("Error adding review:", error);
    return null;
  }
};

const deleteAllReviewsFromGame = async (id) => {
  try {
    const game = await VideoGame.findById(id);
    if (game) {
      game.reviews = [];
      await game.save();
      return game;
    }
    return null;
  } catch (error) {
    console.error("Error deleting reviews:", error);
    return null;
  }
};

module.exports = {
  VideoGame,
  getAllVideoGames,
  findVideoGameById,
  addReviewToGame,
  deleteAllReviewsFromGame,
};
