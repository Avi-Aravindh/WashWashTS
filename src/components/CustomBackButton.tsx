import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomBackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{ width: 32, height: 32 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/arrowLeftBlack.png')}
          style={{
            marginLeft: 20,
          }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBackButton;
