const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validate = require('../middlewares/validate');
const bookSchema = require('../validations/bookSchema');
const authMiddleware = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.post('/',  authMiddleware, requireAdmin, validate(bookSchema), bookController.createBook);

router.put('/:id', authMiddleware, requireAdmin, validate(bookSchema), bookController.updateBook);

router.delete('/:id', authMiddleware, requireAdmin, bookController.deleteBook);

module.exports = router;  
