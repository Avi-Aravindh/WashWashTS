/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, ImageBackground, FlatList } from 'react-native';

import ListHeader from './ListHeader';

export interface category {
  id: string;
  title: string;
}

interface ImageStripProps {
  title: string;
  location: string;
  price: string;
  image: any;
  category: category;
}

const ImageStrip = ({ images }: ImageStripProps[]) => {
  console.log('iamges', images);
  return (
    <View
      style={{
        borderWidth: 1,
        height: 5000,
        marginTop: 20,
        width: '98%',
        alignSelf: 'center',
      }}
    >
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ImageBackground style={{}} source={item.image}>
              <Text>{item.title}</Text>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

export default ImageStrip;
