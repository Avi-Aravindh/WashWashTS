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
  const [filteredItems, setFilteredItems] = useState<Item[]>(allItems);
  const [RC, setRC] = useState(0);

  let CI = 0;
  let showTemplateOne = true;

  const navigation = useNavigation();

  useEffect(() => {
    handleCategoryChange();
  }, [selectedCategory, allItems]);

  const handleCategoryChange = () => {
    let tempFilteredItems = allItems;

    if (selectedCategory && selectedCategory.categoryId !== '0') {
      tempFilteredItems = allItems.filter(
        (item) =>
          item.Category &&
          selectedCategory &&
          item.Category === selectedCategory.categoryId
      );
    }
    setFilteredItems(tempFilteredItems);
  };

  const renderImage = (image: Item) => {
    return (
      <TouchableOpacity
        key={image.Id}
        activeOpacity={0.8}
        style={{
          height: '100%',
        }}
        onPress={() => navigation.navigate('itemDetails', { item: image })}
      >
        <ImageBackground
          key={image.Id}
          source={{ uri: image.itemImage ? image.itemImage : null }}
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
              <Text style={styles.dealHeaderText}>{image.Price}:-</Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderTemplate1 = (images: Item[]) => {
    return (
      <View
        style={{
          width: width,
          flexDirection: 'row',
          flex: 0,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: width * 0.44,
            marginRight: width * 0.01,
          }}
        >
          <View
            style={{
              height: height * 0.2,
              marginBottom: height * 0.01,
            }}
          >
            {images[0] && renderImage(images[0])}
          </View>
          <View
            style={{
              height: height * 0.2,
              marginBottom: height * 0.01,
            }}
          >
            {images[1] && renderImage(images[1])}
          </View>
        </View>
        <View
          style={{
            width: width * 0.44,
            marginLeft: width * 0.01,
          }}
        >
          <View
            style={{
              height: height * 0.41,
              marginBottom: height * 0.01,
            }}
          >
            {images[2] && renderImage(images[2])}
          </View>
        </View>
      </View>
    );
  };

  const renderTemplate2 = (images: Item[]) => {
    return (
      <View
        style={{
          width: width,
          flexDirection: 'row',
          flex: 0,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: width * 0.44,
            marginRight: width * 0.01,
          }}
        >
          <View
            style={{
              height: height * 0.41,
              marginBottom: height * 0.01,
            }}
          >
            {images[0] && renderImage(images[0])}
          </View>
        </View>
        <View
          style={{
            width: width * 0.44,
            marginLeft: width * 0.01,
          }}
        >
          <View
            style={{
              height: height * 0.2,
              marginBottom: height * 0.01,
            }}
          >
            {images[1] && renderImage(images[1])}
          </View>
          <View
            style={{
              height: height * 0.2,
              marginBottom: height * 0.01,
            }}
          >
            {images[2] && renderImage(images[2])}
          </View>
        </View>
      </View>
    );
  };

  const buildView = () => {
    let stripView = [];
    while (CI < filteredItems.length) {
      stripView.push(
        showTemplateOne
          ? renderTemplate1(filteredItems.slice(CI, CI + 3))
          : renderTemplate2(filteredItems.slice(CI, CI + 3))
      );
      CI += 3;
      showTemplateOne = !showTemplateOne;
    }
    return stripView;
  };

  return <View>{buildView()}</View>;
};

export default ImageStrip;
