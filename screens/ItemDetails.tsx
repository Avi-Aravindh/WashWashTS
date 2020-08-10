import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { StackHeader } from '../components';
import { createStyles } from '../styles';

const styles = createStyles();
const { width, height } = Dimensions.get('window');

const ItemDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [item, setItem] = useState(route.params.item);
  const [quantity, setQuantity] = useState('');
  console.log('navigtaion', navigation);
  console.log('route', route);

  return (
    <View style={[styles.pageContainer]}>
      <View style={{ zIndex: 1000 }}>
        <StackHeader title={item.title} />
      </View>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: height * 0.4,
            width: width,
          },
        ]}
      >
        <Image
          source={item.image}
          style={{ height: undefined, width: undefined, flex: 1 }}
          resizeMode='cover'
        />
      </View>
      <View
        style={{
          position: 'absolute',
          marginTop: height * 0.43,
          borderWidth: 1,
          paddingLeft: width * 0.05,
        }}
      >
        <Text style={[styles.instructionText]}>{item.title}</Text>
        <Text style={[styles.instructionText]}>{item.price} / kg</Text>
        <Text style={[styles.desriptionText]}>information </Text>
        <TextInput
          style={{ width: 40, height: 20, borderColor: 'gray', borderWidth: 1 }}
          keyboardType='numeric'
          value={quantity}
          onChange={(text) => setQuantity(text)}
        ></TextInput>
      </View>
    </View>
  );
};

export default ItemDetails;
