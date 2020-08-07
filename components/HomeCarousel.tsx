/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { createStyles } from '../styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button from './Button';

interface offers {
  title: string;
  location: string;
  price: string;
  image: any;
}

interface HomeCarouselProps {
  data: offers[];
}

const HomeCarousel = ({ data }: HomeCarouselProps) => {
  const styles = createStyles();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
  const ITEM_HEIGHT = hp('60%');

  const _renderImage = ({ item, index }) => {
    return (
      <View
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageBackground
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
          }}
          source={item.image}
          resizeMode='cover'
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        >
          {loading && <ActivityIndicator />}
          {!loading && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginLeft: wp('5%'),
                marginRight: wp('5%'),
                marginBottom: hp('2%'),
              }}
            >
              <View>
                <Text style={styles.dealHeaderText}>Veckans deal!</Text>
                <Text style={styles.welcomeText}>{item.title}</Text>
                <Text style={styles.dealHeaderText}>{item.price}</Text>
              </View>
              <View>
                <Button
                  type='overlay'
                  text='Lägg till'
                  onPress={() => alert('shared content animation')}
                />
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  };

  //   const getPagination = () => {
  //     return (
  //       <Pagination
  //         dotsLength={offerImages.length}
  //         activeDotIndex={activeImageIndex}
  //         containerStyle={{
  //           backgroundColor: "#fff",
  //         }}
  //         dotStyle={{
  //           width: 8,
  //           height: 8,
  //           borderRadius: 5,
  //           marginHorizontal: 3,
  //           backgroundColor: "#45DDE6",
  //         }}
  //         inactiveDotStyle={
  //           {
  //             // Define styles for inactive dots here
  //           }
  //         }
  //         inactiveDotOpacity={0.4}
  //         inactiveDotScale={0.6}
  //       ></Pagination>
  //     );
  //   };

  return (
    <Carousel
      layout={'default'}
      useScrollView={false}
      data={data}
      renderItem={_renderImage}
      itemWidth={ITEM_WIDTH}
      sliderWidth={SLIDER_WIDTH}
      autoplay={true}
      autoplayInterval={5000}
      onSnapToItem={(index) => setActiveImageIndex(index)}
    />
  );
};

export default HomeCarousel;
