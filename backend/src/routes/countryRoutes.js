const express = require("express");
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require("../controllers/countryController");
const protect = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

// POST /favorites (with validation)
router.post(
  "/favorites",
  protect,
  [body("countryCode", "countryCode is required").notEmpty(), body("countryName", "countryName is required").notEmpty()],
  validate,
  addFavorite
);

router.get("/favorites", protect, getFavorites);
router.delete("/favorites/:id", protect, removeFavorite);

module.exports = router;
