/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  Value,
  event,
  set,
  multiply,
  debug,
  cond,
  eq,
  neq,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { diffClamp, interpolateColor } from 'react-native-redash';

import { withDecay } from '../WithDecay';

import { Header, HomeCarousel, ListHeader, ImageStrip } from '../components';

import withAppContext from '../context/withAppContext';
import { createStyles } from '../styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

interface HomeState {
  loading: boolean;
}

interface HomeProps {}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  styles = createStyles();

  opacity = new Value(1);
  opacity1 = new Value(0);
  backgroundColor = new Value(0);
  transY = new Value(0);
  dragX = new Value(0);
  dragY = new Value(0);
  velocityY = new Value(0);
  gestureState = new Value(-1);
  contentHeight = new Value(0);

  onGestureEvent = event([
    {
      nativeEvent: {
        translationY: this.dragY,
        velocityY: this.velocityY,
        state: this.gestureState,
      },
    },
  ]);

  translateY = withDecay({
    value: this.dragY,
    velocity: this.velocityY,
    state: this.gestureState,
  });

  transY = diffClamp(this.translateY, multiply(this.contentHeight, -1), 0);

  opacity = interpolate(this.transY, {
    inputRange: [-height * 0.45, 0],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  opacity1 = interpolate(this.transY, {
    inputRange: [-height * 0.45, -height * 0.42],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  backgroundColor = interpolateColor(this.transY, {
    inputRange: [-height * 0.45, -height * 0.42],
    outputRange: ['rgba(255,255,255,1)', 'rgba(255,255,255,0)'],
  });

  render() {
    return (
      <Fragment>
        {this.state.loading && (
          <View
            style={{
              justifyContent: 'center',

              alignItems: 'center',
              flex: 1,
            }}
          >
            <ActivityIndicator />
          </View>
        )}
        {!this.state.loading && (
          <View style={[this.styles.pageContainer]}>
            {/* Page Header Area */}
            <Animated.View
              style={[
                { zIndex: 10000 },
                { backgroundColor: this.backgroundColor },
              ]}
            >
              <Header navigation={this.props.navigation} />
            </Animated.View>
            <Animated.View style={[{ opacity: this.opacity1, zIndex: 10000 }]}>
              <ListHeader />
            </Animated.View>

            {/* Content Area */}
            <PanGestureHandler
              onGestureEvent={this.onGestureEvent}
              onHandlerStateChange={this.onGestureEvent}
              minDist={20}
            >
              <Animated.View
                style={[
                  {
                    ...StyleSheet.absoluteFillObject,
                    flex: 0,
                  },
                  {
                    marginTop:
                      this.props.context &&
                      this.props.context.offerItems.length > 0
                        ? 0
                        : hp('15%'),
                  },
                  {
                    transform: [{ translateY: this.transY }],
                  },
                ]}
              >
                {/* Carousel Area */}

                <Animated.View
                  pointerEvents='auto'
                  style={[{ opacity: this.opacity }]}
                >
                  {this.props.context &&
                    this.props.context.offerItems.length > 0 && (
                      <HomeCarousel data={this.props.context.offerItems} />
                    )}
                </Animated.View>

                {/* ImageStrip Area */}

                <View style={[{}]}>
                  <ListHeader />
                </View>
                <View
                  style={{ flex: 0 }}
                  onLayout={(e) =>
                    this.contentHeight.setValue(e.nativeEvent.layout.height)
                  }
                >
                  <ImageStrip
                    selectedCategory={this.props.context.selectedCategory}
                    allItems={this.props.context.allItems}
                  />
                </View>
              </Animated.View>
            </PanGestureHandler>
          </View>
        )}
      </Fragment>
    );
  }
}

export default withAppContext(Home);
