import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Vibration } from 'react-native';
import { createStyles } from '../styles';

const styles = createStyles();

const OTPInput = ({ otp, setVerified }) => {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);
  const otp0 = useRef(null);
  const otp1 = useRef(null);
  const otp2 = useRef(null);
  const otp3 = useRef(null);
  const otp4 = useRef(null);
  const otp5 = useRef(null);

  useEffect(() => {
    otp0.current.focus();
  }, []);

  useEffect(() => {
    if (userInput.length === 6) {
      if (userInput === otp) {
        setError(false);
        setVerified(true);
      } else {
        setError(true);
        Vibration.vibrate(1000);
      }
    }
  }, [userInput]);

  const updateInput = (value, index) => {
    let tempInput = userInput.split('');

    if (value === 'Backspace') {
      tempInput[index] = '';
      setUserInput(tempInput.join(''));
      if (index === 5) {
        otp4.current.focus();
        return;
      }
      if (index === 4) {
        otp3.current.focus();
        return;
      }
      if (index === 3) {
        otp2.current.focus();
        return;
      }
      if (index === 2) {
        otp1.current.focus();
        return;
      }
      if (index === 1) {
        otp0.current.focus();
        return;
      }
    }
    if (isNaN(value)) {
      return;
    }
    tempInput[index] = value;
    setUserInput(tempInput.join(''));
    if (index === 0) {
      otp1.current.focus();
    }
    if (index === 1) {
      otp2.current.focus();
    }
    if (index === 2) {
      otp3.current.focus();
    }
    if (index === 3) {
      otp4.current.focus();
    }
    if (index === 4) {
      otp5.current.focus();
    }
  };

  return (
    <View>
      {error && (
        <View
          style={{
            marginBottom: 30,
          }}
        >
          <Text style={[styles.errorText, { textAlign: 'center' }]}>
            Ser ut som det var fel kod.
          </Text>
          <Text
            style={[styles.errorText, { textAlign: 'center', marginTop: 5 }]}
          >
            Prova en gång till
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TextInput
          keyboardType='numeric'
          ref={otp0}
          onKeyPress={(e) => updateInput(e.nativeEvent.key, 0)}
          style={styles.otpInputText}
          maxLength={1}
        />
        <TextInput
          keyboardType='numeric'
          ref={otp1}
          onKeyPress={(e) => updateInput(e.nativeEvent.key, 1)}
          style={styles.otpInputText}
          maxLength={1}
        />
        <TextInput
          keyboardType='numeric'
          ref={otp2}
          onKeyPress={(e) => updateInput(e.nativeEvent.key, 2)}
          style={styles.otpInputText}
          maxLength={1}
        />
        <TextInput
          keyboardType='numeric'
          ref={otp3}
          onKeyPress={(e) => updateInput(e.nativeEvent.key, 3)}
          style={styles.otpInputText}
          maxLength={1}
        />
        <TextInput
          keyboardType='numeric'
          ref={otp4}
          onKeyPress={(e) => updateInput(e.nativeEvent.key, 4)}
          style={styles.otpInputText}
          maxLength={1}
        />
        <TextInput
          keyboardType='numeric'
          ref={otp5}
          onKeyPress={(e) => updateInput(e.nativeEvent.key, 5)}
          style={styles.otpInputText}
          maxLength={1}
        />
      </View>
    </View>
  );
};

export default OTPInput;
