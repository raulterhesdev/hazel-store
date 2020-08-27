const Product = require('../models/Product');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc   Upload product image
// @route   POST /api/products/upload
// @access  Private/admin

exports.uploadImage = asyncHandler(async (req, res, next) => {
  // check if user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to upload an image`,
        400
      )
    );
  }

  if (req.files === null) {
    return res
      .status(400)
      .json({ success: false, data: 'No file was uploaded' });
  }

  const file = req.files.file;

  const filePath = `${__dirname}/client/public/uploads/${file.name}`;

  console.log(filePath);

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.status(201).json({
      success: true,
      data: { filename: file.name, filePath: filePath },
    });
  });
});

// @desc    Add a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  // check if user is admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to add a product`,
        400
      )
    );
  }

  const product = await Product.create(req.body);

  res.status(201).json({ success: true, data: product });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product with the id of ${req.params.id}`, 404)
    );
  }

  // make sure user is an admin
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update products`,
        401
      )
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: product });
});

// @desc    Delete Product
// @route   Delete /api/products/:id
// @access  Private/Delete
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No Product with the id of ${req.params.id}`, 404)
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

  await product.remove();

  res.status(200).json({ success: true, data: {} });
});
