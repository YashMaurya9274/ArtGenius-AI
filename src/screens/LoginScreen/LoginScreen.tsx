import { View, Text, StatusBar, useColorScheme, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './LoginScreen.styles';
import { RootStackParamList } from '../../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { COLORCODE, DARK_COLORS, LIGHT_COLORS } from '../../enums';
import ImageLinks from '../../assets/images';
import GradientText from '../../components/GradientText/GradientText';
import { Button } from 'react-native-paper';
import '../../../flow/config';
// @ts-ignore
import * as fcl from '@onflow/fcl/dist/fcl-react-native';
import WalletServiceCard from '../../components/WalletServiceCard/WalletServiceCard';
import WalletDiscoveryWrapper from '../../components/WalletDiscoveryWrapper/WalletDiscoveryWrapper';
import retrieveTheme from '../../lib/retrieveTheme';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import CustomSnackBar from '../../components/CustomSnackBar/CustomSnackBar';

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

      <GradientText style={styles.gradientHeader}>ArtGenius AI</GradientText>

      <View style={styles.loginContainer}>
        <Image source={ImageLinks.logo} style={styles.logo} />

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

      <Text style={styles.footer}>Powered by ArtGenius AI</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
