import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // נטען בהתחלה

  // שליפה ראשונית מהשרת
  useEffect(() => {
    axios.get('http://localhost:8000/api/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch books:', err);
        setLoading(false);
      });
  }, []);

  // יצירת ספר חדש
  const addBook = async (bookData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/books', bookData);
      setBooks(prev => [...prev, response.data]);
    } catch (err) {
      console.error('Failed to add book:', err);
    }
  };

  // עדכון ספר קיים
  const updateBook = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/books/${id}`, updatedData);
      setBooks(prev =>
        prev.map(book => book._id === id ? response.data : book)
      );
    } catch (err) {
      console.error('Failed to update book:', err);
    }
  };

  // מחיקת ספר
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      setBooks(prev => prev.filter(book => book._id !== id));
    } catch (err) {
      console.error('Failed to delete book:', err);
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook, loading }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);


