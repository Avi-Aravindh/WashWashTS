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
import { createStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';

import { Category, Item } from '../context/AppProvider';

interface ImageStripProps {
  allItems: Item[];
  selectedCategory: Category;
}

const { width, height } = Dimensions.get('window');
const styles = createStyles();

const imageHeights = [200, 225, 250, 275, 300, 325, 350, 375];

const ImageStrip: FunctionComponent<ImageStripProps> = ({
  allItems,
  selectedCategory,
}) => {
  const [loading, setLoading] = useState(true);
  const [itemSet1, setItemSet1] = useState<Item[]>([]);
  const [itemSet2, setItemSet2] = useState<Item[]>([]);

  console.log('allitems', allItems);

  const navigation = useNavigation();

  useEffect(() => {
    handleCategoryChange();
  }, [selectedCategory]);

  const handleCategoryChange = () => {
    setItemSet1([]);
    setItemSet2([]);

    let filteredItems = allItems;

    if (selectedCategory && selectedCategory.categoryId !== '0') {
      filteredItems = allItems.filter(
        (item) =>
          item.Category &&
          selectedCategory &&
          item.Category === selectedCategory.categoryId
      );
    }

    console.log('filtered items', filteredItems);

    filteredItems.map((image: Item, index: number) => {
      if (index % 2 === 0) {
        setItemSet1((prev: Item[]) => [...prev, image]);
      } else {
        setItemSet2((prev: Item[]) => [...prev, image]);
      }
    });
  };

  const renderImage = (image: Item, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        style={{
          height: imageHeights[Math.floor(Math.random() * imageHeights.length)],
          marginTop: height * 0.01,
        }}
        onPress={() => navigation.navigate('itemDetails', { item: image })}
      >
        <ImageBackground
          source={{ uri: image.itemImage }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => {
            setLoading(false);
          }}
          style={{
            width: (width - width * 0.12) / 2,
            flex: 1,
            paddingBottom: 10,
            paddingLeft: 10,
            justifyContent: 'flex-end',
          }}
          resizeMode='cover'
        >
          {loading && <ActivityIndicator />}
          {!loading && (
            <View>
              <Text style={styles.welcomeText}>{image.Name}</Text>
              <Text style={styles.dealHeaderText}>{image.Price}</Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
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
        {itemSet1.map((image, index) => renderImage(image, index))}
      </View>

      <View
        style={{
          width: (width - width * 0.1) / 2,
          marginRight: width * 0.01,
          flexDirection: 'column',
        }}
      >
        {itemSet2.map((image, index) => renderImage(image, index))}
      </View>
    </View>
  );
};

export default ImageStrip;
