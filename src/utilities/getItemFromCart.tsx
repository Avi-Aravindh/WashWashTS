import { Cart, Item } from '../context/AppProvider';

const getItemFromCart = (cart: Cart, item: Item): Item | boolean => {
  let searchItem = cart.cartItems.find((cartItem) => {
    return cartItem.Id === item.Id;
  });

  if (searchItem) {
    return searchItem;
  } else {
    return false;
  }
};

export default getItemFromCart;
