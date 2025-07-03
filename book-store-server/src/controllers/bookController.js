const bookService = require('../services/bookService');
const mongoose = require('mongoose');
const {removeBookFromAllCarts} = require('../utils/cartUtils');
const { ObjectId } = require('mongodb');



const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books', error: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get book', error: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create book', error: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updated = await bookService.updateBook(req.params.id, req.body);
    if (!updated) return res.status(404).send("Book not found");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update book', error: err.message });
  }
};



const deleteBook = async (req, res) => {
  try {
    const bookIdToDelete = new mongoose.Types.ObjectId(String(req.params.id));

    const deleted = await bookService.deleteBook(bookIdToDelete);
    if (!deleted) return res.status(404).send("Book not found");

    await removeBookFromAllCarts(bookIdToDelete); 

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book', error: err.message });
  }
};


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};


