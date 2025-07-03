import { Navigate } from 'react-router-dom';
import Header from '../Common/Header/Header';
import Navbar from '../Common/Nav-bar/Navbar';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { useDiscount } from '../../context/DiscountContext';
import { useAuth } from '../../context/AuthContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';


function CartPage() {
  const { cart, clearCart } = useCart();
  const { showNotification } = useNotification();
  const { discount } = useDiscount();
  const { user, isAdmin } = useAuth();

  if (isAdmin) {
    return <Navigate to="/adminbookform" />;
  }

  // מחיר לאחר הנחה לכל ספר
  const getDiscountedPrice = (price) => {
    if (price != null) {
      price = Number(price);
    }
    return !!user && discount > 0
      ? (price * (1 - discount / 100))
      : price;
  };

  const totalPrice = cart.reduce((sum, book) => {
    const quantity = cart.find(item => item._id === book._id)?.quantity || 1;
    return sum + getDiscountedPrice(book.price) * quantity;
  }, 0);


  const calcOriginalFromDiscounted = (discounted, discount) => {
    return discounted / (1 - discount / 100);
  };

  // ערך שמיש
  const totalOriginalPrice = (!!user && discount > 0)
    ? calcOriginalFromDiscounted(totalPrice, discount)
    : totalPrice;


  function handleCheckout() {
    showNotification(`תודה על הרכישה! סך הכל שולם: ${totalPrice.toFixed(2)} ₪`);
    clearCart();
  }

  return (
    <div className="cart-page page-wrapper">
      <Header />
      <Navbar />
      <div className='page-content'>
        <h2 className='cart-page-title'>סל הקניות שלך</h2>
        {cart.length === 0 ? (
          <p>הסל ריק.</p>
        ) : (
          <div>
            <ul className="cart-list">
              {cart.map((book) => {
                const discounted = getDiscountedPrice(book.price).toFixed(2);
                const quantity = cart.find(item => item.id === book.id)?.quantity || 1;
                return (
                  <CartItem
                    key={book.id}
                    book={book}
                    quantity={quantity}
                    discounted={discounted}
                  />
                );
              })}
            </ul>

            <CartSummary
              totalOriginalPrice={totalOriginalPrice}
              totalPrice={totalPrice}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;

