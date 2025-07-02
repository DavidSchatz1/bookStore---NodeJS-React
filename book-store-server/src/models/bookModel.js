const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  title: { type: String, required: true },
  year: { type: Number, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
