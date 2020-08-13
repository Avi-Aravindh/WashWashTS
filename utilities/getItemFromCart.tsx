import { Cart, CartItem } from '../context/AppProvider';

const getItemFromCart = (cart: Cart, item: CartItem): CartItem | boolean => {
  //   console.log(':Cat', cart, item);
  let searchItem = cart.cartItems.find((cartItem) => {
    return cartItem.itemId === item.itemId;
  });

  if (searchItem) {
    return searchItem;
  } else {
    return false;
  }
};

export default getItemFromCart;
