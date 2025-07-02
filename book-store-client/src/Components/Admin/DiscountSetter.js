import React, { useState } from 'react';
import { useDiscount } from '../../context/DiscountContext';
import { useNotification } from '../../context/NotificationContext';

function DiscountSetter() {
  const { discount, updateDiscount } = useDiscount();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(discount);
  const { showNotification } = useNotification();

  const handleSave = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      updateDiscount(parsed);
      setShowInput(false);
      showNotification("הנחת משתמשים רשומים שונתה בהצלחה")

    } else {
      alert('אנא הזן ערך בין 0 ל-100');
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
