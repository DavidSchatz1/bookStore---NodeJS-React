import axios from 'axios';
import * as authActions from '../actions/authActions';
import { ENDPOINTS } from '../config';

export async function loginAction(email, password, dispatch, showNotification) {
  try {
    const response = await axios.post(ENDPOINTS.USERS.LOGIN,
       {
      "email": email,
      "password": password
    });

    const { token, user } = response.data;

    localStorage.setItem('authToken', token);

    dispatch(authActions.LOGIN(user));
    showNotification("התחברת בהצלחה", "success");
    return user;
  } catch (error) {
    console.error('Failed to login:', error);
    return null;
  }
}

export async function signUpAction(email, username, password, showNotification) {
  try {
    await axios.post(ENDPOINTS.USERS.REGISTER,
       {
      email,
      username,
      password
    });
    showNotification("נרשמת בהצלחה! עכשיו תוכל להתחבר", "success");
  } catch (error) {
    // שגיאה שהגיעה מהשרת
    if (error.response?.data?.error) {
      showNotification(error.response.data.error, "error");
    } else if (error.response?.data?.errors?.length > 0) {
      showNotification(error.response.data.errors[0], "error");
    } else {
      showNotification("שגיאה בעת ההרשמה. נסה שוב מאוחר יותר.", "error");
    }
  }
}

export async function deleteAccountAction(user, dispatch, showNotification) {
  console.log(user)
  if (!user || !user.id) {
    showNotification("משתמש לא תקין", "error");
    return;
  }

  const token = localStorage.getItem('authToken');
  if (!token) {
    showNotification("לא נמצא טוקן התחברות", "error");
    return;
  }

  try {
    await axios.delete(ENDPOINTS.USERS.DELETE(user.id),
       {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("authToken");
    dispatch({ type: "LOGOUT" });
    showNotification("החשבון נמחק בהצלחה", "success");
  } catch (error) {
    console.error("שגיאה במחיקת החשבון:", error);
    const serverMessage = error.response?.data?.message || "שגיאה במחיקת החשבון";
    showNotification(serverMessage, "error");
  }
}

export async function updateUserAction(userId, formData, showNotification) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.warn("אין טוקן – המשתמש כנראה לא מחובר");
    return;
  }

  const updatedUserData = {
    email: formData.email,
    username: formData.name,
    password: formData.password
  };

  try {
    const response = await axios.patch(ENDPOINTS.USERS.UPDATE(userId),
      updatedUserData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response?.data?.user

  } catch (error) {
    const message = error?.response?.data?.message || "שגיאה בעדכון המשתמש";
    console.error("Update user error:", message);
    throw new Error(message);
  } 
}


