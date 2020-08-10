import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Cart = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Cart</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>go back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cart;
