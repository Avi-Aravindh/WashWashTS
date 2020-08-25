/* eslint-disable react-native/no-inline-styles */
import React, { useState, FunctionComponent } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { createStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Item } from '../context/AppProvider';

import Button from './Button';

interface HomeCarouselProps {
  data: Item[];
}

const HomeCarousel: FunctionComponent<HomeCarouselProps> = ({ data }) => {
  const styles = createStyles();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const SLIDER_WIDTH = Dimensions.get('window').width * 0.98;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
  const ITEM_HEIGHT = hp('40%');

  const _renderImage = ({ item, index }) => {
    return (
      <View
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '1%',
        }}
      >
        <ImageBackground
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '25%',
            justifyContent: 'flex-end',
          }}
          source={{ uri: item.itemImage }}
          resizeMode='cover'
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => {
            setLoading(false);
          }}
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
                <Text style={styles.welcomeText}>{item.Name}</Text>
                <Text style={styles.dealHeaderText}>{item.Price}</Text>
              </View>
              <View>
                <Button
                  type='overlay'
                  text='Lägg till'
                  onPress={() =>
                    navigation.navigate('itemDetails', { item: item })
                  }
                />
              </View>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  };

  return (
    <Carousel
      layout={'default'}
      useScrollView={true}
      data={data}
      renderItem={_renderImage}
      itemWidth={ITEM_WIDTH}
      sliderWidth={SLIDER_WIDTH}
      autoplay={false}
      autoplayInterval={5000}
      onSnapToItem={(index) => setActiveImageIndex(index)}
    />
  );
};

export default HomeCarousel;
