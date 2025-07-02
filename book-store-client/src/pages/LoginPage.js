import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Common/Header/Header';
import Navbar from '../Components/Common/Nav-bar/Navbar';

const LoginPage = () => {
  const { login, logout } = useAuth(); // הוספנו את logout
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('loggedInUser')) {
      showNotification('you are allready loged in', "error");
      navigate('/');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin (event) {
    event.preventDefault();
    const loggedInUser = await login(email, password);
    setEmail('');
    setPassword('');
    if (loggedInUser === null) {
      showNotification("invalid login, try again", "error");
      return;
    }

    if (loggedInUser.type === "admin") {
      logout();
      showNotification("Admins cannot log in through the user login page", "error");
      return;
    }

    await showNotification(`${loggedInUser.username}, you have successfully logged in`);
    navigate('/');

  };

  return (
    <div className="page-wrapper">
      <Header />
      <Navbar />
      <div className="login-form-wrapper page-content">

        <form className="login-form">
          <h2>התחבר לחשבון</h2>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="דואר אלקטרוני"
            className="login-input"
            style={{ direction: 'ltr' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="סיסמא"
            className="login-input"
          />
          <button
            className="btn-primary"
            onClick={(event) =>handleLogin (event)}
            disabled={!email || !password}
          >
            התחבר
          </button>
          <Link to={'/signuppage'} className='link-to-sign-up'>לא רשומים? הירשמו עכשיו</Link>
        </form>
      </div>
    </div>
  );

};

export default LoginPage;

