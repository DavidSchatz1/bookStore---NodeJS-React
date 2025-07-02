require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./database/mongoose.db');
const userRoutes = require('./routes/userRoutes');
const booksRoutes = require('./routes/booksRoutes');
const discountRoute = require('./routes/discountRoute');
const cartRoutes = require('./routes/cartRoutes');
const PORT = process.env.PORT || 8000;

const app = express(); 
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); 
 

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToMongoDB();
});

app.use('/api/books', booksRoutes);

app.use('/api/discount', discountRoute);

app.use('/api/users', userRoutes); 

app.use('/api/cart', cartRoutes);



