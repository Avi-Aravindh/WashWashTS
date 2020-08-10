import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createStyles } from '../styles';
import { colors } from '../styles/BaseStyles';

const DrawerHeader = ({ navigation }) => {
  const styles = createStyles();

  return (
    <View>
      <View
        style={[
          styles.fullWidthContainer,
          styles.actionContainer,
          {
            justifyContent: 'space-between',
            marginTop: hp('7%'),
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../assets/Menu.png')}
            style={{ marginLeft: wp('5%'), height: 35 }}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/splash.png')}
          style={{ height: 50, width: 50 }}
          resizeMode='contain'
        />
        <TouchableOpacity onPress={() => navigation.navigate('cart')}>
          <Image
            source={require('../assets/checkout.png')}
            style={{ marginRight: wp('5%'), height: 35 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerHeader;
