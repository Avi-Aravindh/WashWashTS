/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, FunctionComponent } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { createStyles } from '../styles';
import AppContext from '../context/AppContext';
import { CustomBackButton, Stepper, ItemCounter, Button } from '../components';
import { Item } from '../context/AppContext';

const styles = createStyles();
const { width, height } = Dimensions.get('window');

const Cart = () => {
  const navigation = useNavigation();

  const appContext = useContext(AppContext);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerLeft: () => <CustomBackButton />,
      headerTitle: () => <Text style={styles.headerText}>CART</Text>,
    });
  }, [navigation]);

  const renderItem = ({ item }: Item) => {
    return (
      // <View style={[styles.checkoutTextContainer, { marginTop: 20 }]}>
      <View
        style={[styles.checkoutTextContainer, { height: 100, marginTop: 20 }]}
      >
        <View style={{ width: width * 0.2, height: width * 0.2 }}>
          <Image
            source={item.image}
            style={[styles.detailsImage, { borderRadius: 10 }]}
          />
        </View>
        <View style={{ width: width * 0.01 }} />
        <View style={{ width: width * 0.65 }}>
          <Text style={styles.descriptionText}>{item.title} </Text>
          <Text style={styles.inputLabelText}>{item.price} </Text>
          <View style={{ alignItems: 'flex-end' }}>
            <ItemCounter
              initialCount={item.quantity}
              onChange={(newCount) => {
                item.quantity = newCount;
                appContext.updateCart(item);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Stepper totalPages={4} currentPage={1} />

      <View style={{ marginTop: height * 0.05 }}>
        <View style={styles.checkoutTextContainer}>
          <Text style={[styles.inputLabelText, { fontSize: 13 }]}>
            Antal varor
          </Text>
          <Text style={[styles.inputLabelText, { fontSize: 13 }]}>
            {appContext.cart.cartItems.length}
          </Text>
        </View>

        <View style={styles.checkoutTextContainer}>
          <Text style={[styles.cartCostHeaderText]}>Kostnad</Text>
          <Text style={[styles.cartCostHeaderText]}>
            {appContext.totalCartCost}
          </Text>
        </View>
        <View style={{ height: height * 0.45, marginTop: 20 }}>
          <FlatList
            data={appContext.cart.cartItems}
            keyExtractor={(item) => item.itemId}
            renderItem={renderItem}
          />
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
            text='Checkout'
            type='primary'
            onPress={() => navigation.navigate('checkout')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;