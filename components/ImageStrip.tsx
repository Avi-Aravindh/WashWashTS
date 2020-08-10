/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, FunctionComponent } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
const { width, height } = Dimensions.get('window');

import { Category, Item } from '../context/AppProvider';

interface ImageStripProps {
  allItems: Item[];
  selectedCategory: Category;
}

const imageHeights = [200, 225, 250, 275, 300, 325, 350, 375];
const ImageStrip: FunctionComponent<ImageStripProps> = ({
  allItems,
  selectedCategory,
}) => {
  const [loading, setLoading] = useState<Item[]>([]);
  const [itemSet1, setItemSet1] = useState<Item[]>([]);
  const [itemSet2, setItemSet2] = useState<Item[]>([]);

  useEffect(() => {
    console.log('category changed', selectedCategory);
    handleCategoryChange();
  }, [selectedCategory]);

  const handleCategoryChange = () => {
    setItemSet1([]);
    setItemSet2([]);

    let filteredItems = allItems;

    if (selectedCategory && selectedCategory.categoryId !== '0') {
      filteredItems = allItems.filter(
        (item) =>
          item.category &&
          selectedCategory &&
          item.category.categoryId === selectedCategory.categoryId
      );
    }

    filteredItems.map((image: Item, index: number) => {
      if (index % 2 === 0) {
        setItemSet1((prev: Item[]) => [...prev, image]);
      } else {
        setItemSet2((prev: Item[]) => [...prev, image]);
      }
    });
  };

  return (
    <View
      style={{
        width: width,
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingTop: height * 0.01,
        flexDirection: 'row',
        flex: 0,
      }}
    >
      <View
        style={{
          width: (width - width * 0.1) / 2,
          marginRight: width * 0.01,
          flexDirection: 'column',
        }}
      >
        {itemSet1.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={{
              height:
                imageHeights[Math.floor(Math.random() * imageHeights.length)],
              marginTop: height * 0.01,
            }}
          >
            <ImageBackground
              source={image.image}
              onLoad={() => <ActivityIndicator />}
              style={{
                width: (width - width * 0.12) / 2,
                flex: 1,
              }}
              resizeMode='cover'
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          width: (width - width * 0.1) / 2,
          marginRight: width * 0.01,
          flexDirection: 'column',
        }}
      >
        {itemSet2.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={{
              height:
                imageHeights[Math.floor(Math.random() * imageHeights.length)],
              marginTop: height * 0.01,
            }}
          >
            <ImageBackground
              source={image.image}
              style={{
                width: (width - width * 0.12) / 2,
                flex: 1,
              }}
              resizeMode='cover'
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ImageStrip;
