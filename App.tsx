import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AppProvider from './context/AppProvider';

import { createStyles } from './styles';

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import AppContext from './context/AppContext';

// Screens
import {
  Home,
  ItemDetails,
  Cart,
  Checkout,
  Payment,
  Pickup,
  Confirmation,
} from './screens';

//Components
import { DrawerContent } from './components';

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

  function HomeStack() {
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
                drawerContent={() => <DrawerContent />}
                initialRouteName='homeStack'
              >
                <Drawer.Screen name='homeStack' component={HomeStack} />
              </Drawer.Navigator>
            )}
          </NavigationContainer>
        )}
      </AppContext.Consumer>
    </AppProvider>
    // <View style={styles.pageContainer}>

    // </View>
  );
}
