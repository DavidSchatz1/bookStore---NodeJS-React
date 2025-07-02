import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

function Header() {
  //searching bar
  const [isFocused, setIsFocused] = useState(false);

  const { getValidCartItems } = useCart();
  const validCartItems = getValidCartItems(); // ← שינוי כאן
  const cartCount = validCartItems.length;

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // מעבירים את החיפוש לכתובת
    navigate(`/search?query=${query}`);
  };

  //user Login data

  const { user, logout, isAdmin } = useAuth();

  // shoping cart navigation
  const onClickCart = () => {
    navigate('/cart')
  }
  //profile navigation
  const onClickProfile = () => {
    navigate('/profile')
  }

  return (
    <div className='header-main'>
      <div className="header-left">
        <div className='header-icon' onClick={() => { navigate("/") }}>
          <ImBooks className='books-image' />
          <div className='header-icon-text'>dave's books</div>
        </div>
        {!!user && <span className="greeting">שלום, {user.username}</span>}
        <IoPersonOutline onClick={onClickProfile} className='user-icon-small-screen' />
      </div>

      <div className='icons'>
        {!isAdmin && (
          <div className="cart-icon-wrapper" onClick={onClickCart}>
            <CiShoppingCart className='cart-icon' />
            {cartCount > 0 && (
              <div className="cart-badge">
                {cartCount > 99 ? '99+' : cartCount}
              </div>
            )}
          </div>
        )}
        <IoPersonOutline onClick={onClickProfile} className='user-icon-big-screen' />
      </div>

      <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
        <input
          type="text"
          placeholder='חפש לפי ספר שם מחבר...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <MdSearch onClick={handleSearch} />
      </div>
      {!!user ? (
        <>
          <button className="login-btn" onClick={logout}>התנתק</button>
        </>
      ) : (
        <Link to="/login">התחבר</Link>
      )}
    </div>
  )
}

export default Header;