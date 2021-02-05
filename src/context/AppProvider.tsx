import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchPOSTAPI } from '../utilities/APIHelpers';
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
  moms: number;
}
export interface Cart {
  cartItems: Item[];
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  personNumber: string;
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

export interface TimeSlots {
  date: string;
  day: string;
  timeSlots: [string];
}
export interface TimeSlot {
  date: string;
  day: string;
  timeSlot: string;
}

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personNumber, setPersonNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [verified, setVerified] = useState<boolean>();
  const [postCode, setPostCode] = useState();
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const [cart, setCart] = useState<Cart>({ cartItems: [] });
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [totalCartCost, setTotalCartCost] = useState(0);
  const [momsInformation, setMomsInformation] = useState({});

  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [allAddresses, setAllAddress] = useState<Address[]>([]);
  const [address, setAddress] = useState<Address>({});
  const [pickupSlot, setPickupSlot] = useState<TimeSlot>();

  useEffect(() => {
    _getDevicePostCode();
    _getAllItems();
    _getOfferItems();
    _getVerification();
    _getDevicePhoneNumber();

    // load cart from memory
    (async function loadCart() {
      await _getCart();
    })();

    // load userProfile from device memory
    (async function loadUserProfile() {
      await _getUserProfile();
    })();

    // load address from device memory
    (async function loadAddress() {
      await _getAddress();
    })();
  }, []);

