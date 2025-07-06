const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { addItemSchema, updateQuantitySchema } = require('../validations/cartValidators');

router.use(authMiddleware); // כל הבקשות דורשות התחברות

router.get('/getCart', cartController.getCart);
router.post('/addItem', validate(addItemSchema), cartController.addToCart);
router.patch('/updateItemQuantity', validate(updateQuantitySchema), cartController.updateCartQuantity);
router.delete('/deleteBook/:bookId', cartController.removeFromCart);
router.delete('/clearCart', cartController.clearCart); 

module.exports = router;
