import React, { useContext, useState } from 'react';
import { View, Text, Image, Alert, Dimensions, Button } from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

import { createStyles } from '../styles';
// import { Button } from '../components';

import { colors } from '../styles/BaseStyles';
import AppContext from '../context/AppContext';
import HeaderCart from './HeaderCart';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

const DrawerHeader = ({ navigation }) => {
  const styles = createStyles();
  const appContext = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
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

      <Modal
        isVisible={showModal}
        backdropOpacity={0.7}
        useNativeDriver={true}
        style={{ alignSelf: 'center' }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            height: height * 0.4,
            width: width * 0.8,
          }}
        >
          <View
            style={{
              height: height * 0.3,
              width: width * 0.6,
            }}
          >
            <Text>Hej!</Text>
            <Text style={{ marginTop: height * 0.03 }}>
              För att kunna avgöra om vi hjälpa dig behöver vi veta var i
              Sverige du bor.
            </Text>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  // opacity: postCode.length > 0 ? 1 : 0,
                }}
              >
                Postnummer
              </Text>
              <TextInput
                // ref={postCodeRef}
                keyboardType={'numeric'}
                // onSubmitEditing={() => floorRef.current.focus()}
                // value={postCode}
                // onChangeText={(value) => setPostCode(value)}
                placeholder='Postnummer'
                style={[
                  styles.inputText,
                  {
                    width: width * 0.35,
                    marginTop: 10,
                    textAlign: 'left',
                  },
                ]}
              />
            </View>
            <View
              style={{
                marginTop: height * 0.05,
                marginLeft: width * 0.3,
              }}
            >
              <TouchableOpacity
                style={{
                  width: width * 0.3,
                  height: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.PRIMARY,
                  borderRadius: 20,
                  color: 'white',
                  borderColor: '#707070',
                }}
                type='primary'
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: 'white' }}>Fortsatt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DrawerHeader;
