import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchAPI } from '../utilities/APIHelpers';
import { App_Settings } from '../constants';

export interface appChoices {
  postCode: number;
}

export interface Category {
  Id: number;
  Name: string;
  itemImage: string;
}

export interface Item {
  Id: number;
  Name: string;
  Category: Category['categoryId'];
  Category_tags: [Category['categoryId']];
  Unit: number;
  UnitDescription: string;
  Price: string;
  OriginalPrice: string;
  itemImage: string;
  Description: string;
  width: number;
  height: number;
  QuantityInCart: number;
}
export interface Cart {
  cartItems: Item[];
}

export interface UserInformation {
  name: string;
  address: string;
  city: string;
  floor: string;
  doorNumber: string;
  postCode: string;
  phoneNumber: string;
  verified: boolean;
}

export interface Order {
  items: Item[];
  addressInformation: Address;
  billingInformation: Billing;
  pickupInformation: Pickup;
}

export interface Address {
  addressLine: string;
  city: string;
  floor: string;
  doorNumber: string;
  postCode: string;
}

export interface Billing {
  name: string;
  stripeCustomerId: string;
}

export interface Pickup {
  date: Date;
  time: string;
}

export interface TimeSlot {
  Id: string;
  Postcode: number;
  City: string;
  Date: string;
  Time: string;
  Zone: number;
}

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [postCode, setPostCode] = useState();
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [cart, setCart] = useState<Cart>({ cartItems: [] });
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [totalCartCost, setTotalCartCost] = useState(0);

  const [address, setAddress] = useState<Address>({});

  useEffect(() => {
    _getDevicePostCode();
    _getAllItems();
    _getOfferItems();

    // load cart from memory
    (async function loadCart() {
      await _getCart();
    })();

    // load address from device memory
    (async function loadAddress() {
      await _getAddress();
    })();
  }, []);

  useEffect(() => {
    let totalCount: number = 0;
    let totalCost: number = 0;

    if (cart.cartItems) {
      cart.cartItems.map((item) => {
        totalCount = totalCount + item.QuantityInCart;
        totalCost =
          totalCost + Number(item.QuantityInCart) * Number(item.Price);
      });
    }
    setTotalCartCount(totalCount);
    setTotalCartCost(totalCost);
  }, [cart]);

  // DEVICE POST CODE FUNCTIONS
  const _getDevicePostCode = async () => {
    try {
      let postCodeJSON = await AsyncStorage.getItem('@devicePostCode');

      if (postCodeJSON) {
        setPostCode(JSON.parse(postCodeJSON));
      } else {
        setPostCode(null);
      }
    } catch (e) {
      console.log('Error reading postcode from device', e);
    }
  };

  const _updatePostCode = async (newPostCode) => {
    try {
      let postCodeJSON = JSON.stringify(newPostCode);
      await AsyncStorage.setItem('@devicePostCode', postCodeJSON);
      _getDevicePostCode();
    } catch (e) {
      console.log('Error writing postcode', e);
    }
  };

  // All Items Functions
  const _getAllItems = async () => {
    try {
      let allItemsJSON = await AsyncStorage.getItem('@allItems');

      if (allItemsJSON) {
        setAllItems(JSON.parse(allItemsJSON));
      } else {
        setAllItems([]);
      }
    } catch (e) {
      console.log('Error reading all items from device', e);
    }
  };

  const _updateAllItems = async (newAllItems: Item[]) => {
    try {
      let newAllItemsJSON = JSON.stringify(newAllItems);
      await AsyncStorage.setItem('@allItems', newAllItemsJSON);
      _getAllItems();
    } catch (e) {
      console.log('Error writing all items', e);
    }
  };

  // Categories Functions
  const _getCategories = async () => {
    try {
      let categoriesJSON = await AsyncStorage.getItem('@categories');

      if (categoriesJSON) {
        setCategories(JSON.parse(categoriesJSON));
      } else {
        setCategories([]);
      }
    } catch (e) {
      console.log('Error reading categories from device', e);
    }
  };

  const _updateCategories = async (newCategories: Category[]) => {
    try {
      newCategories.sort((a, b) => a > b);
      newCategories.unshift({ Id: 0, Name: 'All', itemImage: '' });
      updateSelectedCategory({ Id: 0, Name: 'All', itemImage: '' });
      let newCategoriesJSON = JSON.stringify(newCategories);
      await AsyncStorage.setItem('@categories', newCategoriesJSON);
      _getCategories();
    } catch (e) {
      console.log('Error writing categories', e);
    }
  };

  // Offer Items Functions
  const _getOfferItems = async () => {
    try {
      let offerItemsJSON = await AsyncStorage.getItem('@offerItems');

      if (offerItemsJSON) {
        setOfferItems(JSON.parse(offerItemsJSON));
      } else {
        setOfferItems([]);
      }
    } catch (e) {
      console.log('Error reading offer items from device', e);
    }
  };

  const _updateOfferItems = async (newOfferItems: Item[]) => {
    try {
      let offerItemsJSON = JSON.stringify(newOfferItems);
      await AsyncStorage.setItem('@offerItems', offerItemsJSON);
      _getOfferItems();
    } catch (e) {
      console.log('Error writing offer items', e);
    }
  };

  // Cart Items Functions
  const updateCart = (item: Item) => {
    let tempCart = { ...cart };
    let existingItem = tempCart.cartItems.find(
      (cartItem) => cartItem.Id === item.Id
    );

    if (existingItem && item.QuantityInCart === 0) {
      deleteCartItem(existingItem);
      return;
    }
    if (existingItem) {
      tempCart.cartItems.find(
        (cartItem) => cartItem.Id === item.Id
      ).QuantityInCart = item.QuantityInCart;
      try {
        _updateCart(tempCart);
        _getCart();
      } catch (e) {
        console.log('could not update cart');
      }
      return;
    }

    tempCart.cartItems.push(item);
    try {
      _updateCart(tempCart);
      _getCart();
    } catch (e) {
      console.log('could not update cart');
    }
  };

  const deleteCartItem = (item: Item) => {
    let tempCart = { ...cart };
    let newCartItems = tempCart.cartItems.filter(
      (cartItem) => cartItem.Id !== item.Id
    );
    tempCart.cartItems = newCartItems;
    try {
      _updateCart(tempCart);
      _getCart();
    } catch (e) {
      console.log('error deleting cart item', e);
    }
  };

  const emptyCart = async () => {
    try {
      await AsyncStorage.clear();
      _getCart();
    } catch (e) {
      console.log('error clearing cart');
    }
  };

  // TODO async storage and API call
  const _updateCart = async (cart) => {
    try {
      let cartJSON = JSON.stringify(cart);
      await AsyncStorage.setItem('@cart', cartJSON);
    } catch (e) {
      console.log('Error writing cart', e);
    }
  };

  // TODO async storage and API call
  const _getCart = async () => {
    let emptyCart: Cart = { cartItems: [] };

    try {
      let cartJSON = await AsyncStorage.getItem('@cart');

      if (cartJSON) {
        setCart(JSON.parse(cartJSON));
      } else {
        setCart(emptyCart);
      }
    } catch (e) {
      console.log('Error reading cart', e);
    }
  };

  // Address Methods TODO convert _updateAddress and remove this function
  const updateAddress = (newAddress: Address) => {
    _updateAddress(newAddress);
  };

  // TODO async storage and API call. Convert to promise
  const _updateAddress = async (newAddress: Address) => {
    try {
      let addressJSON = JSON.stringify(newAddress);
      await AsyncStorage.setItem('@address', addressJSON);
      _getAddress();
    } catch (e) {
      console.log('Error writing address', e);
    }
  };

  // TODO get addresses from API
  const _getAddress = async () => {
    let emptyAddress: Address = {
      addressLine: '',
      city: '',
      floor: '',
      doorNumber: '',
      postCode: '',
    };

    try {
      let addressJSON = await AsyncStorage.getItem('@address');

      if (addressJSON) {
        setAddress(JSON.parse(addressJSON));
      } else {
        setAddress(emptyAddress);
      }
    } catch (e) {
      console.log('Error reading addresss', e);
    }
  };

  const updateSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <AppContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,

        postCode: postCode,
        _updatePostCode: _updatePostCode,

        allItems: allItems,
        _updateAllItems: _updateAllItems,

        offerItems: offerItems,
        _updateOfferItems: _updateOfferItems,

        categories: categories,
        _updateCategories: _updateCategories,

        cart: cart,
        totalCartCount: totalCartCount,
        totalCartCost: totalCartCost,
        selectedCategory: selectedCategory,
        updateSelectedCategory: updateSelectedCategory,
        updateCart: updateCart,
        emptyCart: emptyCart,

        address: address,
        updateAddress: updateAddress,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
