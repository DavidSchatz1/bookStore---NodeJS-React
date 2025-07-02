import React, { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import EditUserModal from "../Components/User/EditUserModal";
import Header from "../Components/Common/Header/Header";
import Navbar from "../Components/Common/Nav-bar/Navbar";
import DeleteUserModal from "../Components/User/DeleteUserModal";

const UserProfilePage = () => {
  const { user, deleteOwnAccount } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="page-wrapper">
      <Header></Header>
      <Navbar></Navbar>
      <div>
        {!user ?
          <h1 className="page-content">אין משתמש מחובר</h1>
          :
          <div className="page-content">
            <h1>פרטי המשתמש</h1>
            <p><strong>שם:</strong> {user.username}</p>
            <p><strong>אימייל:</strong> {user.email}</p>

            <button onClick={() => setShowModal(true)}>ערוך פרטי חשבון</button>
            <button onClick={() => setShowDeleteModal(true)} className="button--danger"> מחק את חשבונך </button>

            {showModal && (
              <EditUserModal
                user={user}
                onClose={() => setShowModal(false)}
              />
            )}
            <div className="modal-wrapper">
              {showDeleteModal && (
                <DeleteUserModal
                  onConfirm={() => {
                    deleteOwnAccount();
                    setShowDeleteModal(false);
                  }}
                  onCancel={() => setShowDeleteModal(false)}
                />
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default UserProfilePage;
