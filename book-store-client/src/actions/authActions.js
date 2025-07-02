export const LOGIN = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const LOGOUT = () => ({
  type: "LOGOUT",
});

export const UPDATE_USER_INFO = (user) => ({
  type: "UPDATE_USER_INFO",
  payload: user,
});

export const DELETE_USER = () => ({
  type: "DELETE_USER",
});
