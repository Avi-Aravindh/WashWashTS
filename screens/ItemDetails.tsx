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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackHeader, ItemCounter, Button } from '../components';
import { isItemInCart, getItemFromCart } from '../utilities';
import { createStyles } from '../styles';
import AppContext from '../context/AppContext';
import { Item } from '../context/AppProvider';

const styles = createStyles();
const { width, height } = Dimensions.get('window');

const ItemDetails = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const [item, setItem] = useState(route.params.item);
  const [quantity, setQuantity] = useState(1);

  const appContext = useContext(AppContext);

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
  }, [navigation.isFocused(), appContext.cart, item]);

  return (
    <ScrollView style={[styles.pageContainer]}>
      <View style={styles.zIndexHighest}>
        <StackHeader title={item.title} />
      </View>
      <View style={[styles.detailsImageContainer]}>
        <Image
          source={item.image}
          style={[styles.detailsImage]}
          resizeMode='cover'
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.instructionsHeaderText}>{item.title}</Text>
        <Text style={[styles.desriptionText, { marginTop: 10 }]}>
          {item.price} / kg
        </Text>
        <Text style={[styles.informationText]}>
          Information text about the product and what to expect from getting
          this servie.
        </Text>

        <View style={[styles.separator]} />
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.desriptionText]}>Välj cirka vikt</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <ItemCounter
            initialCount={quantity}
            onChange={(newCount) => setQuantity(newCount)}
          />
        </View>
        <KeyboardAvoidingView
          behavior={'position'}
          style={{ position: 'absolute', bottom: height * -0.2, right: 10 }}
        >
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
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default ItemDetails;
