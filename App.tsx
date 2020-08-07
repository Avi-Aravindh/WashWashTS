import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppProvider from "./context/AppProvider";

import { createStyles } from "./styles";

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import AppContext from "./context/AppContext";

// Screens
import { Home } from "./screens";

//Components
import { DrawerContent } from "./components";

export default function App() {
  const styles = createStyles();
  const Drawer = createDrawerNavigator();

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  return (
    <AppProvider>
      <AppContext.Consumer>
        {(context) => (
          <NavigationContainer>
            {!fontsLoaded && <ActivityIndicator />}

            {fontsLoaded && (
              <Drawer.Navigator
                drawerContent={() => <DrawerContent />}
                initialRouteName="home"
              >
                <Drawer.Screen name="home" component={Home} />
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
