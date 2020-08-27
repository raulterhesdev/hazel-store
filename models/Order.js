const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      title: { type: String, require: true },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        require: true,
      },
      quantity: { type: Number, require: true },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // require: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  firstName: {
    type: String,
    default: '',
    required: [true, 'First Name is mandatory'],
  },
  lastName: {
    type: String,
    default: '',
    required: [true, 'Last Name is mandatory'],
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
  city: {
    type: String,
    required: [true, 'City is required'],
    default: '',
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    default: '',
  },
  zip: {
    type: String,
    required: [true, 'Zip is required'],
    default: '',
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
    let total = 0;
    await this.products.forEach(async (prod) => {
      const product = await this.model('Product').findById(prod.productId);

      total = total + product.price * prod.quantity;
      this.totalPrice = total;
    });
  } catch (error) {
    console.error(error);
  }

  // next();
});
module.exports = mongoose.model('Order', OrderSchema);
