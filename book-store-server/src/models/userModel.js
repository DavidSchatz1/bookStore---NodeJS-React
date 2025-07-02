const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true, // כתובת ייחודית
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isAdmin: {
    type: Boolean,
    default: false // לא ניתן לשנות מהלקוח
  }
});

module.exports = mongoose.model('User', userSchema);

