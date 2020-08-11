import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from '../styles';
import AppContext from '../context/AppContext';

const { width, height } = Dimensions.get('window');
const Cart = () => {
  const styles = createStyles();
  const appContext = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('cart')}>
      {appContext.totalCartCount > 0 && (
        <View style={styles.cartCountContainer}>
          <Text style={styles.cartCountText}>{appContext.totalCartCount}</Text>
        </View>
      )}
      <Image
        source={require('../assets/checkout.png')}
        style={{ marginRight: width * 0.05, height: 35 }}
      />
    </TouchableOpacity>
  );
};

export default Cart;
