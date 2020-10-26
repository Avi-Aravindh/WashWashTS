import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Fragment,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import { App_Settings } from '../constants';
import { fetchAPI } from '../utilities/APIHelpers';
import AppContext from '../context/AppContext';
import {
  CustomBackButton,
  Stepper,
  ItemCounter,
  Button,
  OTPInput,
} from '../components';
import { useNavigation } from '@react-navigation/native';

import { createStyles } from '../styles';

import { colors, fontSizes } from '../styles/BaseStyles';
const { width, height } = Dimensions.get('window');
const styles = createStyles();

const AddressModal = (props) => {
  const appContext = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <Modal
      isVisible={props.isVisible}
      animationType='fade'
      backdropOpacity={0.7}
      useNativeDriver={true}
      style={{ alignSelf: 'center' }}
    >
      <View
        style={{
          justifyContent: 'center',
          //   alignItems: 'center',
          backgroundColor: 'white',
          height: height * 0.5,
          width: width * 0.8,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {displayInstructionsText()}

          <View style={[styles.separator, { width: width * 0.5 }]} />

          <View style={{ marginTop: 30 }}>{displayContent()}</View>
        </View>

        {!otp && !verified && (
          <View
            style={{
              marginTop: 60,
              marginRight: 20,
              marginLeft: width * 0.2,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {sending && <Text>Sending</Text>}
            {!otp && (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => {
                  props.hideModal(true);
                  if (!appContext.verified) {
                    navigation.navigate('home');
                  }
                }}
              >
                <Text>Back</Text>
              </TouchableOpacity>
            )}

            <Button
              text={!sending ? 'Skicka' : 'Sändning'}
              type='primary'
              disabled={
                phoneNumber.length !== 7 || areaCode.length !== 3 || sending
              }
              onPress={() => {
                sendOTP();
              }}
            />
          </View>
        )}

        {displayButton()}
      </View>
    </Modal>
  );
};

export default AddressModal;
