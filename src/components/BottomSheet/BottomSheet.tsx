import React, { JSXElementConstructor, ReactElement } from 'react';
import { Overlay } from '@rneui/themed';
import { StyleProp, View, ViewStyle } from 'react-native';
import styles from './BottomSheet.styles';
import { DARK_COLORS, LIGHT_COLORS } from '../../enums';

type Props = {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>[]
    | ReactElement<any, string | JSXElementConstructor<any>>;
  theme: string;
  isVisible: boolean;
  onBackDropPress: () => void;
  overlayStyle?: StyleProp<ViewStyle>;
};

const BottomSheet = ({ children, theme, isVisible, onBackDropPress, overlayStyle }: Props) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackDropPress}
      animationType="slide"
      overlayStyle={[
        styles.homeGalleryBottomSheet,
        overlayStyle,
        {
          backgroundColor: theme === 'dark' ? DARK_COLORS.MODAL_BG : LIGHT_COLORS.MODAL_BG,
        },
      ]}
    >
      <View
        style={[
          styles.homeBottomSheetTopBar,
          {
            backgroundColor: theme === 'dark' ? 'gray' : 'lightgray',
          },
        ]}
      />
      {children}
    </Overlay>
  );
};

export default BottomSheet;
