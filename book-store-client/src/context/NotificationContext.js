import React, { createContext, useContext, useState, useRef } from 'react'; // ייבוא useRef

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("success");
  const timerRef = useRef(null); // יצירת useRef לשמירת מזהה הטיימר

  function showNotification(msg, msgType = "success") {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(msg);
    setType(msgType);

    timerRef.current = setTimeout(() => {
      setMessage(null);
      setType("success");
      timerRef.current = null; 
    }, 2000);
  }

  function hideNotification() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMessage(null);
    setType("success");
  }

  return (
    <NotificationContext.Provider value={{ message, type, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}