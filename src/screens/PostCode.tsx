import React, { useState, useContext, useEffect } from 'react';
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

import { createStyles } from '../styles';

import { colors } from '../styles/BaseStyles';
const { width, height } = Dimensions.get('window');
const styles = createStyles();

const PostCode = (props) => {
  const appContext = useContext(AppContext);

  const [postCode, setPostCode] = useState<String>(
    appContext.postCode ? appContext.postCode : ''
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const [addition, setAddition] = useState<Boolean>(postCode.length < 3);
  const [isServiceAvailable, setIsServiceAvailable] = useState<Boolean>(false);

  useEffect(() => {
    setPostCode(appContext.postCode ? appContext.postCode : '');
  }, [props]);

  useEffect(() => {
    console.log('screen loads');
    if (postCode) {
      console.log('gotpostcode');
      let postCodeArray = postCode.split('');
      postCodeArray.splice(2, 0, ' ');
      setPostCode(postCodeArray.join(''));
    }
  }, []);

  useEffect(() => {
    if (postCode.length === 2) {
      if (addition) {
        setPostCode((prev) => prev + ' ');
      } else {
        setPostCode((prev) => prev.trim());
      }
      setAddition((prev) => !prev);
    }

    if (postCode.length === 6) {
      Keyboard.dismiss();
      let postCodeForAPI = postCode.split(' ').join('');
      let url = `${App_Settings.API_GET_PRODUCTS}?zip_code=${postCodeForAPI}`;

      console.log('Postcode to Api API_GET_PRODUCTS', url);
      setLoading(true);
      fetchAPI(url).then((response) => {
        setLoading(false);
        if (response.results && response.results.length > 0) {
          setIsServiceAvailable(true);
          appContext._updatePostCode(postCodeForAPI);
          console.log('found data');
        } else {
          setIsServiceAvailable(false);
          console.log('no service');
        }
      });
    }
  }, [postCode]);

  return (
    <Modal
      isVisible={props.isVisible}
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
            För att kunna avgöra om vi hjälpa dig behöver vi veta var i Sverige
            du bor.
          </Text>
          <View>
            <Text
              style={{
                marginTop: 20,
                opacity: postCode.length === 0 ? 0 : 1,
              }}
            >
              Postnummer
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <TextInput
                keyboardType={'numeric'}
                autoFocus={true}
                maxLength={6}
                // onSubmitEditing={() => floorRef.current.focus()}
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
              {loading && (
                <ActivityIndicator
                  style={{ marginLeft: -15, marginBottom: 5 }}
                  size='small'
                  color={colors.PRIMARY}
                />
              )}
            </View>
            <View style={{ height: 25, marginTop: 5 }}>
              {!loading && postCode.length === 6 && isServiceAvailable && (
                <Text style={styles.inputLabelText}>
                  Toppen! Vi kan leverera till dig 👍.
                </Text>
              )}
            </View>
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
              onPress={() => props.handleClose()}
            >
              <Text style={{ color: 'white' }}>Fortsatt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PostCode;
