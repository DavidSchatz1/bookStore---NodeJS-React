import { useParams } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import Header from '../Common/Header/Header';
import Navbar from '../Common/Nav-bar/Navbar';

function BookPage() {
  const { books } = useBooks();
  const { id } = useParams();
  const bookId = Number(id);

  if (!id || isNaN(bookId)) {
    return <div>שגיאה: מזהה הספר לא תקין</div>;
  }

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return (
      <div className="page-wrapper">
        <Header />
        <Navbar />
        <div className="page-content">
          הספר לא נמצא!
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      <Navbar />
      <div className="page-content book-details">
        <div className="book-page-card">
          <img src={book.image} alt={book.title} className="book-image-big-screen" />
          <div className="book-info">
            <img src={book.image} alt={book.title} className="book-image-small-screen" />
            <div className='book-info-text'>
              <h1 className="book-title">{book.title}</h1>
              <h2 className="book-author">מאת {book.author}</h2>
              <p className="book-year">שנת יציאה: {book.year}</p>
              <p className="book-price">מחיר: {book.price} ₪</p>
              <p className="book-description-big-screen">{book.description}</p>
            </div>
          </div>
          <p className="book-description-small-screen">{book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
