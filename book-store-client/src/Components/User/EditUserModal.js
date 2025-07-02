import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {updateUserAction} from "../../services/authServices";

const EditUserModal = ({ user, onClose }) => {
  const { updateUserInfo } = useAuth();
  const [formData, setFormData] = useState({
    name: user.username,
    email: user.email,
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await updateUserAction(user.id, formData);
    updateUserInfo(newUser);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>עריכת פרטי משתמש</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="שם"
              type='text'
              name="name"
              value={formData.name}
              onChange={handleChange} />
          </label>
          <label>
            <input
              placeholder="אי-מייל"
              type='text'
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ direction: 'ltr' }} />
          </label>
          <label>
            <input
              placeholder="סיסמא"
              type='password'
              name="password"
              value={formData.password}
              onChange={handleChange} />
          </label>
          <br />
          <button type="submit">שמור</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
