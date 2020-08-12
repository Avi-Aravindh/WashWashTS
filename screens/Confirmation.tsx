import React, { useContext, useEffect, FunctionComponent } from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CustomBackButton, Stepper, Button } from '../components';
import { createStyles } from '../styles';

const styles = createStyles();
const { width, height } = Dimensions.get('window');
const Pickup = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    // <View style={[styles.pageContainer]}>
    <ImageBackground
      style={{
        width: width,
        height: height * 0.8,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      source={require('../assets/confirmationBackground.png')}
      resizeMode='cover'
    >
      <View
        style={{
          position: 'absolute',
          marginTop: height * 0.2,
          alignItems: 'center',

          width: width,
        }}
      >
        <Text style={styles.welcomeText}>Tack för din order!</Text>
      </View>
    </ImageBackground>
    // </View>
  );
};

export default Pickup;
