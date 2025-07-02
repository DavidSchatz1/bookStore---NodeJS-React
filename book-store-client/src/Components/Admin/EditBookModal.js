import { useState } from 'react';

function EditBookModal({ book, onSave, onClose }) {
  const [editedBook, setEditedBook] = useState({ ...book });

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedBook(prev => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    onSave(editedBook);
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>ערוך פרטי ספר</h2>
        <form onSubmit={handleSave}>
          <input
            type='text'
            name="title"
            value={editedBook.title}
            onChange={handleChange}
            placeholder="שם הספר"
          />
          <input
            name="author"
            value={editedBook.author}
            onChange={handleChange}
            placeholder="מחבר"
            type='text'
          />
          <input
            name="year"
            value={editedBook.year}
            onChange={handleChange}
            placeholder="שנה"
            type='number'
          />
          <input
            name="price"
            value={editedBook.price}
            onChange={handleChange}
            placeholder="מחיר"
            type="number"
          />
          <input
            name="image"
            value={editedBook.image}
            onChange={handleChange}
            placeholder="קישור לתמונה"
            type="text"
            style={{ direction: 'ltr' }}
          />
          <input
            name="description"
            value={editedBook.description}
            onChange={handleChange}
            placeholder="תיאור"
            type="text"
          />
          <br />
          <button type="submit">שמור</button>
        </form>
      </div>
    </div>
  );
}

export default EditBookModal;
