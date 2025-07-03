const yup = require('yup');

const registerSchema = yup.object({
  username: yup.string().min(2, 'שם המשתמש צריך להיות לפחות באורך 2 תוים').required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
});

const updateUserSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Email must be a valid format like example@example.com'
    ),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}); 

module.exports = { registerSchema, loginSchema, updateUserSchema };
