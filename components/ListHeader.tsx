/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { createStyles } from '../styles';
import { categories } from '../context/AppProvider';

interface ListHeaderProps {
  categories: categories[];
}

import AppContext from '../context/AppContext';

const ListHeader = ({ categories }: ListHeaderProps) => {
  //   const appContext = useContext(AppContext);
  const styles = createStyles();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: '#fff',
        marginTop: 20,
      }}
      horizontal={true}
      indicatorStyle={'white'}
    >
      {categories &&
        categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCurrentCategoryIndex(index);
            }}
            style={{
              marginRight: 15,
            }}
          >
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 50,
              }}
            >
              <Text
                style={[
                  styles.overlayButtonText,
                  index == currentCategoryIndex ? { color: 'red' } : '',
                ]}
              >
                {category.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default ListHeader;
