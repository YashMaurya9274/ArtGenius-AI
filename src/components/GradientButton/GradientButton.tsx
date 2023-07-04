import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  colors: string[];
  buttonStyle?: StyleProp<ViewStyle>;
  gradientStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  activeOpacity?: number;
};

const GradientButton = ({
  colors,
  buttonStyle,
  gradientStyle,
  titleStyle,
  title,
  imageSource,
  imageStyle,
  onPress,
  activeOpacity = 0.5,
}: Props) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} style={buttonStyle} onPress={onPress}>
      <LinearGradient colors={colors} style={gradientStyle}>
        {imageSource && <Image source={imageSource} style={imageStyle} />}
        <Text style={titleStyle}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
