const mongoose = require('mongoose');

const Favorite = require('../models/Favorite');

// @desc    Add a country to favorites
// @route   POST /api/countries/favorites
exports.addFavorite = async (req, res) => {
  try {
    const { countryCode, countryName, flag } = req.body;

    const favorite = new Favorite({
      userId: req.user.id,
      countryCode,
      countryName,
      flag
    });

    await favorite.save();
    res.status(201).json({ message: 'Country added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all favorite countries
// @route   GET /api/countries/favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// @desc    Remove a favorite country
// @route   DELETE /api/countries/favorites/:id
exports.removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const favorite = await Favorite.findById(id);

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    if (favorite.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Favorite.deleteOne({ _id: id });
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};