import { View, Text, StatusBar, useColorScheme, Image, SafeAreaView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import styles from './LoginScreen.styles';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORCODE, DARK_COLORS, LIGHT_COLORS } from '../../enums';
import ImageLinks from '../../assets/images';
import GradientText from '../../components/GradientText';
import { Button } from 'react-native-paper';
import '../../../flow/config';
// @ts-ignore
import * as fcl from '@onflow/fcl/dist/fcl-react-native';

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const scheme = useColorScheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const connectWallet = async () => {
    fcl.logIn();
    // fcl.useServiceDiscovery();
    // await login().then(() => {
    //   // navigation.navigate("Home")
    //   console.log('Logged in');
    // });
  };

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: scheme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
      }}
    >
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={scheme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND}
      />

      <GradientText style={styles.gradientHeader}>ArtGenius AI</GradientText>

      <View style={styles.loginContainer}>
        <Image source={ImageLinks.logo} style={styles.logo} />

        <Button
          style={{ marginTop: 30 }}
          mode="text"
          textColor={COLORCODE.primary}
          onPress={connectWallet}
        >
          <Text style={{ fontSize: 18, marginHorizontal: 10 }}>Connect Wallet</Text>
        </Button>
      </View>

      <fcl.ServiceDiscovery fcl={fcl} />

      <Text style={styles.footer}>Powered by ArtGenius AI</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
