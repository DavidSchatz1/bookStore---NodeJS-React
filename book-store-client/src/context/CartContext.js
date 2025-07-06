import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { cartReducer, initialCartState } from '../reducers/cartReducer';
import * as CartActions from '../actions/CartActions';
import * as cartService from '../services/cartService'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const { showNotification } = useNotification();

  // טוען עגלה מהשרת כשמשתמש משתנה
  useEffect(() => {
    if (user) {
      cartService.fetchCart(dispatch);
    } else {
      dispatch(CartActions.SET_CART([]));
    }
  }, [user]);

  const addToCart = async (book) => {
  if (!user) {
    showNotification("יש להתחבר כדי להוסיף לסל", "error");
    return;
  }
  try {
    console.log(book?._id)
    const alreadyInCart = cart.some(item => item.id === book._id);
    const res = await cartService.addToCart(dispatch, book._id);
    if (res?.success) {
      if (alreadyInCart) {
        showNotification(`${book.title} - כמות עודכנה בעגלה`);
      } else {
        showNotification(`${book.title} נוסף לסל בהצלחה`);
      }
    }
  } catch (err) {
    const msg = "שגיאה בעת הוספה לעגלה. נסה שוב.";
    showNotification(msg, "error");
  }
};


  const updateQuantity = async (bookId, newQuantity) => {
    try {
      const res = await cartService.updateQuantity(dispatch, bookId, newQuantity);
      if (res?.success) showNotification(`כמות עודכנה בעגלה`);
      else showNotification("עדכון כמות נכשל", "error");
    } catch (err) {
      console.error("עדכון כמות נכשל:", err);
      showNotification("אירעה שגיאה בעת עדכון הכמות", "error");
    }
  };

  const removeFromCart = async (book) => {
    try{
        const res = await cartService.removeFromCart(dispatch, book.id);
        if (res?.success) showNotification(`${book.title} הוסר מסל הקניות`, "error");
        else showNotification("שגיאה בעת הסרה מהעגלה", "error");
    } catch (err) {
      console.error(":שגיאה בעת הסרה מהעגלה", err);
      showNotification("שגיאה בעת הסרה מהעגלה", "error");
    }
  };

  const clearCart = async () => {
    try{
       const res = await cartService.clearCart(dispatch);
    if (res?.success) showNotification("עגלת הקניות הוסרה", "error");
    else showNotification("שגיאה בעת מחיקת עגלת הקניות", "error");
    } catch (err) {
      console.error("שגיאה בעת מחיקת עגלת הקניות", err);
      showNotification("שגיאה בעת הסרה מהעגלה", "error");
    }
  
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
