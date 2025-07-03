const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validate = require('../middlewares/validate');
const bookSchema = require('../validations/bookSchema');
const authMiddleware = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/all', bookController.getAllBooks);
router.get('/getBook/:id', bookController.getBookById);

router.post('/createBook',  authMiddleware, requireAdmin, validate(bookSchema), bookController.createBook);

router.put('/updateBook/:id', authMiddleware, requireAdmin, validate(bookSchema), bookController.updateBook);

router.delete('/deleteBook/:id', authMiddleware, requireAdmin, bookController.deleteBook);

module.exports = router;  
