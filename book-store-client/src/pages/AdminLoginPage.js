import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    console.log(res);
    console.log(res.isAdmin);
    
    if (!res || !res?.isAdmin) {
      showNotification("פרטי התחברות שגויים או שאינך אדמין", "error");
      logout(); // מנקה כל משתמש לא מתאים
      return;
    }

    showNotification("ברוך הבא, מנהל");
    navigate("/adminbookform");
  };

  return (
    <div className='admin-login-page'>
      <h2>התחברות אדמין</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>אימייל:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>סיסמה:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={!email || !password}>התחבר</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
