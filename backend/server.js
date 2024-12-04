// Import modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const videoGameRoutes = require("./routes/videogameRoutes");

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and allow CORS
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mern-o-game";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/api/videogames", videoGameRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Add error handling for MongoDB connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Optional: Log when connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
