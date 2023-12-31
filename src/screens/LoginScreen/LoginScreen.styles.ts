import { StyleSheet } from 'react-native';
import { COLORCODE } from '../../enums';

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainerText: {
    color: COLORCODE.PRIMARY,
    fontSize: 18,
    fontWeight: '500',
    marginTop: 30,
    textTransform: 'uppercase',
  },
});

export default styles;
