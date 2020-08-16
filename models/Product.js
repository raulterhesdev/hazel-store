const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a Title'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a Description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a Price'],
  },
  discount: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  // ratingCount: {
  //   type: Number,
  // },
  category: {
    type: String,
    required: true,
    enum: [
      'Science Fiction',
      'Romance',
      'Horror',
      'Thriller',
      'Personal Development',
      'Biography',
      'Others',
    ],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please upload a photo'],
  },
});

// cascade delete courses when a bootcamp is deleted
ProductSchema.pre('remove', async function (next) {
  console.log(`Reviews being removed along with product ${this._id}`);
  await this.model('Review').deleteMany({ productId: this._id });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
