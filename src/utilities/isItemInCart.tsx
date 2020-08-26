import { Item, Cart } from '../context/AppProvider';

const isItemInCart = (cart: Cart, item: Item) => {
  if (cart.cartItems.find((cartItem: Item) => cartItem.Id === item.Id)) {
    return true;
  } else {
    return false;
  }
};

export default isItemInCart;
