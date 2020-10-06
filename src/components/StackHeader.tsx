import React, { FunctionComponent } from 'react';
import { View, Text, Image, Alert, Dimensions } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { createStyles } from '../styles';
import { colors } from '../styles/BaseStyles';
import HeaderCart from './HeaderCart';

interface DrawerHeaderProps {
  title: String;
}

const { width, height } = Dimensions.get('window');

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
            marginTop: height * 0.07,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrowLeft.png')}
            style={{ marginLeft: width * 0.05, height: 35 }}
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
