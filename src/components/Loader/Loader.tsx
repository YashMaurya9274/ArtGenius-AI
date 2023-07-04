import { StyleProp, Text, TextStyle, View } from 'react-native';
import React from 'react';
// @ts-ignore
import AnimatedLoader from 'react-native-animated-loader';
import styles from './Loader.styles';
import { DARK_COLORS } from '../../enums';

type Props = {
  visible: boolean;
  animationStyle?: StyleProp<AnimatedLoader>;
  speed?: number;
  message?: string;
  textStyle?: StyleProp<TextStyle>;
  animationType?: string;
  theme: string;
};

const Loader = ({
  visible,
  textStyle,
  animationStyle,
  animationType = 'slide' || 'fade',
  message,
  speed = 1,
  theme,
}: Props) => {
  return (
    <AnimatedLoader
      visible={visible}
      // overlayColor="rgba(255,255,255,0.75)"
      source={require('../../assets/loader.json')}
      animationStyle={[styles.loaderAnimationStyle, animationStyle]}
      animationType={!animationType ? 'slide' : animationType}
      speed={speed}
    >
      <View
        style={{
          backgroundColor: theme === 'dark' ? DARK_COLORS.SNACKBAR_BG : 'white',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          maxWidth: '85%',
        }}
      >
        <Text style={[styles.loaderTextStyle, textStyle]}>{message}</Text>
      </View>
    </AnimatedLoader>
  );
};

export default Loader;
