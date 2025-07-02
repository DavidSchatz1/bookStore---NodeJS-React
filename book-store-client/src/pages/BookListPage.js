import React from 'react';
import Header from '../Components/Common/Header/Header';
import Navbar from '../Components/Common/Nav-bar/Navbar';
import BookList from '../Components/Books/BookList';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function BookListPage() {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return <Navigate to="/adminbookform" />;
  }
  return (
    <div className="page-wrapper">
      <Header></Header>
      <Navbar></Navbar>
      <div className='page-content'>
        <h1>רשימת ספרים</h1>
        <BookList></BookList>
      </div>

    </div>
  )
}

export default BookListPage