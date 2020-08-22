import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, Dimensions, Alert, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CustomBackButton, Stepper, Button } from '../components';
import { createStyles } from '../styles';
import { Address } from '../context/AppProvider';
import AppContext from '../context/AppContext';

const styles = createStyles();
const { width, height } = Dimensions.get('window');

const Pickup = () => {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);
  const [addressLine, setAddressLine] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [doorNumber, setDoorNumber] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');

  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const postCodeRef = useRef(null);
  const floorRef = useRef(null);
  const doorNumberRef = useRef(null);

  useEffect(() => {
    let currentAddress: Address = appContext.address;

    setAddressLine(currentAddress.addressLine);
    setCity(currentAddress.city);
    setFloor(currentAddress.floor);
    setDoorNumber(currentAddress.doorNumber);
    setPostCode(currentAddress.postCode);
  }, [appContext.address]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => <CustomBackButton />,
      headerTitle: () => <Text style={styles.headerText}>ADRESS</Text>,
    });

    if (appContext.address.addressLine === '') {
      addressRef.current.focus();
    }
  }, [navigation]);

  return (
    <KeyboardAwareScrollView style={styles.pageContainer}>
      <Stepper totalPages={4} currentPage={2} />
      <View style={{ marginTop: height * 0.05 }}>
        <View
          style={{
            width: width * 0.7,
            marginLeft: width * 0.15,
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              styles.instructionText,
              { textAlign: 'center', lineHeight: 35 },
            ]}
          >
            För att kunna hämta / leverera dina varor måste du fylla i din
            adress
          </Text>
        </View>
        <View
          style={{
            height: height * 0.5,
            marginTop: 30,
            width: width * 0.95,
            marginLeft: width * 0.1,
          }}
        >
          <Text style={{ opacity: addressLine.length > 0 ? 1 : 0 }}>
            Adress
          </Text>

          <TextInput
            ref={addressRef}
            placeholder='Adress'
            onSubmitEditing={() => cityRef.current.focus()}
            value={addressLine}
            onChangeText={(value) => setAddressLine(value)}
            style={[styles.inputText, { marginTop: 10, textAlign: 'left' }]}
          />
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.8,

              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{
                  marginTop: 20,
                  opacity: city.length > 0 ? 1 : 0,
                }}
              >
                Stad
              </Text>
              <TextInput
                ref={cityRef}
                onSubmitEditing={() => postCodeRef.current.focus()}
                placeholder='Stad'
                value={city}
                onChangeText={(value) => setCity(value)}
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

            <View>
              <Text
                style={{
                  marginTop: 20,
                  opacity: postCode.length > 0 ? 1 : 0,
                }}
              >
                Postnummer
              </Text>
              <TextInput
                ref={postCodeRef}
                keyboardType={'numeric'}
                onSubmitEditing={() => floorRef.current.focus()}
                value={postCode}
                onChangeText={(value) => setPostCode(value)}
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.8,

              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                style={{ marginTop: 20, opacity: floor.length > 0 ? 1 : 0 }}
              >
                Våning
              </Text>
              <TextInput
                ref={floorRef}
                keyboardType={'numeric'}
                value={floor}
                onChangeText={(value) => setFloor(value)}
                onSubmitEditing={() => doorNumberRef.current.focus()}
                placeholder='Våning'
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

            <View>
              <Text
                style={{
                  marginTop: 20,
                  opacity: doorNumber.length > 0 ? 1 : 0,
                }}
              >
                Dörrnummer
              </Text>
              <TextInput
                ref={doorNumberRef}
                keyboardType={'numeric'}
                value={doorNumber}
                onChangeText={(value) => setDoorNumber(value)}
                placeholder='Dörrnummer'
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
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            marginTop: height * 0.63,
            marginLeft: width * 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            text='Nästa  👉🏼'
            type='primary'
            onPress={() => {
              let newAddress: Address = {
                addressLine: addressLine,
                city: city,
                postCode: postCode,
                floor: floor,
                doorNumber: doorNumber,
              };
              appContext.updateAddress(newAddress);
              navigation.navigate('payment');
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Pickup;
