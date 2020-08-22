import React, { useContext, useEffect, FunctionComponent } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CustomBackButton, Stepper, Button } from '../components';
import { createStyles } from '../styles';

const styles = createStyles();
const { width, height } = Dimensions.get('window');
const Payment = () => {
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
      headerTitle: () => <Text style={styles.headerText}>Betalning</Text>,
    });
  }, [navigation]);
  return (
    <View style={styles.pageContainer}>
      <Stepper totalPages={4} currentPage={3} />
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
            Fyll i dina kortuppgifter så drar vi pengarna när du fått din
            leverans. Lätt som en plätt!
          </Text>
        </View>
        <View style={{ height: height * 0.5, marginTop: 40 }}>
          <Text>Hoping to have stripe and other payment options here</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            marginTop: height * 0.6,
            marginLeft: width * 0.5,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            text='Leverans 👉🏼'
            type='primary'
            onPress={() => navigation.navigate('pickup')}
          />
        </View>
      </View>
    </View>
  );
};

export default Payment;
