const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const authMiddleware = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin');

// PATCH /api/discount
router.patch('/update', authMiddleware, requireAdmin, discountController.updateDiscount);

router.get('/get', discountController.getDiscount);

module.exports = router;
