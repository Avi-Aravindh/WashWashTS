import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import AppProvider from './src/context/AppProvider';
import AppContext from './src/context/AppContext';

import { createStyles } from './src/styles';

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

// Screens
import {
  Home,
  ItemDetails,
  Cart,
  Checkout,
  Payment,
  Pickup,
  Confirmation,
  PostCode,
  Profile,
  ExistingOrders,
  OrderDetails,
} from './src/screens';

//Components
import { DrawerContent } from './src/components';

export default function App() {
  const styles = createStyles();
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  function AppScreens() {
    return (
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen
          name='home'
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='itemDetails'
          component={ItemDetails}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
            headerShown: false,
          }}
        />
        <Stack.Screen name='cart' component={Cart} />
        <Stack.Screen name='checkout' component={Checkout} />
        <Stack.Screen name='payment' component={Payment} />
        <Stack.Screen name='pickup' component={Pickup} />
        <Stack.Screen name='confirmation' component={Confirmation} />
        <Stack.Screen name='profile' component={Profile} />
        <Stack.Screen name='existingOrders' component={ExistingOrders} />
        <Stack.Screen name='orderDetails' component={OrderDetails} />
      </Stack.Navigator>
    );
  }

  function HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName='appScreens'
        mode='modal'
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          cardStyle: { backgroundColor: 'red', height: 50 },
        }}
      >
        <Stack.Screen name='appScreens' component={AppScreens} />
        <Stack.Screen name='postCodeModal' component={PostCode} />
      </Stack.Navigator>
    );
  }

  return (
    <AppProvider>
      <AppContext.Consumer>
        {(context) => (
          <NavigationContainer>
            {!fontsLoaded && <ActivityIndicator />}

            {fontsLoaded && (
              <Drawer.Navigator
                drawerContent={(props) => <DrawerContent {...props} />}
                initialRouteName='homeStack'
              >
                <Drawer.Screen name='homeStack' component={HomeStack} />
              </Drawer.Navigator>
            )}
          </NavigationContainer>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
}
