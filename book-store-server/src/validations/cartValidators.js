  const yup = require('yup');

const addItemSchema = yup.object({
  bookId: yup.string().required('Book ID is required'),
  quantity: yup.number().min(1).max(50).integer('Quantity must be an integer').default(1)
});

const updateQuantitySchema = yup.object({
  bookId: yup.string().required('Book ID is required'),
  quantity: yup.number().min(1).max(50).integer('Quantity must be an integer').required('Quantity is required')
});

module.exports = {
  addItemSchema,
  updateQuantitySchema
};
