import React, { useContext, useEffect, FunctionComponent } from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CustomBackButton, Stepper, Button } from '../components';
import { createStyles } from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppContext from '../context/AppContext';

const styles = createStyles();
const { width, height } = Dimensions.get('window');
const Pickup = () => {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        style={{
          width: width,
          height: height * 0.7,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        source={require('../../assets/confirmationBackground.png')}
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
        <View
          style={{
            position: 'absolute',
            marginTop: height * 0.4,
            alignItems: 'center',

            width: width,
          }}
        >
          <Text style={styles.confirmationText}>Beräknad leverans</Text>
          <Text style={styles.confirmationText}>
            {appContext.pickupSlot.date} - {appContext.pickupSlot.timeSlot}
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          position: 'absolute',
          marginTop: height * 0.7,
          paddingLeft: width * 0.05,
          paddingRight: width * 0.05,
          width,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button
          text='Shoppa mer'
          type='secondary'
          onPress={() => navigation.navigate('home')}
        />
        <Button
          text='Följ din leverans'
          type='primary'
          onPress={() => navigation.navigate('home')}
        />
      </View>
    </View>
  );
};

export default Pickup;
