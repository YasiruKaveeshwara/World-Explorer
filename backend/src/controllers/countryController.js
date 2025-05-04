const mongoose = require("mongoose");
const Favorite = require("../models/Favorite");

// @desc    Add a country to favorites
// @route   POST /api/countries/favorites
exports.addFavorite = async (req, res) => {
  try {
    const { countryCode, countryName, flag } = req.body;

    // Check for required fields
    if (!countryCode || !countryName) {
      return res.status(400).json({ message: "countryCode and countryName are required" });
    }

    // Check for duplicates
    const existing = await Favorite.findOne({
      userId: req.user.id,
      countryCode,
    });

    if (existing) {
      return res.status(409).json({ message: "Country already in favorites" });
    }

    const favorite = new Favorite({
      userId: req.user.id,
      countryCode,
      countryName,
      flag,
    });

    await favorite.save();
    return res.status(201).json({ message: "Country added to favorites" });
  } catch (error) {
    console.error("Add Favorite Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get all favorite countries
// @route   GET /api/countries/favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Get Favorites Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Remove a favorite country
// @route   DELETE /api/countries/favorites/:id
exports.removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid favorite ID format" });
    }

    const favorite = await Favorite.findById(id);

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    if (favorite.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied: not your favorite" });
    }

    await favorite.deleteOne();
    return res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Remove Favorite Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
