import { Item, Cart } from '../context/AppContext';

const isItemInCart = (cart: Cart, item: Item) => {
  if (
    cart.cartItems.find((cartItem: Item) => cartItem.itemId === item.itemId)
  ) {
    return true;
  } else {
    return false;
  }
};

export default isItemInCart;
