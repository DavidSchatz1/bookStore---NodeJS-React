import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config';

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discount, setDiscount] = useState(0);

  // שליפה מהשרת כאשר הקומפוננטה נטענת
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(ENDPOINTS.DISCOUNT.GET);
        if (response.data?.value !== undefined) {
          setDiscount(response.data.value);
        }
      } catch (error) {
        console.error("Failed to fetch discount:", error.message);
      }
    };

    fetchDiscount();
  }, []);

  // עדכון ההנחה גם בשרת וגם בסטייט
//   const updateDiscount = async (newDiscount) => {
//   try {
//     const token = localStorage.getItem('authToken');
//     const response = await axios.patch(ENDPOINTS.DISCOUNT.UPDATE
//       ,
//       { value: newDiscount },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setDiscount(response.data.value);
//   } catch (error) {
//     console.error("Failed to update discount:", error.message);
//   }
// };

const updateDiscount = async (newDiscount) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.patch(
      ENDPOINTS.DISCOUNT.UPDATE,
      { value: newDiscount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setDiscount(response.data.value);
    return { success: true };

  } catch (error) {
    console.error("Failed to update discount:", error);

    const message =
      error.response?.data?.errors?.[0] ||
      error.response?.data?.message ||
      "שגיאה בעדכון הנחה";

    return { success: false, message };
  }
};

  

  return (
    <DiscountContext.Provider value={{ discount, updateDiscount}}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => useContext(DiscountContext);

