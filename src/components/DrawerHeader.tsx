import React, { useContext } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createStyles } from '../styles';
import { colors } from '../styles/BaseStyles';
import AppContext from '../context/AppContext';
import HeaderCart from './HeaderCart';

const DrawerHeader = ({ navigation }) => {
  const styles = createStyles();
  const appContext = useContext(AppContext);
  return (
    <View>
      <View
        style={[
          styles.fullWidthContainer,
          styles.actionContainer,
          {
            justifyContent: 'space-between',
            marginTop: hp('5%'),
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/Menu.png')}
            style={{ marginLeft: wp('5%'), height: 35 }}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/splash.png')}
          style={{ height: 50, width: 50 }}
          resizeMode='contain'
        />
        <HeaderCart />
      </View>
    </View>
  );
};

export default DrawerHeader;
