export const SET_CART = (items) => ({
  type: "SET_CART",
  payload: items,
});

export const ADD = (book) => ({
  type: "ADD",
  payload: book,
});

export const REMOVE = (book) => ({
  type: "REMOVE",
  payload: book,
});

export const CLEAR = () => ({
  type: "CLEAR",
});
