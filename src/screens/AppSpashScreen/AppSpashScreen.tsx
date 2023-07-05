import { View, StatusBar, SafeAreaView } from 'react-native';
import React from 'react';
import { DARK_COLORS, LIGHT_COLORS } from '../../enums';
import Footer from '../../components/Footer/Footer';
import GradientHeader from '../../components/GradientHeader/GradientHeader';
import AppLogo from '../../components/AppLogo/AppLogo';

const AppSpashScreen = () => {
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'dark' === 'dark' ? DARK_COLORS.BACKGROUND : LIGHT_COLORS.BACKGROUND,
      }}
    >
      <StatusBar hidden />

      <GradientHeader />

      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AppLogo />
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default AppSpashScreen;
