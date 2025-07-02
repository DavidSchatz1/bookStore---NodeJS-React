import React from 'react'
import BookList from '../Books/BookList'
import Header from '../Common/Header/Header'
import Navbar from '../Common/Nav-bar/Navbar'
import DiscountSetter from './DiscountSetter'

function AdminBookForm() {
  return (
    <div className="page-wrapper">
      <Header></Header>
      <Navbar></Navbar>
      <div className='page-content'>
        <h1>מרכז הפעולות למנהל</h1>
        <div className='container'>
          <DiscountSetter />
        </div>
        <BookList />
      </div>

    </div>

  )
}

export default AdminBookForm