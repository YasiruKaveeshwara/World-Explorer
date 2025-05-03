// server/routes/countryRoutes.js
const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/countryController');
const protect = require('../middleware/authMiddleware');

// Only logged-in users can use these routes
router.post('/favorites', protect, addFavorite);
router.get('/favorites', protect, getFavorites);
router.delete('/favorites/:id', protect, removeFavorite);

module.exports = router;
