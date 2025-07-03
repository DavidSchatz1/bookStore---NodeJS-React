import axios from 'axios';
import * as CartActions from '../actions/CartActions';
import { ENDPOINTS } from '../config';



export const fetchCart = async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(ENDPOINTS.CART.GET, 
      {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART(res.data.items || []));
  } catch (err) {
    console.error('Failed to fetch cart:', err);
  }
};

// export const addToCart = async (dispatch, bookId) => {
//   try {
//     const token = localStorage.getItem('authToken');
//     const res = await axios.post(ENDPOINTS.CART.ADD
//       , { bookId }, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     dispatch(CartActions.SET_CART(res.data.items));
//   } catch (err) {
//     console.error('Failed to add to cart:', err);
//   }
// };

export const addToCart = async (dispatch, bookId) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.post(
      ENDPOINTS.CART.ADD,
      { bookId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(CartActions.SET_CART(res.data.items));
  } catch (err) {
    console.error('Failed to add to cart:', err);
    throw err; // 👈 זו השורה שצריך להוסיף כדי להעביר את השגיאה למעלה
  }
};


export const updateQuantity = async (dispatch, bookId, quantity) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.patch(ENDPOINTS.CART.UPDATE_QUANTITY
      , { bookId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART(res.data.items));
    return { success: true };
  } catch (err) {
    console.error('Failed to update quantity:', err);
    return { success: false };
  }
};

export const removeFromCart = async (dispatch, bookId) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.delete(ENDPOINTS.CART.REMOVE_ITEM(bookId)
      , {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART(res.data.items));
  } catch (err) {
    console.error('Failed to remove from cart:', err);
  }
};

export const clearCart = async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(ENDPOINTS.CART.CLEAR, 
       {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART([]));
  } catch (err) {
    console.error('Failed to clear cart:', err);
  }
};
