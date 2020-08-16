const express = require('express');
const {
  getOrders,
  addOrder,
  addOrderPublic,
} = require('../controllers/orders');
const advancedResults = require('../middleware/advancedResults');
const { authorize, protect } = require('../middleware/auth');

// get the model
const Order = require('../models/Order');

// create router
const router = express.Router();

// set the routes
router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(Order), getOrders)
  .post(protect, addOrder);
router.route('/public').post(addOrderPublic);

module.exports = router;
