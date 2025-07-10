import { useState } from 'react';
import { useDiscount } from '../../context/DiscountContext';
import { useNotification } from '../../context/NotificationContext';

function DiscountSetter() {
  const { discount, updateDiscount } = useDiscount();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(discount);
  const { showNotification } = useNotification();

const handleSave = async () => {
  const parsed = parseFloat(inputValue);
  try {
    if (isNaN(parsed) || parsed < 0 || parsed > 99) {
      showNotification("אנא הזן ערך בין 0 ל-100", "error");
      setInputValue(discount);
      return; 
    }
    const result = await updateDiscount(parsed);
 
    if (result.success) {
      showNotification("הנחת משתמשים רשומים שונתה בהצלחה", "success");
    } else {
      showNotification(result.message, "error");
    }
  } catch (error) {
    console.error("שגיאה בלתי צפויה ב-handleSave:", error);
    showNotification("אירעה שגיאה בלתי צפויה בעת שמירת ההנחה.", "error");
  } finally {
    setInputValue(discount);
    setShowInput(false);
  }
};

  return (
    <div>
      <h3>הנחת משתמשים רשומים: {discount}%</h3>
      {showInput ? (
        <div>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min="0"
            max="100"
            step="1"
          />
          <button onClick={handleSave}>שמור</button>
          <button onClick={() => setShowInput(false)} className='button--danger'>בטל</button>
        </div>
      ) : (
        <button onClick={() => setShowInput(true)}>עדכן הנחה</button>
      )}
    </div>
  );
}

export default DiscountSetter;
