import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import { useColorScheme } from 'react-native';
import { DARK_COLORS } from '../enums';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import '../../flow/config';

import { useState, useEffect } from 'react';
// @ts-ignore
import * as fcl from '@onflow/fcl/dist/fcl-react-native';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const scheme = useColorScheme();
  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const globalScreenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: scheme === 'dark' ? DARK_COLORS.BACKGROUND : 'white',
    },
    headerTitleStyle: { color: scheme === 'dark' ? 'white' : 'black' },
    headerTintColor: scheme === 'dark' ? 'white' : 'black',
    headerShadowVisible: false,
    // animationEnabled: false,
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={globalScreenOptions}>
          {!user.loggedIn ? (
            <RootStack.Screen name="Login" component={LoginScreen} />
          ) : (
            <RootStack.Screen name="Home" component={HomeScreen} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootNavigator;
