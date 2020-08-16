const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, 'Please add review text'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    require: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true,
  },
});

// prevent user from submitting more that 1 review per bootcamp
ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

// Static method to get avg rating
ReviewSchema.statics.getAverageRating = async function (productId) {
  const obj = await this.aggregate([
    {
      $match: { productId: productId },
    },
    {
      $group: {
        _id: '$productId',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      rating: obj[0].averageRating,
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverageRating after save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.productId);
});

// Call getAverageRating before remove
ReviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.productId);
});

module.exports = mongoose.model('Review', ReviewSchema);
