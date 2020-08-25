import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchAPI } from '../utilities/APIHelpers';
import { App_Settings } from '../constants';

export interface appChoices {
  postCode: number;
}
export interface Category {
  categoryId: string;
  categoryTitle: string;
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

const tempAppCategories: Category[] = [
  { categoryId: '0', categoryTitle: 'Alla' },
  { categoryId: '1', categoryTitle: 'Överdel' },
  { categoryId: '2', categoryTitle: 'Underdel' },
  { categoryId: '3', categoryTitle: 'Acessoarer' },
  { categoryId: '4', categoryTitle: 'Högtid' },
];

// const tempOfferItems = [
//   {
//     itemId: '1',
//     title: 'Byxor',
//     location: 'default',
//     price: '80',
//     image: require('../../assets/tempOfferImages/frank-flores-394933.jpg'),

//     category: tempAppCategories.find((category) => category.categoryId == '0'),
//   },
//   {
//     itemId: '2',
//     title: 'Kulörtvätt',
//     location: 'default',
//     price: '60',
//     image: require('../../assets/tempOfferImages/francis-duval-37755.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '1'),
//   },
//   {
//     itemId: '3',
//     title: 'Klänning',
//     location: 'default',
//     price: '250',
//     image: require('../../assets/tempOfferImages/flaunter-com-178022.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '2'),
//   },
//   {
//     itemId: '4',
//     title: 'Kostym',
//     location: 'default',
//     price: '230',
//     image: require('../../assets/tempOfferImages/soroush-karimi-387509.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '3'),
//   },
//   {
//     itemId: '5',
//     title: 'Byxor1',
//     location: 'default',
//     price: '80',
//     image: require('../../assets/tempOfferImages/alexandra-gorn-260989.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '0'),
//   },
//   {
//     itemId: '6',
//     title: 'Kulörtvätt1',
//     location: 'default',
//     price: '60',
//     image: require('../../assets/tempOfferImages/dmitriy-ilkevich-437760.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '1'),
//   },
//   {
//     itemId: '7',
//     title: 'Klänning1',
//     location: 'default',
//     price: '250',
//     image: require('../../assets/tempOfferImages/michael-frattaroli-221247.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '2'),
//   },
//   {
//     itemId: '8',
//     title: 'Kostym1',
//     location: 'default',
//     price: '230',
//     image: require('../../assets/tempOfferImages/rui-silvestre-429616.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '3'),
//   },
//   {
//     itemId: '9',
//     title: 'Klänning1',
//     location: 'default',
//     price: '250',
//     image: require('../../assets/tempOfferImages/tim-wright-512701.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '4'),
//   },
//   {
//     itemId: '10',
//     title: 'Kostym1',
//     location: 'default',
//     price: '230',
//     image: require('../../assets/tempOfferImages/william-stitt-196804.jpg'),
//     category: tempAppCategories.find((category) => category.categoryId == '0'),
//   },
// ];

const AppProvider = (props) => {
  const [postCode, setPostCode] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [cart, setCart] = useState<Cart>({ cartItems: [] });
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [totalCartCost, setTotalCartCost] = useState(0);

  const [address, setAddress] = useState<Address>({});

  useEffect(() => {
    setCategories(tempAppCategories);
    setSelectedCategory(tempAppCategories[0]);

    let productsAPI = App_Settings.API_GET_PRODUCTS + 'zip_code=72212';

    // load all items from API
    (async function loadItems() {
      let tempItems = await fetchAPI(productsAPI);
      setAllItems(tempItems);
    })();

    // load deals from API
    (async function loadItems() {
      let tempItems = await fetchAPI(App_Settings.API_GET_DEALS);
      setOfferItems(tempItems);
    })();

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

  // Cart Items

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

  const _updateCart = async (cart) => {
    try {
      let cartJSON = JSON.stringify(cart);
      await AsyncStorage.setItem('@cart', cartJSON);
    } catch (e) {
      console.log('Error writing cart', e);
    }
  };

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

  // Address Methods
  const updateAddress = (newAddress: Address) => {
    _updateAddress(newAddress);
  };

  const _updateAddress = async (newAddress: Address) => {
    try {
      let addressJSON = JSON.stringify(newAddress);
      await AsyncStorage.setItem('@address', addressJSON);
      _getAddress();
    } catch (e) {
      console.log('Error writing address', e);
    }
  };

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
        postCode: postCode,
        isUserLoggedIn: isUserLoggedIn,
        allItems: allItems,
        offerItems: offerItems,
        categories: categories,
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
