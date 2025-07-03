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
    BASE: `${API_BASE_URL}/cart`,
    GET: `${API_BASE_URL}/cart`,
    ADD: `${API_BASE_URL}/cart`,
    UPDATE_QUANTITY: `${API_BASE_URL}/cart`,
    REMOVE_ITEM: (bookId) => `${API_BASE_URL}/cart/${bookId}`,
    CLEAR: `${API_BASE_URL}/cart`,
  },

  DISCOUNT: {
    BASE: `${API_BASE_URL}/discount`,
    GET: `${API_BASE_URL}/discount`,
    UPDATE: `${API_BASE_URL}/discount`,
  },

  USERS: {
    BASE: `${API_BASE_URL}/users`,
    REGISTER: `${API_BASE_URL}/users/register`,
    LOGIN: `${API_BASE_URL}/users/login`,
    GET_CURRENT: `${API_BASE_URL}/users/getCurrent`,
    UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id) => `${API_BASE_URL}/users/${id}`,
  }
};

export { API_BASE_URL, ENDPOINTS };
