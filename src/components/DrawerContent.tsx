import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const DrawerContent = ({ navigation }) => {
  return (
    <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>
      <View>
        <Image
          source={require('../../assets/splash.png')}
          style={{ height: 100, width: 100 }}
          resizeMode='contain'
        />
        <View style={{ alignSelf: 'center', marginTop: height * 0.2 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('profile');
            }}
          >
            <Text>PROFIL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              navigation.navigate('profile');
            }}
          >
            <Text>BEFINTLIGA BESTÄLLNINGAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Text>OM OSS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
