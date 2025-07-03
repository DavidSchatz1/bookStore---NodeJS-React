import { useDiscount } from '../../context/DiscountContext';
import { useAuth } from '../../context/AuthContext';

function CartSummary({ totalOriginalPrice, totalPrice, onCheckout }) {
  const { discount } = useDiscount();
  const { user } = useAuth();

  return (
    <div className="checkout-section">
      <h2>סיכום הזמנה</h2>
      {!!user && discount > 0 ? (
        <p>
          סה"כ לתשלום: <s>{totalOriginalPrice.toFixed(2)}₪</s>{' '}
          <span style={{ color: 'green', fontWeight: 'bold' }}>
            {totalPrice.toFixed(2)}₪ ({discount}% הנחה)
          </span>
        </p>
      ) : (
        <p>סה"כ לתשלום: {totalPrice.toFixed(2)} ₪</p>
      )}

      <button onClick={onCheckout}>לתשלום</button>
    </div>
  );
}

export default CartSummary;
