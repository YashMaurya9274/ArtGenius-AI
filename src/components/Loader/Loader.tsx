import { StyleProp, Text, TextStyle } from 'react-native';
import React from 'react';
// @ts-ignore
import AnimatedLoader from 'react-native-animated-loader';
import styles from './Loader.styles';

type Props = {
  visible: boolean;
  animationStyle?: StyleProp<AnimatedLoader>;
  speed?: number;
  message?: string;
  textStyle?: StyleProp<TextStyle>;
  animationType?: string;
};

const Loader = ({
  visible,
  textStyle,
  animationStyle,
  animationType = 'slide' || 'fade',
  message,
  speed = 1,
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
      <Text style={[styles.loaderTextStyle, textStyle]}>{message}</Text>
    </AnimatedLoader>
  );
};

export default Loader;
