import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Fragment,
} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createStyles } from '../styles';
import AppContext from '../context/AppContext';
import {
  CustomBackButton,
  Stepper,
  ItemCounter,
  Button,
  OTPInput,
} from '../components';
import { Item } from '../context/AppContext';
import { colors, fontSizes } from '../styles/BaseStyles';

const styles = createStyles();
const { width, height } = Dimensions.get('window');

const PhoneNumber = () => {
  const navigation = useNavigation();
  const [verified, setVerified] = useState(false);
  const [areaCode, setAreaCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sending, setSending] = useState<boolean>(false);
  const [otp, setOtp] = useState('');

  const appContext = useContext(AppContext);

  const phoneNumberRef = useRef(null);
  const areaCodeRef = useRef(null);

  useEffect(() => {
    // TODO : do a customer verification call
    setVerified(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => <CustomBackButton />,
      headerTitle: () => <Text style={styles.headerText}>TELEFONNUMMER</Text>,
    });
  }, [navigation]);

  useEffect(() => {}, [verified]);

  const sendOTP = () => {
    setSending(true);
    setOtp('123456');
    setTimeout(() => {
      setSending(false);
    }, 2000);
  };

  const displayInstructionsText = () => {
    if (!otp) {
      return (
        <Fragment>
          <Text
            style={[
              styles.instructionText,
              { width: width * 0.8, textAlign: 'center' },
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
              },
            ]}
          >
            behöver vi skicka en
          </Text>
          <Text
            style={[
              styles.instructionText,
              { width: width * 0.8, marginTop: 3, textAlign: 'center' },
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
            value='+46'
            style={[
              styles.inputText,
              {
                width: width * 0.15,
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
                width: width * 0.5,
                marginTop: 10,
                textAlign: 'left',
              },
            ]}
          />
        </View>
      );
    }
    if (otp && !verified) {
      return <OTPInput otp={otp} setVerified={setVerified}></OTPInput>;
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
          <TouchableOpacity
            onPress={() => {
              setAreaCode('');
              setPhoneNumber('');
              setVerified(false);
              setOtp('');
            }}
          >
            <Image
              source={require('../../assets/pencil.png')}
              style={{ marginLeft: 10, height: 15, width: 15 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const displayButton = () => {
    if (otp && verified) {
      return (
        <View
          style={{
            position: 'absolute',
            marginTop: height * 0.3,
            marginLeft: width * 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            text='Nästa 👉🏼'
            type='primary'
            onPress={() => navigation.navigate('checkout')}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Stepper totalPages={4} currentPage={2} />

      <View style={{ marginTop: height * 0.04 }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {displayInstructionsText()}

          <View style={[styles.separator]} />

          <View style={{ marginTop: 30 }}>{displayContent()}</View>
        </View>
      </View>

      {!otp && !verified && (
        <View
          style={{
            marginTop: 60,
            marginRight: 20,
            marginLeft: width * 0.2,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          {sending && <Text>Sending</Text>}
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
    </SafeAreaView>
  );
};

export default PhoneNumber;
