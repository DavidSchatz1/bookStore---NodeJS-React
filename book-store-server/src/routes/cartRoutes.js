const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { addItemSchema, updateQuantitySchema } = require('../validations/cartValidators');

router.use(authMiddleware); // כל הבקשות דורשות התחברות

router.get('/', cartController.getCart);
router.post('/', validate(addItemSchema), cartController.addToCart);
router.patch('/', validate(updateQuantitySchema), cartController.updateCartQuantity);
router.delete('/:bookId', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

module.exports = router;
