import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config';


const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // שליפה ראשונית מהשרת
  useEffect(() => {
    axios.get(ENDPOINTS.BOOKS.GET_ALL
      // 'http://localhost:8000/api/books'
    )
      .then(response => {
        setBooks(response.data);
      })
      .catch(err => {
        console.error('Failed to fetch books:', err);
      });
  }, []);

  // יצירת ספר חדש
  const addBook = async (bookData) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(ENDPOINTS.BOOKS.CREATE,
        // 'http://localhost:8000/api/books',
         bookData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBooks(prev => [...prev, response.data]);
    } catch (err) {
      console.error('Failed to add book:', err);
    }
  };

  const updateBook = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('authToken');
      console.log(token, 'trying to update book');
     const response = await axios.put(
        `http://localhost:8000/api/books/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
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
      const token = localStorage.getItem('authToken');
      await axios.delete(
        `http://localhost:8000/api/books/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBooks(prev => prev.filter(book => book._id !== id));
    } catch (err) {
      console.error('Failed to delete book:', err);
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);


