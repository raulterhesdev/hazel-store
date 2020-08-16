const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: [{ type: mongoose.Schema.ObjectId, ref: 'Product', require: true }],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // require: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    default: '',
    required: [true, 'Delivery Address is mandatory'],
  },
  phone: {
    type: String,
    default: '',
    required: [true, 'Contact phone is mandatory'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  paymentConfirmed: {
    type: String,
    enum: ['confirmed', 'pending', 'rejected'],
    required: true,
  },
});

// Calculate the total price of the order
OrderSchema.pre('save', async function (next) {
  try {
    this.products.forEach(async (productId) => {
      const product = await this.model('Product').findById(productId);
      this.totalPrice += product.price;
    });
  } catch (error) {
    console.error(error);
  }
});
module.exports = mongoose.model('Order', OrderSchema);
