/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  Value,
  event,
  cond,
  eq,
  add,
  diffClamp,
  set,
  debug,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

import { Header, HomeCarousel, ListHeader, ImageStrip } from '../components';

import AppContext from '../context/AppContext';
import { createStyles } from '../styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const styles = createStyles();

  // Animation Values and functions
  let opacity = new Value(1);
  let translationX = useRef(new Value(0)).current;

  let translationY = useRef(new Value(0)).current;
  let offsetX = new Value(0);
  let offsetY = useRef(new Value(0)).current;
  let state = useRef(new Value(0)).current;

  const gestureEvent = event([
    {
      nativeEvent: {
        state,
        translationX,
        translationY,
      },
    },
  ]);

  let transY = diffClamp(
    cond(
      eq(state, State.ACTIVE),
      add(offsetY, translationY),
      set(offsetY, add(offsetY, translationY))
    ),
    -hp('45%'),
    0
  );

  opacity = interpolate(transY, {
    inputRange: [-hp('30%'), 0],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={styles.pageContainer}>
      <View style={{ zIndex: 10000 }}>
        <Header navigation={navigation} />
      </View>

      <PanGestureHandler
        onHandlerStateChange={gestureEvent}
        onGestureEvent={gestureEvent}
      >
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            {
              marginTop: appContext.offerImages.length > 0 ? 0 : hp('15%'),
              borderWidth: 1,
            },
            {
              transform: [{ translateY: transY }],
            },
          ]}
        >
          <Animated.View pointerEvents='auto' style={[{ opacity }]}>
            <HomeCarousel data={appContext.offerImages} />
          </Animated.View>

          <View>
            <ListHeader categories={appContext.categories} />
            <ImageStrip images={appContext.offerImages} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Home;
