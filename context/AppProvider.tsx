import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

export interface category {
  id: string;
  title: string;
}

export interface offers {
  title: string;
  location: string;
  price: string;
  image: any;
  category: category;
}

const tempAppCategories: category[] = [
  { id: 'Alla', title: 'Alla' },
  { id: 'Överdel', title: 'Överdel' },
  { id: 'Underdel', title: 'Underdel' },
  { id: 'Acessoarer', title: 'Acessoarer' },
  { id: 'Högtid', title: 'Högtid' },
];

const tempOfferImages = [
  {
    title: 'Byxor',
    location: 'default',
    price: '80 :- st',
    image: require('../assets/tempOfferImages/frank-flores-394933.jpg'),
    category: tempAppCategories.find((category) => (category.id = 'Överdel')),
  },
  {
    title: 'Kulörtvätt',
    location: 'default',
    price: '60:-',
    image: require('../assets/tempOfferImages/francis-duval-37755.jpg'),
    category: tempAppCategories.find((category) => (category.id = 'Underdel')),
  },
  {
    title: 'Klänning',
    location: 'default',
    price: '250:-',
    image: require('../assets/tempOfferImages/flaunter-com-178022.jpg'),
    category: tempAppCategories.find(
      (category) => (category.id = 'Acessoarer')
    ),
  },
  {
    title: 'Kostym',
    location: 'default',
    price: '230:-',
    image: require('../assets/tempOfferImages/soroush-karimi-387509.jpg'),
    category: tempAppCategories.find((category) => (category.id = 'Högtid')),
  },
];

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [offerImages, setOfferImages] = useState<offers[]>([]);
  const [categories, setCategories] = useState<category[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setOfferImages(tempOfferImages);
      setCategories(tempAppCategories);
    }, 3000);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,
        offerImages: offerImages,
        categories: categories,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
