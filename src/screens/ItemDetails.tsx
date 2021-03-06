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
  const [QuantityInCart, setQuantityInCart] = useState(1);
  const [cartUpdated, setCartUpdated] = useState(0);
  const appContext = useContext(AppContext);

  const cartUpdatedOpacity = useTimingTransition(cartUpdated, {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
  });

  useEffect(() => {
    if (!isItemInCart(appContext.cart, item)) {
      setQuantityInCart(0);
      return;
    } else {
      setQuantityInCart(
        appContext.cart.cartItems.find(
          (cartItem: Item) => cartItem.Id === item.Id
        ).QuantityInCart
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
            initialCount={QuantityInCart}
            onChange={(newCount) => {
              setCartUpdated(0);
              setQuantityInCart(newCount);
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
        <View
          style={{
            // position: 'absolute',
            // bottom: height * -0.2,
            marginTop: height * 0.1,
            marginLeft: width * 0.5,
            marginBottom: height * 0.2,
            flexDirection: 'row',
            width: width * 0.9,
          }}
        >
          <Button
            text={
              QuantityInCart <
              getItemFromCart(appContext.cart, item).QuantityInCart
                ? 'Uppdatera'
                : 'Lägg till'
            }
            type='primary'
            disabled={
              QuantityInCart ===
              getItemFromCart(appContext.cart, item).QuantityInCart
                ? true
                : getItemFromCart(appContext.cart, item) === false
                ? QuantityInCart === 0
                  ? true
                  : false
                : false
            }
            onPress={() => {
              appContext.updateCart({
                ...item,
                QuantityInCart: QuantityInCart,
              });
              setCartUpdated(1);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ItemDetails;
