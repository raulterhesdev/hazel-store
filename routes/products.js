const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/products');
const advancedResults = require('../middleware/advancedResults');
const { authorize, protect } = require('../middleware/auth');

// get the Model
const Product = require('../models/Product');

// get the review router
const reviewRouter = require('./reviews');

// create the router
const router = express.Router();

// reroute into other resource routers
router.use('/:productId/reviews', reviewRouter);

// set the routes
router
  .route('/')
  .get(advancedResults(Product), getProducts)
  .post(protect, authorize('admin'), createProduct);

router.route('/upload').post(protect, authorize('admin'), uploadImage);

router
  .route('/:id')
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
