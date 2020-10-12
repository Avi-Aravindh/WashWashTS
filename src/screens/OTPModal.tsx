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

const OTPModal = (props) => {
  const appContext = useContext(AppContext);
  const navigation = useNavigation();

  const [verified, setVerified] = useState(false);
  const [countryCode, setCountryCodeCode] = useState('+46');
  const [areaCode, setAreaCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');

  const [sending, setSending] = useState<boolean>(false);
  const [otp, setOtp] = useState('');

  const phoneNumberRef = useRef(null);
  const areaCodeRef = useRef(null);

  useEffect(() => {
    resetStatus();
  }, [props.isVisible]);

  const resetStatus = () => {
    setVerified(false);
    setOtp('');
  };

  const sendOTP = () => {
    appContext._updateVerification(false);

    setSending(true);
    setOtp('123456');
    setTimeout(() => {
      setSending(false);
    }, 2000);
  };

  const updateVerification = (status) => {
    setFullPhoneNumber(countryCode + areaCode + phoneNumber);
    appContext._updatePhoneNumber(countryCode + areaCode + phoneNumber);
    setVerified(status);
  };

  const hideModal = (status) => {
    appContext._updateVerification(status);
    props.hideModal();
  };

  const displayInstructionsText = () => {
    if (!otp) {
      return (
        <Fragment>
          <Text
            style={[
              styles.instructionText,
              {
                width: width * 0.8,
                textAlign: 'center',
                fontSize: fontSizes.lg,
              },
            ]}
          >
            För att kunna skapa din konto så
          </Text>
          <Text
            style={[
              styles.instructionText,
              {
                width: width * 0.8,
                marginTop: 3,
                textAlign: 'center',
                fontSize: fontSizes.lg,
              },
            ]}
          >
            behöver vi skicka en
          </Text>
          <Text
            style={[
              styles.instructionText,
              {
                width: width * 0.8,
                marginTop: 3,
                textAlign: 'center',
                fontSize: fontSizes.lg,
              },
            ]}
          >
            verifieringskod till din telefon
          </Text>
        </Fragment>
      );
    }

    if (otp && !verified) {
      return (
        <Fragment>
          <Text
            style={[
              styles.instructionText,
              { width: width * 0.8, textAlign: 'center' },
            ]}
          >
            Ange verifieringskoden du
          </Text>
          <Text
            style={[
              styles.instructionText,
              {
                width: width * 0.8,
                marginTop: 3,
                textAlign: 'center',
              },
            ]}
          >
            precis tagit emot
          </Text>
        </Fragment>
      );
    }

    if (otp && verified) {
      return (
        <Fragment>
          <Text
            style={[
              styles.instructionText,
              { width: width * 0.8, textAlign: 'center' },
            ]}
          >
            Goda nyheter! Telefonnummer verifierat
          </Text>
        </Fragment>
      );
    }
  };

  const displayContent = () => {
    if (!otp && !verified) {
      return (
        <View
          style={{
            width,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TextInput
            placeholder='Telefonnumer'
            editable={false}
            value={countryCode}
            style={[
              styles.inputText,
              {
                fontSize: fontSizes.lg,
                width: width * 0.1,
                marginTop: 10,
                marginRight: 10,
                textAlign: 'left',
                opacity: 0.5,
              },
            ]}
          />

          <TextInput
            ref={areaCodeRef}
            keyboardType='numeric'
            placeholder='Area'
            autoFocus
            value={areaCode}
            maxLength={3}
            onChangeText={(value) => {
              setAreaCode(value);
              if (value.length === 3) {
                phoneNumberRef.current.focus();
              }
            }}
            style={[
              styles.inputText,
              {
                fontSize: fontSizes.lg,
                width: width * 0.15,
                marginTop: 10,
                marginRight: 10,
                textAlign: 'left',
              },
            ]}
          />

          <TextInput
            ref={phoneNumberRef}
            keyboardType='numeric'
            placeholder='Telefonnumer'
            value={phoneNumber}
            maxLength={7}
            onChangeText={(value) => setPhoneNumber(value)}
            style={[
              styles.inputText,
              {
                fontSize: fontSizes.lg,
                width: width * 0.3,
                marginTop: 10,
                textAlign: 'left',
              },
            ]}
          />
        </View>
      );
    }
    if (otp && !verified) {
      return (
        <OTPInput otp={otp} updateVerification={updateVerification}></OTPInput>
      );
    }

    if (otp && verified) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.instructionsHeaderText}>
            {'+46 ' + areaCode + ' ' + phoneNumber}
          </Text>
        </View>
      );
    }
  };

  const displayButton = () => {
    if (otp && verified) {
      return (
        <View
          style={{
            marginTop: 80,
            marginRight: 20,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            // flexDirection: 'row',
          }}
        >
          <Button text='OK' type='primary' onPress={() => hideModal(true)} />
        </View>
      );
    }
  };

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

export default OTPModal;
