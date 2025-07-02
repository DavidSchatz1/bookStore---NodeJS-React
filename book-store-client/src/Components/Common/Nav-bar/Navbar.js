import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function Navbar() {
  const { isAdmin } = useAuth();
  return (
    <nav className="navbar">
      {
        !isAdmin && <NavLink to="/" className={({ isActive }) => isActive ? "active nav-item" : "nav-item"}>דף הבית</NavLink>}
      {
        !isAdmin && <NavLink to="/books" className={({ isActive }) => isActive ? "active nav-item" : "nav-item"}>רשימת ספרים</NavLink>}
      {
        !isAdmin && <NavLink to="/cart" className={({ isActive }) => isActive ? "active nav-item" : "nav-item"}>סל קניות</NavLink>}
      {
        isAdmin && <NavLink to="/adminbookform" className={({ isActive }) => isActive ? "active nav-item" : "nav-item"}>עריכת רשימת הספרים (אדמין)</NavLink>
      }
    </nav>
  );
}

export default Navbar;
