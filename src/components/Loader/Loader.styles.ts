import { StyleSheet } from 'react-native';
import { COLORCODE } from '../../enums';

const styles = StyleSheet.create({
  loaderAnimationStyle: {
    height: 200,
    width: 200,
    zIndex: 20,
  },
  loaderTextStyle: {
    fontSize: 24,
    color: COLORCODE.PRIMARY,
    fontWeight: '500',
  },
});

export default styles;
