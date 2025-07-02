import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("success");

  function showNotification(msg, msgType = "success") {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => {
      setMessage(null);
      setType("success");
    }, 2000);
  }

  function hideNotification() {
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

