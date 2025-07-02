// מצב התחלתי — עגלה ריקה
export const initialCartState = [];

// רידוסר לניהול עגלת קניות
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const book = action.payload;
      const existingItemIndex = state.findIndex(item => item.id === book.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // מוצר חדש — נוסיף עם כמות 1
        return [...state, { ...book, quantity: 1 }];
      }
    }

    case 'REMOVE': {
      const bookId = action.payload;
      return state.filter(item => item.id !== bookId);
    }

    case 'INCREASE': {
      const bookId = action.payload;
      return state.map(item =>
        item.id === bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case 'DECREASE': {
      const bookId = action.payload;
      return state
        .map(item => {
          if (item.id === bookId) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter(Boolean);
    }

    case 'CLEAR': {
      return [];
    }

    case 'SET_CART': {
      return action.payload;
    }

    default:
      return state;
  }
}
