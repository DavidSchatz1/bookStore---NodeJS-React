const Cart = require('../models/cartModel');

async function removeBookFromAllCarts(bookIdToDelete) {
  try {
    await Cart.updateMany(
      {},
      { $pull: { items: { bookId: bookIdToDelete } } }
    );
    console.log(`Book ${bookIdToDelete} removed from all carts`);
  } catch (error) {
    console.error(`Failed to remove book ${bookIdToDelete} from carts:`, error);
  }
}

module.exports = {
  removeBookFromAllCarts
};
