import React, { useContext, useState } from 'react';
import { View, Image, Alert, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createStyles } from '../styles';
// import { Button } from '../components';

import HeaderCart from './HeaderCart';
import PostCode from '../screens/PostCode';

const { width, height } = Dimensions.get('window');

const DrawerHeader = ({ navigation }) => {
  const styles = createStyles();
  const [showModal, setShowModal] = useState(false);

  const handlePostCodeChange = () => {
    setShowModal(false);
  };

  return (
    <View>
      <View>
        <View
          style={[
            styles.fullWidthContainer,
            styles.actionContainer,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: hp('5%'),
            },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/Menu.png')}
                style={{ marginLeft: wp('5%'), height: 35 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigation.navigate('postCodeModal')}
              onPress={() => setShowModal((prev) => !prev)}
            >
              <Image
                source={require('../../assets/location.png')}
                style={{ marginLeft: 10, height: 25, width: 25 }}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/splash.png')}
            style={{ height: 50, width: 50 }}
            resizeMode='contain'
          />

          <HeaderCart />
        </View>
      </View>

      <PostCode isVisible={showModal} handleClose={handlePostCodeChange} />
    </View>
  );
};

export default DrawerHeader;
