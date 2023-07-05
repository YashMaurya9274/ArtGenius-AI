import { View, Text, StatusBar, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './LoginScreen.styles';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { DARK_COLORS, LIGHT_COLORS } from '../../enums';
import ImageLinks from '../../assets/images';
import GradientText from '../../components/GradientText/GradientText';
import '../../../flow/config';
// @ts-ignore
import * as fcl from '@onflow/fcl/dist/fcl-react-native';
import WalletServiceCard from '../../components/WalletServiceCard/WalletServiceCard';
import WalletDiscoveryWrapper from '../../components/WalletDiscoveryWrapper/WalletDiscoveryWrapper';
import retrieveTheme from '../../lib/retrieveTheme';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import Footer from '../../components/Footer/Footer';
import GradientHeader from '../../components/GradientHeader/GradientHeader';
import AppLogo from '../../components/AppLogo/AppLogo';

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [theme, setTheme] = useState<string>('');
  const isFocused = useIsFocused();
  const { isLoading } = fcl.useServiceDiscovery({ fcl });

  const fetchTheme = async () => {
    const themeFromStorage = await retrieveTheme();
    if (themeFromStorage) {
      setTheme(themeFromStorage);
    }
  };

  useEffect(() => {
    if (isFocused) fetchTheme();
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
      }}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND}
      />

      <GradientHeader />

      <View style={styles.loginContainer}>
        <AppLogo />

        <Text style={styles.loginContainerText}>
          {isLoading ? 'Loading Wallets...' : 'Connect Wallet'}
        </Text>

        <fcl.ServiceDiscovery
          fcl={fcl}
          Loading={LoadingIndicator}
          // Empty={NoWalletsView}
          ServiceCard={WalletServiceCard}
          Wrapper={WalletDiscoveryWrapper}
        />
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default LoginScreen;
