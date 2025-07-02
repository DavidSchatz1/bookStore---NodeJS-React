const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// רישום משתמש
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
   
    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 8); 

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// התחברות
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '3d' }
    );

    res.json({ message: 'Login successful', token, user: { id: user._id, email: user.email, username: user.username, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const userIdFromParams = req.params.id;
  const userIdFromToken = req.user.userId;

  if (userIdFromParams !== userIdFromToken) {
    console.log('id from params:', userIdFromParams, 'id from token:', userIdFromToken);
    return res.status(403).json({ message: 'Access denied: cannot update other users.' });
  }

  let { username, email, password } = req.body;

  try {
    // הצפנת הסיסמה אם הוזנה
    if (password && password.trim() !== '') {
      password = await bcrypt.hash(password, 8);
    } else {
      // אם המשתמש לא שינה סיסמה – לא נשלח אותה לעדכון
      password = undefined;
    }

    // בניית אובייקט עדכון דינאמי
    const updateData = { username, email };
    if (password) {
      updateData.password = password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userIdFromParams,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      message: 'User updated successfully.',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        isAdmin: updatedUser.isAdmin
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const userIdFromParams = req.params.id;
  const userIdFromToken = req.user.userId;

  // בדיקה שהמשתמש מוחק את עצמו בלבד
  if (userIdFromParams !== userIdFromToken) {
    return res.status(403).json({ message: 'Access denied: cannot delete other users.' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userIdFromParams);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user.', error: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });

  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};



module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  getCurrentUser
};
