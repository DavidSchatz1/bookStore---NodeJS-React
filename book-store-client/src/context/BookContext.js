import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config';


const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // שליפה ראשונית מהשרת
  useEffect(() => {
    axios.get(ENDPOINTS.BOOKS.GET_ALL)
      .then(response => {
        setBooks(response.data);
      })
      .catch(err => {
        console.error('Failed to fetch books:', err);
      });
  }, []);

  const addBook = async (bookData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      ENDPOINTS.BOOKS.CREATE,
      bookData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setBooks(prev => [...prev, response.data]);
    return { success: true };

  } catch (error) {
    console.error('Failed to add book:', error);

    if (error.response?.data?.errors?.length > 0) {
      return { success: false, message: error.response.data.errors.join(', ') };
    } else if (error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: 'שגיאה בהוספת ספר' };
    }
  }
};

  const updateBook = async (id, updatedData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(
      ENDPOINTS.BOOKS.UPDATE(id),
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setBooks(prev =>
        prev.map(book => book._id === id ? response.data : book)
    );
    return { success: true, data: response.data };

  } catch (error) {
    if (error.response?.data?.errors?.length > 0) {
      return { success: false, message: error.response.data.errors.join(', ') };
    } else if (error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: 'שגיאה בעדכון פרטי הספר' };
    }
  }
};

  const deleteBook = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(ENDPOINTS.BOOKS.DELETE(id), {
      headers: { Authorization: `Bearer ${token}` }
    });

    setBooks(prev => prev.filter(book => book._id !== id));
    return { success: true };

  } catch (error) {
    console.error('Failed to delete book:', error);

    const message = "שגיאה במחיקת הספר";

    return { success: false, message };
  }
};


  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);


