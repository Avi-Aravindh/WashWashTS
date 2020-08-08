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
  Alert,
} from 'react-native';
import { createStyles } from '../styles';

interface category {
  id: string;
  title: string;
}

interface image {
  title: string;
  location: string;
  price: string;
  image: any;
  category: category;
}

interface ListHeaderProps {
  categories: category[];
  images: image[];
}

const { width, height } = Dimensions.get('window');
const ListHeader = ({ categories, images }: ListHeaderProps) => {
  //   const appContext = useContext(AppContext);
  const styles = createStyles();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  return (
    <View style={{ backgroundColor: 'white', zIndex: 15000 }}>
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
                    index == currentCategoryIndex ? { color: 'red' } : '',
                  ]}
                >
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* <View
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
      </View> */}
    </View>
  );
};

export default ListHeader;
