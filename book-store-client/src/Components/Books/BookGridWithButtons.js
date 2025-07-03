import { useState } from 'react';
import Book from './Book';
import EditBookModal from '../Admin/EditBookModal';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useBooks } from '../../context/BookContext';
import { useNotification } from '../../context/NotificationContext';

function BookGridWithButtons({ books }) {
  const { isAdmin } = useAuth();
  const { addToCart } = useCart();
  const { deleteBook, updateBook } = useBooks();
  const { showNotification } = useNotification();

  const [editingBook, setEditingBook] = useState(null);

  async function onDelete(bookToDelete) {
    await deleteBook(bookToDelete._id); 
    showNotification("הספר נמחק בהצלחה", "error");
  }

  function onEdit(book) {
    setEditingBook(book);
  }

  async function handleSave(updatedBook) {
    try{
      await updateBook(updatedBook._id, updatedBook); 
      showNotification("פרטי הספר נערכו בהצלחה");
      setEditingBook(null);
    } catch (err) {
      console.error('Failed to update book:', err);
    }
  }

  return (
    <div className="books-grid">
      {books.map(book => (
        <div key={book._id}>
          <Book book={book} />

          {!isAdmin && (
            <button onClick={() => addToCart(book)}>הוסף לסל</button>
          )}

          {isAdmin && (
            <div>
              <button onClick={() => onEdit(book)} className="button--warning">ערוך</button>
              <button onClick={() => onDelete(book)} className="button--danger">מחק</button>
            </div>
          )}
        </div>
      ))}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onSave={handleSave}
          onClose={() => setEditingBook(null)}
        />
      )}
    </div>
  );
}

export default BookGridWithButtons;

