/* eslint-disable react-native/no-inline-styles */
import React, { Fragment, ContextType } from 'react';
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
import {
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { diffClamp, interpolateColor } from 'react-native-redash';

import { withDecay } from '../../WithDecay';

import {
  DrawerHeader,
  HomeCarousel,
  ListHeader,
  ImageStrip,
} from '../components';

import withAppContext from '../context/withAppContext';
import { createStyles } from '../styles';

const { width, height } = Dimensions.get('window');

class Home extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      context: props.context,
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

  transY = diffClamp(this.translateY, multiply(this.contentHeight, -0.85), 0);

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

  componentDidMount() {
    if (!this.props.context.postCode) {
      // this.props.navigation.navigate('postCodeModal');
    }
  }

  componentDidUpdate() {
    // this.props.navigation.navigate('cart');
  }

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
                // { backgroundColor: this.backgroundColor },
                { backgroundColor: 'white' },
              ]}
            >
              <DrawerHeader navigation={this.props.navigation} />
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
                        : height * 0.15,
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
                    this.contentHeight.setValue(
                      Math.max(e.nativeEvent.layout.height, height * 0.5)
                    )
                  }
                >
                  <ImageStrip
                    selectedCategory={this.props.context.selectedCategory}
                    allItems={this.props.context.allItems}
                  />
                </View>
              </Animated.View>
            </PanGestureHandler>
            <TouchableOpacity onPress={() => this.props.context.emptyCart()}>
              <Text>Delte</Text>
            </TouchableOpacity>
          </View>
        )}
      </Fragment>
    );
  }
}

export default withAppContext(Home);
