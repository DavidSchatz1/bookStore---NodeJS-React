const DeleteUserModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onCancel}>×</button>
        <h2>מחיקת חשבון</h2>
        <p>האם אתה בטוח שברצונך למחוק את חשבונך? פעולה זו אינה הפיכה.</p>
        <br />
        <button onClick={onConfirm} className="button--danger">מחק לצמיתות</button>
        <button onClick={onCancel}>ביטול</button>
      </div>
    </div>
  );
};

export default DeleteUserModal;
