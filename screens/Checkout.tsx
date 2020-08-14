import React, { useContext, useEffect, FunctionComponent } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { CustomBackButton, Stepper, Button } from '../components';
import { createStyles } from '../styles';
import { TextInput } from 'react-native-gesture-handler';

const styles = createStyles();
const { width, height } = Dimensions.get('window');
const Pickup = () => {
  const navigation = useNavigation();

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
  }, [navigation]);
  return (
    <KeyboardAwareScrollView style={styles.pageContainer}>
      {/* <View style={styles.pageContainer}> */}
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
          <TextInput
            placeholder='Adress'
            style={[styles.inputText, { marginTop: 40 }]}
          />
          <TextInput
            placeholder='Adress'
            style={[styles.inputText, { marginTop: 40 }]}
          />
          <TextInput
            placeholder='Adress'
            style={[styles.inputText, { marginTop: 40 }]}
          />
          <TextInput
            placeholder='Adress'
            style={[styles.inputText, { marginTop: 40 }]}
          />
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
            onPress={() => navigation.navigate('payment')}
          />
        </View>
      </View>
      {/* </View> */}
    </KeyboardAwareScrollView>
  );
};

export default Pickup;
