import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { COLORCODE } from '../../enums';

type Props = {
  showSnackBar: boolean;
  customStyle?: StyleProp<ViewStyle>;
  onDismiss: () => void;
  onPressAction: () => void;
  text: string;
  actionTextColor?: string;
  actionLabel?: string;
  textStyle?: StyleProp<TextStyle>;
};

const CustomSnackBar = ({
  showSnackBar,
  actionLabel,
  actionTextColor,
  customStyle,
  onDismiss,
  onPressAction,
  text,
  textStyle,
}: Props) => {
  return (
    <Snackbar
      visible={showSnackBar}
      duration={2500}
      style={[
        {
          backgroundColor: COLORCODE.PRIMARY,
        },
        customStyle,
      ]}
      onDismiss={onDismiss}
      action={{
        textColor: actionTextColor || 'white',
        label: actionLabel || 'Ok',
        onPress: onPressAction,
      }}
    >
      <Text style={[{ fontSize: 16 }, textStyle]}>{text}</Text>
    </Snackbar>
  );
};

export default CustomSnackBar;
