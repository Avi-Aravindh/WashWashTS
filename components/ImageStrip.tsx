/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { width, height } = Dimensions.get('window');

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
        width: width,
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingTop: height * 0.01,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexBasis: 1,
      }}
    >
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[2].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[0].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[1].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              // marginTop: height * 0.01,
              marginTop: -195,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[3].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[2].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[0].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[1].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              // marginTop: height * 0.01,
              marginTop: -195,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[3].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[2].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[0].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[1].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              // marginTop: height * 0.01,
              marginTop: -195,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[3].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[2].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[0].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[1].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              // marginTop: height * 0.01,
              marginTop: -195,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[3].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[2].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[0].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[1].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 200,
              marginRight: width * 0.01,
              // marginTop: height * 0.01,
              marginTop: -195,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}

      {images.length > 0 && (
        <TouchableOpacity
          onPress={() => Alert.alert('shared content animation to next page')}
        >
          <ImageBackground
            source={images[3].image}
            style={{
              width: (width - width * 0.1) / 2,
              height: 400,
              marginLeft: width * 0.01,
              marginTop: height * 0.01,
            }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )}
    </View>

    // <FlatList
    //   data={images}
    //   numColumns={2}
    //   keyExtractor={(item, index) => index.toString()}
    //   //   ListHeaderComponent={ListHeader}
    //   stickyHeaderIndices={[0]}
    //   renderItem={({ item }) => (
    //     <ImageBackground
    //       style={{ height: 400, width: width / 2 }}
    //       source={item.image}
    //     >
    //       <Text>{item.title}</Text>
    //     </ImageBackground>
    //   )}
    // />
  );
};

export default ImageStrip;
