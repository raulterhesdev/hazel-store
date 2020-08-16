const express = require('express');
const { getReviews, addReview } = require('../controllers/reviews');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'userId',
      select: 'firstName lastName',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

module.exports = router;
