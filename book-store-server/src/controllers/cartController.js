const Cart = require('../models/cartModel');

// שליפת העגלה
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.bookId');
    res.json(cart || { user: userId, items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשליפת עגלה' });
  }
};

// הוספה לעגלה
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [{ bookId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.bookId.toString() === bookId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בהוספת פריט לעגלה' });
  }
};

// עדכון כמות
const updateCartQuantity = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'עגלה לא נמצאה' });

    const item = cart.items.find(i => i.bookId.toString() === bookId);
    if (!item) return res.status(404).json({ error: 'הספר לא קיים בעגלה' });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בעדכון כמות' });
  }
};

// הסרת ספר
const removeFromCart = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: 'עגלה לא נמצאה' });
    }

    // בדוק אם הפריט בכלל קיים בעגלה
    const itemExists = cart.items.some(item => item.bookId.toString() === bookId);
    if (!itemExists) {
      return res.status(400).json({ error: 'הספר לא קיים בעגלה' });
    }

    // הסרה בפועל
    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בהסרת פריט' });
  }
};


// ניקוי עגלה
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: 'עגלה לא נמצאה' });

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בניקוי עגלה' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
};
