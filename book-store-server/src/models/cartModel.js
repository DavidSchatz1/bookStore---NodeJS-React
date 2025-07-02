const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
