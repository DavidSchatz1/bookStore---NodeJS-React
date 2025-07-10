const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const ENDPOINTS = {
  BOOKS: {
    BASE: `${API_BASE_URL}/books`,
    GET_ALL: `${API_BASE_URL}/books/all`,
    GET_BY_ID: (id) => `${API_BASE_URL}/books/getBook/${id}`,
    CREATE: `${API_BASE_URL}/books/createBook`,
    UPDATE: (id) => `${API_BASE_URL}/books/updateBook/${id}`,
    DELETE: (id) => `${API_BASE_URL}/books/deleteBook/${id}`, 
  },

  CART: {
    GET: `${API_BASE_URL}/cart/getCart`,
    ADD: `${API_BASE_URL}/cart/addItem`,
    UPDATE_QUANTITY: `${API_BASE_URL}/cart/updateItemQuantity`,
    REMOVE_ITEM: (bookId) => `${API_BASE_URL}/cart/deleteBook/${bookId}`,
    CLEAR: `${API_BASE_URL}/cart/clearCart`,
  },

  DISCOUNT: {
    GET: `${API_BASE_URL}/discount/get`,
    UPDATE: `${API_BASE_URL}/discount/update`,
  },

  USERS: {
    BASE: `${API_BASE_URL}/users`,
    REGISTER: `${API_BASE_URL}/users/register`,
    LOGIN: `${API_BASE_URL}/users/login`,
    GET_CURRENT: `${API_BASE_URL}/users/getCurrent`,
    UPDATE: (id) => `${API_BASE_URL}/users/updateInfo/${id}`,
    DELETE: (id) => `${API_BASE_URL}/users/deleteUser/${id}`,
  }
};

export { API_BASE_URL, ENDPOINTS };
