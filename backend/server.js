// Import modules
const express = require("express");
const cors = require("cors");
const videoGameRoutes = require("./routes/videogameRoutes");

// Create express app
const app = express();
const PORT = 5000;

// Middleware to parse JSON and allow CORS
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/videogames", videoGameRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
