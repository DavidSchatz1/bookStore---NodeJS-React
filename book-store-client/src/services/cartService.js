import axios from 'axios';
import * as CartActions from '../actions/CartActions';

const API_URL = 'http://localhost:8000/api/cart';

export const fetchCart = async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART(res.data.items || []));
  } catch (err) {
    console.error('Failed to fetch cart:', err);
  }
};

export const addToCart = async (dispatch, bookId) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.post(API_URL, { bookId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART(res.data.items));
  } catch (err) {
    console.error('Failed to add to cart:', err);
  }
};

export const updateQuantity = async (dispatch, bookId, quantity) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.patch(API_URL, { bookId, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART(res.data.items));
  } catch (err) {
    console.error('Failed to update quantity:', err);
  }
};

export const removeFromCart = async (dispatch, bookId) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.delete(`${API_URL}/${bookId}`, {
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
    await axios.delete(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(CartActions.SET_CART([]));
  } catch (err) {
    console.error('Failed to clear cart:', err);
  }
};
