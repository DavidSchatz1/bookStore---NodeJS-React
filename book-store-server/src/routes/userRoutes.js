const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema, updateUserSchema } = require('../validations/userValidators');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.patch('/:id', authMiddleware, validate(updateUserSchema), userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get("/getCurrent", userController.getCurrentUser); 
 
module.exports = router;

