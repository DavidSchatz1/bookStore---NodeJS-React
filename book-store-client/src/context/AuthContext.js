import { createContext, useEffect, useReducer } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationContext';
import { authReducer, initialAuthState } from '../reducers/authReducer';
import { loginAction, signUpAction, deleteAccountAction, updateUserAction } from '../services/authServices';
import * as authActions from '../actions/authActions';
import axios from 'axios';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

useEffect(() => {
  const fetchUserFromToken = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8000/api/users/getCurrent", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(authActions.LOGIN(response.data.user));
      console.log("משתמש מהטוקן:", response.data.user);
    } catch (err) {
      console.error("בעיה בזיהוי משתמש מהטוקן:", err);
    }  
  };

  fetchUserFromToken();
}, []);


  const updateUserInfo = (newUserInfo) => {
    console.log ('trying to update user', newUserInfo);
    dispatch(authActions.UPDATE_USER_INFO(newUserInfo));
    showNotification('פרטי המשתמש שונו בהצלחה!');
  };


  const login = (email, password) =>
    loginAction(email, password, dispatch, showNotification);


  function logout() {
    localStorage.removeItem("authToken");
    dispatch(authActions.LOGOUT());
    navigate("/login");
  }

  const signUp = (email, name, password) =>
    signUpAction(email, name, password, showNotification);


  const deleteOwnAccount = () =>
    deleteAccountAction(state.user, dispatch, navigate, showNotification);

  return (
    <AuthContext.Provider value={{
      user: state.user,
      isAdmin: state.isAdmin,
      login,
      logout,
      updateUserInfo,
      signUp,
      deleteOwnAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}