  useEffect(() => {
    let totalCount: number = 0;
    let totalCost: number = 0;
    let tempMomsInformation = {};

    if (cart.cartItems) {
      cart.cartItems.map((item) => {
        totalCount = totalCount + item.QuantityInCart;
        totalCost =
          totalCost + Number(item.QuantityInCart) * Number(item.Price);

        let itemMoms = Number(
          item.Price - item.Price / (1 + item.moms / 100)
        ).toFixed(2);
        let itemNetto = Number(item.Price - itemMoms).toFixed(2);
        let itemBrutto = Number(item.Price);

        if (!tempMomsInformation[item.moms]) {
          tempMomsInformation[item.moms] = {
            moms: itemMoms * item.QuantityInCart,
            netto: itemNetto * item.QuantityInCart,
            brutto: itemBrutto * item.QuantityInCart,
          };
        } else {
          tempMomsInformation[item.moms].moms =
            Number(tempMomsInformation[item.moms].moms) +
            Number(itemMoms * item.QuantityInCart);
          tempMomsInformation[item.moms].netto =
            Number(tempMomsInformation[item.moms].netto) +
            Number(itemNetto * item.QuantityInCart);
          tempMomsInformation[item.moms].brutto =
            Number(tempMomsInformation[item.moms].brutto) +
            Number(itemBrutto * item.QuantityInCart);
        }
      });
    }
    setMomsInformation(tempMomsInformation);
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

  // DEVICE PHONE NUMBER FUNCTIONS
  const _getDevicePhoneNumber = async () => {
    try {
      let phoneNumberJSON = await AsyncStorage.getItem('@devicePhoneNumber');

      if (phoneNumberJSON) {
        setPhoneNumber(JSON.parse(phoneNumberJSON));
      } else {
        setPhoneNumber(null);
      }
    } catch (e) {
      console.log('Error reading phone number from device', e);
    }
  };

  const _updatePhoneNumber = async (newPhoneNumber: string) => {
    try {
      let phoneNumberJSON = JSON.stringify(newPhoneNumber);
      await AsyncStorage.setItem('@devicePhoneNumber', phoneNumberJSON);
      _getDevicePhoneNumber();
    } catch (e) {
      console.log('Error writing phone number', e);
    }
  };

  // PHONE NUMBER VERIFIED FUNCTIONS
  const _getVerification = async () => {
    try {
      let verificationJSON = await AsyncStorage.getItem('@isUserVerified');

      if (verificationJSON) {
        setVerified(JSON.parse(verificationJSON));
      } else {
        setVerified(null);
      }
    } catch (e) {
      console.log('Error reading verification status from device', e);
    }
  };

  const _updateVerification = async (newVerificationState: boolean) => {
    console.log('verification writong', newVerificationState);
    try {
      let verificationJSON = JSON.stringify(newVerificationState);
      await AsyncStorage.setItem('@isUserVerified', verificationJSON);
      _getVerification();
    } catch (e) {
      console.log('Error writing verification status', e);
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

  // User Profile Methods TODO convert _updateUserProfile and remove this function
  const updateUserProfile = (newProfile: UserProfile) => {
    _updateUserProfile(newProfile);
  };

  // TODO async storage and API call. Convert to promise
  const _updateUserProfile = async (newProfile: UserProfile) => {
    try {
      let userProfileJSON = JSON.stringify(newProfile);
      await AsyncStorage.setItem('@userProfile', userProfileJSON);
      _getUserProfile();
    } catch (e) {
      console.log('Error writing user profile', e);
    }
  };

  // TODO get user profile from API
  const _getUserProfile = async () => {
    let emptyUserProfile: UserProfile = {
      firstName: '',
      lastName: '',
      personNumber: '',
    };

    try {
      let userProfileJSON = await AsyncStorage.getItem('@userProfile');

      if (userProfileJSON) {
        setUserProfile(JSON.parse(userProfileJSON));
      } else {
        setUserProfile(emptyUserProfile);
      }
    } catch (e) {
      console.log('Error reading userProfile', e);
    }
  };

  // All Addresses Methods TODO convert _updateAddresses and remove this function
  const updateAllAddress = (newAddresses: Address[]) => {
    _updateAllAddress(newAddresses);
  };

  // TODO async storage and API call. Convert to promise
  const _updateAllAddress = async (newAddresses: Address[]) => {
    try {
      let addressesJSON = JSON.stringify(newAddresses);
      await AsyncStorage.setItem('@allAddresses', addressesJSON);
      _getAllAddress();
    } catch (e) {
      console.log('Error writing all address', e);
    }
  };

  // TODO get addresses from API
  const _getAllAddress = async () => {
    try {
      let addressesJSON = await AsyncStorage.getItem('@allAddresses');

      if (addressesJSON) {
        setAllAddress(JSON.parse(addressesJSON));
      } else {
        setAllAddress([]);
      }
    } catch (e) {
      console.log('Error reading all addresss', e);
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

  const updatePickupSlot = (newPickupSlot: TimeSlot) => {
    setPickupSlot(newPickupSlot);
  };

  const updateSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const createOrder = () => {
    let addressJSON = {
      addressLine: address.addressLine,
      city: address.city,
      postCode: address.postCode,
      floor: address.floor,
      doorNumber: address.doorNumber,
    };
    console.log(
      JSON.stringify({
        address: addressJSON,
        cart: cart.cartItems,
        momsInformation: momsInformation,
        phoneNumber: phoneNumber,
        totalCartCost: totalCartCost,
        totalCartCount: totalCartCount,
        postCode: postCode,
        pickupSlot: pickupSlot,
        userProfile: userProfile,
      })
    );
    fetchPOSTAPI(
      App_Settings.API_POST_CREATE_ORDER,
      JSON.stringify({
        address: addressJSON,
        cart: cart.cartItems,
        momsInformation: momsInformation,
        phoneNumber: phoneNumber,
        totalCartCost: totalCartCost,
        totalCartCount: totalCartCount,
        postCode: postCode,
        pickupSlot: pickupSlot,
        userProfile: userProfile,
      })
    )
      .then((response) => {
        console.log('response in app provider', response);
      })
      .catch((err) => console.log('app provider error', err));
  };

  return (
    <AppContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,

        postCode: postCode,
        _updatePostCode: _updatePostCode,

        phoneNumber: phoneNumber,
        _updatePhoneNumber: _updatePhoneNumber,

        verified: verified,
        _updateVerification: _updateVerification,

        allItems: allItems,
        _updateAllItems: _updateAllItems,

        offerItems: offerItems,
        _updateOfferItems: _updateOfferItems,

        categories: categories,
        _updateCategories: _updateCategories,

        cart: cart,
        totalCartCount: totalCartCount,
        totalCartCost: totalCartCost,
        momsInformation: momsInformation,
        selectedCategory: selectedCategory,
        updateSelectedCategory: updateSelectedCategory,
        updateCart: updateCart,
        emptyCart: emptyCart,

        userProfile: userProfile,
        updateUserProfile: updateUserProfile,

        allAddresses: allAddresses,
        updateAllAddress: updateAllAddress,

        address: address,
        updateAddress: updateAddress,

        pickupSlot: pickupSlot,
        updatePickupSlot: updatePickupSlot,

        createOrder: createOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
