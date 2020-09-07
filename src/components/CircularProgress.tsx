import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash';
import Svg, { Circle, Text as SVGText } from 'react-native-svg';
import { createStyles } from '../styles';
import { colors } from '../styles/BaseStyles';

const { width, height } = Dimensions.get('window');

const styles = createStyles();

const CircularProgress = ({ progress, dayCount }) => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const animatedPercentage = useTimingTransition(progress, { duration: 1000 });

  const offSet = interpolate(animatedPercentage, {
    inputRange: [0, 100],
    outputRange: [470, 0],
  });

  return (
    <Animated.View
      style={{
        height: height * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg>
        <AnimatedCircle
          cx={width * 0.5}
          cy={height * 0.1}
          r='75'
          fill='none'
          strokeWidth={10}
          stroke='#F5F5F5'
        ></AnimatedCircle>
        <AnimatedCircle
          cx={width * 0.5}
          cy={height * 0.1}
          r='75'
          fill='none'
          strokeWidth={10}
          stroke={colors.PRIMARY}
          strokeDasharray='471, 471'
          strokeDashoffset={offSet}
        ></AnimatedCircle>

        <SVGText
          fontSize='25'
          stroke='#4A4A4A'
          fill='#4A4A4A'
          x={width * 0.5}
          y={height * 0.1}
          textAnchor='middle'
        >
          {dayCount}
        </SVGText>
        <SVGText
          fontSize='15'
          fontWeight='2'
          stroke='#4A4A4A'
          fill='#4A4A4A'
          x={width * 0.5}
          y={height * 0.13}
          textAnchor='middle'
        >
          Dag kvar
        </SVGText>
      </Svg>
    </Animated.View>
  );
};

export default CircularProgress;
