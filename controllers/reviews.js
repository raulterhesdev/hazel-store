const Review = require('../models/Review');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');

// @desc    Get reviews
// @route   GET /api/products/:productId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  // if (req.params.productId) {
  //   const reviews = await Review.find({ productId: req.params.productId });
  //   return res.status(200).json(res.advancedResults);
  // } else {
  //   return next(new ErrorResponse(`Please provide a product Id`, 404));
  // }

  res.status(200).json(res.advancedResults);
});

// @desc    Add review
// @route   POST /api/products/:productId/reviews
// @access  Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.productId = req.params.productId;
  req.body.userId = req.user.id;

  const product = await Product.findById(req.params.productId);

  if (!product) {
    return next(
      new ErrorResponse(`No product with id ${req.params.productId}`, 404)
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({ success: true, data: review });
});
