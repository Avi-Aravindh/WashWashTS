import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

export interface Category {
  categoryId: string;
  categoryTitle: string;
}

export interface Item {
  title: string;
  location: string;
  price: string;
  image: any;
  category: Category;
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
    title: 'Byxor',
    location: 'default',
    price: '80 :- st',
    image: require('../assets/tempOfferImages/frank-flores-394933.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '0'),
  },
  {
    title: 'Kulörtvätt',
    location: 'default',
    price: '60:-',
    image: require('../assets/tempOfferImages/francis-duval-37755.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '1'),
  },
  {
    title: 'Klänning',
    location: 'default',
    price: '250:-',
    image: require('../assets/tempOfferImages/flaunter-com-178022.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '2'),
  },
  {
    title: 'Kostym',
    location: 'default',
    price: '230:-',
    image: require('../assets/tempOfferImages/soroush-karimi-387509.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '3'),
  },
  {
    title: 'Byxor',
    location: 'default',
    price: '80 :- st',
    image: require('../assets/tempOfferImages/alexandra-gorn-260989.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '0'),
  },
  {
    title: 'Kulörtvätt',
    location: 'default',
    price: '60:-',
    image: require('../assets/tempOfferImages/dmitriy-ilkevich-437760.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '1'),
  },
  {
    title: 'Klänning',
    location: 'default',
    price: '250:-',
    image: require('../assets/tempOfferImages/michael-frattaroli-221247.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '2'),
  },
  {
    title: 'Kostym',
    location: 'default',
    price: '230:-',
    image: require('../assets/tempOfferImages/rui-silvestre-429616.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '3'),
  },
  {
    title: 'Klänning',
    location: 'default',
    price: '250:-',
    image: require('../assets/tempOfferImages/tim-wright-512701.jpg'),
    category: tempAppCategories.find((category) => category.categoryId == '4'),
  },
  {
    title: 'Kostym',
    location: 'default',
    price: '230:-',
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

  useEffect(() => {
    setTimeout(() => {
      setAllItems(tempOfferItems);
      setOfferItems(tempOfferItems.slice(0, 4));
      setCategories(tempAppCategories);
      setSelectedCategory(tempAppCategories[0]);
    }, 3000);
  }, []);

  const updateSelectedCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <AppContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,
        allItems: allItems,
        offerItems: offerItems,
        categories: categories,
        selectedCategory: selectedCategory,
        updateSelectedCategory: updateSelectedCategory,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
