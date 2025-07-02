import React from 'react';
import { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useBooks } from '../../context/BookContext';

function AddBookForm() {
  const { showNotification } = useNotification();
  const { addBook } = useBooks();

  //adding a book

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    year: '',
    price: '',
    image: '',
    description: ''
  });

  // פונקציה שמעדכנת את השדות לפי ההקלדה
  function handleNewBookChange(event) {
    const { name, value } = event.target;
    setNewBook(prev => ({ ...prev, [name]: value }));
  }

  // פונקציה שמוסיפה את הספר לרשימה
  async function handleAddBook(event) {
    event.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.year || !newBook.image || !newBook.price || !newBook.description) {
      showNotification('אנא מלא את כל השדות', "error");
      return;
    }

    const newBookToAdd = {
      ...newBook,
      year: Number(newBook.year), // ממיר את השנה למספר
      price: Number(newBook.price)
    };
    await addBook(newBookToAdd);
    showNotification(`הספר ${newBook.title} נוסף לאתר בהצלחה`)

    // איפוס השדות
    setNewBook({ title: '', author: '', year: '', image: '', price: '', description: '' });
    showNotification("הספר נוסף בהצלחה!");
  }

  return (
    <div>
      <div className='add-book-form' style={{ marginTop: '20px' }}>
        <h2>הוספת ספר חדש</h2>
        <form>
          <input
            type="text"
            name="title"
            placeholder="כותרת"
            value={newBook.title}
            onChange={handleNewBookChange}

          />
          <input
            type="text"
            name="author"
            placeholder="מחבר"
            value={newBook.author}
            onChange={handleNewBookChange}

          />
          <input
            type="number"
            name="year"
            placeholder="שנה"
            value={newBook.year}
            onChange={handleNewBookChange}

          />

          <input
            type="number"
            name="price"
            placeholder="מחיר"
            value={newBook.price}
            onChange={handleNewBookChange}
          />

          <input
            type="text"
            name="image"
            placeholder="קישור לתמונה"
            value={newBook.image}
            onChange={handleNewBookChange}
          />

          <input
            type="text"
            name="description"
            placeholder="תיאור"
            value={newBook.description}
            onChange={handleNewBookChange}
          />
          <br />
          <button onClick={(event) => handleAddBook(event)}>הוסף ספר</button>
        </form>

      </div>
    </div>
  )
}

export default AddBookForm