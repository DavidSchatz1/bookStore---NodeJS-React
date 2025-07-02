import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { useBooks } from './BookContext';
import { cartReducer, initialCartState } from '../reducers/cartReducer';
import * as CartActions from '../actions/CartActions';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const cartKey = user?.email || 'guest';

  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const { showNotification } = useNotification();
  const { books } = useBooks();


  // טעינה מה-localStorage
  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('carts')) || {};
    dispatch(CartActions.SET_CART(carts[cartKey] || []));
  }, [cartKey]);

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem('carts')) || {};
    carts[cartKey] = cart;
    localStorage.setItem('carts', JSON.stringify(carts));
  }, [cart, cartKey]);


  const addToCart = (book) => {
    const existingItemIndex = cart.findIndex(item => item.id === book.id);

    if (existingItemIndex !== -1) {
      // המוצר כבר קיים — נעדכן את הכמות
      dispatch(CartActions.INCREASE(book.id));
      showNotification(`${book.title} כמות עודכנה בעגלה`);
    } else {
      // מוצר חדש — נוסיף אותו עם כמות 1
      dispatch(CartActions.ADD(book));
      showNotification(`${book.title} נוסף לסל בהצלחה`);
    }
  };

  const decreaseQuantity = (bookId) => {
    dispatch(CartActions.DECREASE(bookId));
  };

  const increaseQuantity = (bookId) => {
    dispatch(CartActions.INCREASE(bookId));
  };



  // פונקציה להסרה
  const removeFromCart = (book) => {
    dispatch(CartActions.REMOVE(book));
    showNotification(`${book.title} הוסר מסל הקניות`, "error");
  };

  // ניקוי סל
  const clearCart = () => {
    dispatch(CartActions.CLEAR());
  };

  //פונקציה שמוודאה שהספרים עדיין קיימים ברשימת הספריםה מעודכנת, ואם לא, מסננת
  const getValidCartItems = () => {
    return cart
      .map(item => {
        const book = books.find(book => book.id === item.id);
        return book ? { ...book, quantity: item.quantity } : null;
      })
      .filter(item => !!item);
  };


  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getValidCartItems,
      decreaseQuantity,
      increaseQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
