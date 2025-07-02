import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useDiscount } from '../../context/DiscountContext';

function CartItem({ book, quantity, discounted }) {
  const { removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const { discount } = useDiscount();
  const { user } = useAuth();

  return (
    <li className="cart-item">
      <div className="remove-wrapper">
        <button onClick={() => removeFromCart(book)} className="remove-button">×</button>
      </div>

      <div className="cart-item__image">
        <img src={book.image} alt={book.title} />
      </div>

      <div className="cart-item__details">
        <div className="cart-item__title">{book.title}</div>
        <div className="cart-item__author">מאת {book.author}</div>
      </div>

      <div className="cart-item__price">
        {!!user && discount > 0 ? (
          <>
            <div className="original-price">{book.price} ₪</div>
            <div className="discounted-price">{discounted} ₪</div>
            <div className="discount-percent">({discount}% הנחה)</div>
          </>
        ) : (
          <div className="price">מחיר: {book.price} ₪</div>
        )}
      </div>

      <div className="cart-item__quantity">
        <button onClick={() => decreaseQuantity(book.id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => increaseQuantity(book.id)}>+</button>
      </div>
    </li>
  );
}

export default CartItem;
