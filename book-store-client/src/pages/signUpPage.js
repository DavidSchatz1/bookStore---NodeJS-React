import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Header from '../Components/Common/Header/Header';
import Navbar from '../Components/Common/Nav-bar/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const { signUp, user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // נבדוק האם הסיסמאות תואמות בכל שינוי
  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  async function handleSignUp (event) {
    event.preventDefault();
    await signUp(email, username, password);
    await showNotification("נרשמת בהצלחה! עכשיו תוכל להתחבר", "success");
    navigate("/login")
  };

  if (!!user) {
    navigate("/");
  }

  return (
    <div className="page-wrapper">
      <Header />
      <Navbar />
      <div className='page-content'>
        <h2>הרשמה</h2>
        <div className='signup-container'>
          <form className="signup-form">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="דואר אלקטרוני"
              className="signup-input"
              style={{ direction: 'ltr' }}
            />
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="שם משתמש"
              className="signup-input"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="סיסמא"
              className="signup-input"
            />
            <input
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (!confirmTouched) setConfirmTouched(true);
              }}
              placeholder="חזרה על הסיסמא"
              className="signup-input"
            />
            {confirmTouched && !passwordsMatch && (
              <div className='password-warning'>
                הסיסמאות חייבות להיות תואמות
              </div>
            )}
            <button
              className="btn-primary"
              onClick={(event) => handleSignUp(event)}
              disabled={
                !email || !username || !password || !confirmPassword || !passwordsMatch
              }
            >
              הרשמה
            </button>
            <Link to={"/login"} className='link-to-login'>רשומים? התחברו כאן</Link>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
