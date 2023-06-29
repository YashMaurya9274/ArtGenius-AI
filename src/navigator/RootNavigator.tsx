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
import retrieveTheme from '../lib/retrieveTheme';
import storeTheme from '../lib/storeTheme';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const scheme = useColorScheme();
  const [user, setUser] = useState({ loggedIn: null });
  const [theme, setTheme] = useState<string>('');

  const fetchTheme = async () => {
    const themeFromStorage = await retrieveTheme();
    if (themeFromStorage) {
      setTheme(themeFromStorage);
    } else {
      // @ts-ignore
      await storeTheme(scheme);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const globalScreenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: theme === 'dark' ? DARK_COLORS.BACKGROUND : 'white',
    },
    headerTitleStyle: { color: theme === 'dark' ? 'white' : 'black' },
    headerTintColor: theme === 'dark' ? 'white' : 'black',
    headerShadowVisible: false,
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
