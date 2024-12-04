/*
MongoDB code will be added here.
Right now, we are using a JSON file to store the data.
*/

// Sample video games data
const videoGamesData = require("../data/videogames_data.json");

// Get all video games
const getAllVideoGames = () => {
  return videoGamesData;
};

// Find video game by ID
const findVideoGameById = (id) => {
  return videoGamesData.find((game) => game.id == id);
};

// Add a new review to a game
const addReviewToGame = (id, review) => {
  const game = findVideoGameById(id);
  if (game) {
    game.reviews.push(review);
    return game;
  }
  return null;
};

// Delete all reviews for a game
const deleteAllReviewsFromGame = (id) => {
  const game = findVideoGameById(id);
  if (game) {
    game.reviews = [];
    return game;
  }
  return null;
};

module.exports = {
  getAllVideoGames,
  findVideoGameById,
  addReviewToGame,
  deleteAllReviewsFromGame,
};
