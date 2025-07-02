const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

module.exports = mongoose.model('Discount', discountSchema);