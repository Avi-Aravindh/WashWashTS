import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTimingTransition, useTransition } from 'react-native-redash';

import Animated, {
  Easing,
  useCode,
  cond,
  eq,
  set,
  block,
} from 'react-native-reanimated';
import { StackHeader, ItemCounter, Button } from '../components';
import { isItemInCart, getItemFromCart } from '../utilities';
import { createStyles } from '../styles';
import AppContext from '../context/AppContext';
import { Item, Address } from '../context/AppProvider';

const styles = createStyles();
const { width, height } = Dimensions.get('window');

const ItemDetails = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const [item, setItem] = useState(route.params.item);
  const [quantity, setQuantity] = useState(1);
  const [cartUpdated, setCartUpdated] = useState(0);
  const appContext = useContext(AppContext);

  const cartUpdatedOpacity = useTimingTransition(cartUpdated, {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
  });

  useEffect(() => {
    if (!isItemInCart(appContext.cart, item)) {
      setQuantity(0);
      return;
    } else {
      setQuantity(
        appContext.cart.cartItems.find(
          (cartItem: Item) => cartItem.itemId === item.itemId
        ).quantity
      );
    }
  }, [appContext.cart, item]);

  return (
    <ScrollView style={[styles.pageContainer]}>
      <View style={styles.zIndexHighest}>
        <StackHeader title={item.title} />
      </View>
      <View style={[styles.detailsImageContainer]}>
        <Image
          source={{ uri: item.itemImage }}
          style={[styles.detailsImage]}
          resizeMode='cover'
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.instructionsHeaderText}>{item.Name}</Text>
        <Text style={[styles.desriptionText, { marginTop: 10 }]}>
          {item.Price} / {item.UnitDescription}
        </Text>
        <Text style={[styles.informationText]}>{item.Description}</Text>

        <View style={[styles.separator]} />
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.desriptionText]}>Välj cirka vikt</Text>
        </View>
        <View
          style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}
        >
          <ItemCounter
            initialCount={quantity}
            onChange={(newCount) => {
              setCartUpdated(0);
              setQuantity(newCount);
            }}
          />

          <Animated.View
            style={[
              styles.updateText,
              { marginLeft: 20, opacity: cartUpdatedOpacity },
            ]}
          >
            <Text style={styles.updateText}>kundvagn uppdaterad</Text>
          </Animated.View>
        </View>
        <KeyboardAvoidingView
          behavior={'position'}
          contentContainerStyle={{
            flexDirection: 'row',
            width: width * 0.9,
            justifyContent: 'flex-end',
          }}
          style={{
            position: 'absolute',
            bottom: height * -0.2,
            right: 10,
          }}
        >
          {/* <Button
            text='Vagn'
            type='primary'
            onPress={() => {
              navigation.navigate('cart');
            }}
          /> */}
          <Button
            text={
              quantity < getItemFromCart(appContext.cart, item).quantity
                ? 'Uppdatera'
                : 'Lägg till'
            }
            type='primary'
            disabled={
              quantity === getItemFromCart(appContext.cart, item).quantity
                ? true
                : getItemFromCart(appContext.cart, item) === false
                ? quantity === 0
                  ? true
                  : false
                : false
            }
            onPress={() => {
              appContext.updateCart({ ...item, quantity: quantity });
              setCartUpdated(1);
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ItemDetails;
