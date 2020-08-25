const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Add a order
// @route   Post /api/orders
// @access  private
exports.addOrder = asyncHandler(async (req, res, next) => {
  req.body.userId = req.user.id;

  const order = await Order.create(req.body);

  res.status(201).json({ success: true, data: order });
});

// @desc    Add a order
// @route   Post /api/orders/public
// @access  public
exports.addOrderPublic = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);

  res.status(201).json({ success: true, data: order });
});

// @desc    Delete Order
// @route   Delete /api/orders/:id
// @access  Private/Admin
exports.addOrderPublic = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`No order with the id of ${req.params.id}`, 404)
    );
  }

  // make sure user is an admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete products`,
        401
      )
    );
  }

  await order.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Create payment intent
// @route   Post /api/orders/paymentIntent
// @access  private
exports.paymentIntent = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });

  res.status(201).json({ success: true, data: paymentIntent.client_secret });
});
