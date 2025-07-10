import { useNavigate } from 'react-router-dom';
import { useDiscount } from '../../context/DiscountContext';
import { useAuth } from '../../context/AuthContext';

function Book({ book }) {
  const navigate = useNavigate();
  const { discount } = useDiscount();
  const { user } = useAuth();

  const hasDiscount = !!user && discount > 0;
  const discountedPrice = hasDiscount
    ? (book.price * (1 - discount / 100)).toFixed(2)
    : book.price;

  const handleClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="book-card" onClick={() => handleClick(book._id)}>
      <img
        src={book.image}
        alt={`עטיפת הספר "${book.title}"`}
      />
      <h2>{book.title}</h2>
      <p>מחבר: {book.author}</p>
      <p>שנה: {book.year}</p>
      <p>
        {hasDiscount ? (
          <>
            מחיר: <span className="price-original">{book.price}₪ </span>
            <span className="price-discounted">
              {discountedPrice}₪ (הנחה {discount}%)
            </span>
          </>
        ) : (
          <>מחיר: {book.price} ₪</>
        )}
      </p>
    </div>
  );
}

export default Book;
