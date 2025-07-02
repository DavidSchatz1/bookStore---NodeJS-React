import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { DiscountProvider } from './context/DiscountContext';
import { BookProvider } from './context/BookContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BookProvider>
        <DiscountProvider>
          <NotificationProvider>
            <AuthProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </AuthProvider>
          </NotificationProvider>
        </DiscountProvider>
      </BookProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
