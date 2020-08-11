import React, { FunctionComponent } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { createStyles } from '../styles';
import { colors } from '../styles/BaseStyles';
import { HeaderCart } from '../components';

interface DrawerHeaderProps {
  title: String;
}

const DrawerHeader: FunctionComponent<DrawerHeaderProps> = ({ title }) => {
  const styles = createStyles();
  const navigation = useNavigation();

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/arrowLeft.png')}
            style={{ marginLeft: wp('5%'), height: 35 }}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: colors.PRIMARY }]}>
          {title}
        </Text>
        <HeaderCart />
      </View>
    </View>
  );
};

export default DrawerHeader;
