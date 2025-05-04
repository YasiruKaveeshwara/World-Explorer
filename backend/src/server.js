const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const countryRoutes = require("./routes/countryRoutes");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/countries", countryRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("World Explorer API is running...");
});

// Server port
const PORT = process.env.PORT || 5000;

// Listen only if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app for Supertest or testing
module.exports = app;
