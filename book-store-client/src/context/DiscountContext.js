import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discount, setDiscount] = useState(0);

  // שליפה מהשרת כאשר הקומפוננטה נטענת
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/discount');
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
  const updateDiscount = async (newDiscount) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.patch(
      'http://localhost:8000/api/discount',
      { value: newDiscount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDiscount(response.data.value);
  } catch (error) {
    console.error("Failed to update discount:", error.message);
  }
};
  

  return (
    <DiscountContext.Provider value={{ discount, updateDiscount}}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => useContext(DiscountContext);

