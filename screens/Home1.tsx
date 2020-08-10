import React, {
  Fragment,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import {
  State,
  PanGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import {
  usePanGestureHandler,
  withOffset,
  diffClamp,
  translate,
  useValue,
  interpolateColor,
} from 'react-native-redash';

import { withDecay } from '../WithDecay';

import { Header, HomeCarousel, ListHeader, ImageStrip } from '../components';

import AppContext from '../context/AppContext';
import { createStyles } from '../styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const Home1 = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(0);
  const styles = createStyles();

  useEffect(() => {
    if (appContext) {
      setLoading(false);
    }
  }, [appContext]);

  // Animation Declarations and functions
  let opacity = useValue(1);
  let opacity1 = useValue(0);
  let bg = useValue(0);

  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();

  const translateY = withDecay({
    value: translation.y,
    velocity: velocity.y,
    state,
  });

  // let transY = diffClamp(translateY, -hp('45%'), 0);
  let transY = diffClamp(translateY, -15000, 0);

  opacity = interpolate(transY, {
    inputRange: [-height * 0.45, 0],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  opacity1 = interpolate(transY, {
    inputRange: [-height * 0.45, -height * 0.42],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  bg = interpolateColor(transY, {
    inputRange: [-height * 0.45, -height * 0.42],
    outputRange: ['rgba(255,255,255,1)', 'rgba(255,255,255,0)'],
    extrapolate: Extrapolate.CLAMP,
  });

  // END - Animation Declarations and functions

  return (
    <Fragment>
      {loading && (
        <View
          style={{
            justifyContent: 'center',
            // backgroundColor: 'blue',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <ActivityIndicator />
        </View>
      )}
      {!loading && (
        <View
          style={styles.pageContainer}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
        >
          {/* Page Header Area */}
          <Animated.View style={[{ zIndex: 10000 }, { backgroundColor: bg }]}>
            <Header navigation={navigation} />
          </Animated.View>
          <Animated.View style={[{ opacity: opacity1, zIndex: 10000 }]}>
            <ListHeader
              categories={appContext.categories}
              images={appContext.offerItems}
            />
          </Animated.View>

          {/* Content Area */}
          <PanGestureHandler {...gestureHandler} minDist={20}>
            <Animated.View
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                },
                {
                  marginTop: appContext.offerItems.length ? 0 : hp('15%'),
                },
                {
                  transform: [{ translateY: transY }],
                },
              ]}
            >
              {/* Carousel Area */}

              <Animated.View pointerEvents='auto' style={[{ opacity }]}>
                {appContext.offerItems > 0 && (
                  <HomeCarousel data={appContext.offerItems} />
                )}
              </Animated.View>

              {/* ImageStrip Area */}

              <Animated.View style={[{ opacity }]}>
                <ListHeader
                  categories={appContext.categories}
                  images={appContext.offerItems}
                />
              </Animated.View>
              <View>
                <ImageStrip allItems={appContext.offerItems} />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      )}
    </Fragment>
  );
};

export default Home1;
