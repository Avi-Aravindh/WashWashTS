/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState, FunctionComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { createStyles } from '../styles';
import { Category } from '../context/AppProvider';
import AppContext from '../context/AppContext';

interface ListHeaderProps {
  categories: Category[];
  selectedCategory: Category;
  updateSelectedCategory: (category: Category) => void;
}

// const ListHeader: FunctionComponent<ListHeaderProps> = ({
//   categories,
//   selectedCategory,
//   updateSelectedCategory,
// }) => {
const ListHeader = () => {
  const styles = createStyles();
  const { categories, selectedCategory, updateSelectedCategory } = useContext(
    AppContext
  );

  return (
    <View style={{ backgroundColor: 'white', zIndex: 15000 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingLeft: 10,
          backgroundColor: '#fff',
          marginTop: 10,
          marginBottom: 10,
        }}
        horizontal={true}
        indicatorStyle={'white'}
      >
        {categories &&
          categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                updateSelectedCategory(category);
              }}
              style={{
                marginRight: 15,
                height: 30,
                justifyContent: 'center',
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
                    selectedCategory &&
                    category.categoryId === selectedCategory.categoryId
                      ? { color: 'red' }
                      : '',
                  ]}
                >
                  {category.categoryTitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default ListHeader;
