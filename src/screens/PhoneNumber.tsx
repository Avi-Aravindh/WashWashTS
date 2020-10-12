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
import personnummer from 'personnummer';

import { createStyles } from '../styles';
import AppContext from '../context/AppContext';
import { UserProfile } from '../context/AppProvider';

import {
  CustomBackButton,
  Stepper,
  ItemCounter,
  Button,
  OTPInput,
} from '../components';
import { OTPModal } from '../screens';

import { Item } from '../context/AppContext';
import { colors, fontSizes } from '../styles/BaseStyles';
import { Value } from 'react-native-reanimated';

const styles = createStyles();
const { width, height } = Dimensions.get('window');

const PhoneNumber = () => {
  const appContext = useContext(AppContext);

  const navigation = useNavigation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [personNumber, setPersonNumber] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(!appContext.verified);
  const [error, setError] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const personNumberRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => <CustomBackButton />,
      headerTitle: () => <Text style={styles.headerText}>Din information</Text>,
    });
  }, [navigation]);

  useEffect(() => {
    let userProfile: UserProfile = appContext.userProfile;

    setFirstName(userProfile.firstName);
    setLastName(userProfile.lastName);
    setPersonNumber(userProfile.personNumber);
  }, [appContext.userProfile]);

  const verifyPersonNumber = (value) => {
    personnummer.valid(value) ? setError(false) : setError(true);
  };
  return (
    <SafeAreaView style={styles.pageContainer}>
      <Stepper totalPages={4} currentPage={2} />
      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* First name last name row */}
        <View
          style={{
            flexDirection: 'row',
            width: width * 0.8,
            marginTop: 50,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={{
                marginTop: 10,
                opacity: firstName.length > 0 ? 1 : 0,
              }}
            >
              Förnamn
            </Text>
            <TextInput
              ref={firstNameRef}
              onSubmitEditing={() => lastNameRef.current.focus()}
              placeholder='Förnamn'
              value={firstName}
              onChangeText={(value) => setFirstName(value)}
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
                marginTop: 10,
                opacity: lastName.length > 0 ? 1 : 0,
              }}
            >
              Efternamn
            </Text>

            <TextInput
              ref={lastNameRef}
              onSubmitEditing={() => personNumberRef.current.focus()}
              placeholder='Efternamn'
              value={lastName}
              onChangeText={(value) => setLastName(value)}
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

        {/* Person Number row */}
        <View
          style={{
            flexDirection: 'column',
            width: width * 0.8,
            marginTop: 20,
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{ marginTop: 10, opacity: personNumber.length > 0 ? 1 : 0 }}
          >
            Personnummer
          </Text>

          <TextInput
            ref={personNumberRef}
            placeholder='Personnummer'
            keyboardType={'numeric'}
            maxLength={
              personNumber.substr(0, 2) === '19' ||
              personNumber.substr(0, 2) === '20'
                ? 12
                : 10
            }
            value={personNumber}
            onChangeText={(value) => {
              setPersonNumber(value);

              if (value.substr(0, 2) === '19' || value.substr(0, 2) === '20') {
                if (value.length === 12) {
                  verifyPersonNumber(value);
                }
              } else {
                if (value.length === 10) {
                  verifyPersonNumber(value);
                }
              }
            }}
            style={[styles.inputText, { marginTop: 10, textAlign: 'left' }]}
          />
        </View>

        <View
          style={{
            marginTop: 5,
          }}
        >
          {error && (
            <Text style={[styles.errorText, { textAlign: 'center' }]}>
              Ogiltigt personnummer
            </Text>
          )}
        </View>

        <View
          style={{
            marginRight: 30,
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 20,
            width,
          }}
        >
          <Button
            text='Nästa 👉🏼'
            type='primary'
            disabled={!personNumber}
            onPress={() => {
              let newProfile: UserProfile = {
                firstName: firstName,
                lastName: lastName,
                personNumber: personNumber,
              };
              appContext.updateUserProfile(newProfile);
              navigation.navigate('checkout');
            }}
          />
        </View>

        <OTPModal isVisible={showModal} hideModal={() => setShowModal(false)} />
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumber;
