const yup = require('yup');

const bookSchema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  description: yup.string().required('Description is required'),
  image: yup.string().url('Image must be a valid URL').required('Image is required'),
  price: yup.number().positive('Price must be a positive number').max(300).required('Price is required'),
  year: yup.number().min(1500).max(new Date().getFullYear()).required('Year is required'),
});

module.exports = bookSchema;
