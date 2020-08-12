import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import { Asset } from 'expo-asset';
import { Image } from 'react-native';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';

export interface Category {
  categoryId: string;
  categoryTitle: string;
}

export interface Item {
  itemId: string;
  title: string;
  location: string;
  price: string;
  image: any;
  category: Category;
}

export interface CartItem {
  itemId: string;
  title: string;
  location: string;
  price: string;
  image: any;
  category: Category;
  quantity: number;
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

export interface BillingInformation {}

export interface DeliveryInformation {}

export interface PickupInformation {}

export interface Cart {
  cartItems: CartItem[];
}

export interface Order {
  cartInformation: Cart;
  userInformation: UserInformation;
  billingInformation: BillingInformation;
  deliveryInformation: DeliveryInformation;
  pickupInformation: PickupInformation;
}

const tempAppCategories: Category[] = [
  { categoryId: '0', categoryTitle: 'Alla' },
  { categoryId: '1', categoryTitle: 'Överdel' },
  { categoryId: '2', categoryTitle: 'Underdel' },
  { categoryId: '3', categoryTitle: 'Acessoarer' },
  { categoryId: '4', categoryTitle: 'Högtid' },
];

const tempOfferItems = [
  {
    itemId: '1',
    title: 'Byxor',
    location: 'default',
    price: '80',
    image: require('../assets/tempOfferImages/frank-flores-394933.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '0'),
  },
  {
    itemId: '2',
    title: 'Kulörtvätt',
    location: 'default',
    price: '60',
    image: require('../assets/tempOfferImages/francis-duval-37755.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '1'),
  },
  {
    itemId: '3',
    title: 'Klänning',
    location: 'default',
    price: '250',
    image: require('../assets/tempOfferImages/flaunter-com-178022.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '2'),
  },
  {
    itemId: '4',
    title: 'Kostym',
    location: 'default',
    price: '230',
    image: require('../assets/tempOfferImages/soroush-karimi-387509.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '3'),
  },
  {
    itemId: '5',
    title: 'Byxor1',
    location: 'default',
    price: '80',
    image: require('../assets/tempOfferImages/alexandra-gorn-260989.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '0'),
  },
  {
    itemId: '6',
    title: 'Kulörtvätt1',
    location: 'default',
    price: '60',
    image: require('../assets/tempOfferImages/dmitriy-ilkevich-437760.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '1'),
  },
  {
    itemId: '7',
    title: 'Klänning1',
    location: 'default',
    price: '250',
    image: require('../assets/tempOfferImages/michael-frattaroli-221247.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '2'),
  },
  {
    itemId: '8',
    title: 'Kostym1',
    location: 'default',
    price: '230',
    image: require('../assets/tempOfferImages/rui-silvestre-429616.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '3'),
  },
  {
    itemId: '9',
    title: 'Klänning1',
    location: 'default',
    price: '250',
    image: require('../assets/tempOfferImages/tim-wright-512701.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '4'),
  },
  {
    itemId: '10',
    title: 'Kostym1',
    location: 'default',
    price: '230',
    image: require('../assets/tempOfferImages/william-stitt-196804.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '0'),
  },
];

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [cart, setCart] = useState<Cart>({ cartItems: [] });
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [totalCartCost, setTotalCartCost] = useState(0);

  useEffect(() => {
    setAllItems(tempOfferItems);
    setOfferItems(tempOfferItems.slice(0, 4));
    setCategories(tempAppCategories);
    setSelectedCategory(tempAppCategories[0]);

    (async function loadCart() {
      await _getCart();
    })();
    // tempOfferItems.map((item) => {
    //   Asset.fromModule(item.image).downloadAsync();
    // });
  }, []);

  useEffect(() => {
    let totalCount: number = 0;
    let totalCost: number = 0;

    if (cart.cartItems) {
      cart.cartItems.map((item) => {
        totalCount = totalCount + item.quantity;
        totalCost = totalCost + Number(item.quantity) * Number(item.price);
      });
    }
    setTotalCartCount(totalCount);
    setTotalCartCost(totalCost);
  }, [cart]);

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

  const updateSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const updateCart = (item: CartItem) => {
    let tempCart = { ...cart };
    let existingItem = tempCart.cartItems.find(
      (cartItem) => cartItem.itemId === item.itemId
    );

    if (existingItem && item.quantity === 0) {
      deleteCartItem(existingItem);
      return;
    }
    if (existingItem) {
      tempCart.cartItems.find(
        (cartItem) => cartItem.itemId === item.itemId
      ).quantity = item.quantity;
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

  const deleteCartItem = (item: CartItem) => {
    let tempCart = { ...cart };
    let newCartItems = tempCart.cartItems.filter(
      (cartItem) => cartItem.itemId !== item.itemId
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

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
