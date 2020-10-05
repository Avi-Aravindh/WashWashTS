import React, { useState, useContext, useEffect, useRef } from 'react';
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
    if (postCode) {
      let postCodeArray = postCode.split('');
      if (postCodeArray[2] !== ' ') {
        postCodeArray.splice(2, 0, ' ');
      }
      setPostCode(postCodeArray.join(''));
    }
    formatPostCode();
  }, [props]);

  useEffect(() => {
    if (postCode) {
      let postCodeArray = postCode.split('');
      if (postCodeArray[2] !== ' ') {
        postCodeArray.splice(2, 0, ' ');
      }

      setPostCode(postCodeArray.join(''));
    }
  }, []);

  useEffect(() => {
    formatPostCode();
    if (postCode.length === 6) {
      let postCodeForAPI = postCode.split(' ').join('');
      let url = `${App_Settings.API_GET_PRODUCTS}?zip_code=${postCodeForAPI}`;

      setLoading(true);

      fetchAPI(url).then((response) => {
        console.log(response);
        setLoading(false);
        if (response.results && response.results.length > 0) {
          setIsServiceAvailable(true);
          appContext._updatePostCode(postCodeForAPI);
          appContext._updateAllItems(response.results);

          // getting categories
          let categoriesURL = `${App_Settings.API_GET_CATEGORIES}`;
          fetchAPI(categoriesURL).then((res) => {
            appContext._updateCategories(res.results);
          });

          // getting deals
          let dealsURL = `${App_Settings.API_GET_DEALS}`;
          fetchAPI(dealsURL).then((res) => {
            appContext._updateOfferItems(res.results);
          });

          Keyboard.dismiss();
        } else {
          setIsServiceAvailable(false);
          appContext._updatePostCode(postCodeForAPI);
          appContext._updateAllItems([]);
          appContext._updateOfferItems([]);
        }
      });
    }
  }, [postCode]);

  const formatPostCode = () => {
    if (postCode.length === 2) {
      if (addition) {
        setPostCode((prev) => prev + ' ');
      } else {
        setPostCode((prev) => prev.trim());
      }
      setAddition((prev) => !prev);
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
          alignItems: 'center',
          backgroundColor: 'white',
          height: height * 0.5,
          width: width * 0.8,
        }}
      >
        <View
          style={{
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
                autoFocus={postCode.length < 5}
                maxLength={6}
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
            <View style={{ height: 70, marginTop: 5 }}>
              {!loading && postCode.length === 6 && isServiceAvailable && (
                <Text style={styles.inputLabelText}>
                  Toppen! Vi kan leverera till dig 👍.
                </Text>
              )}
              {!loading && postCode.length === 6 && !isServiceAvailable && (
                <Text style={styles.inputLabelText}>
                  Tyvärr kan vi inte leverera till detta område just nu😔.
                  Försök med 72212 istället
                </Text>
              )}
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
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
              <Text style={{ color: 'white' }}>
                {isServiceAvailable ? 'Fortsätta' : 'Close'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PostCode;
