import { StyleSheet } from 'react-native';
import { COLORCODE } from '../../enums';

const styles = StyleSheet.create({
  gradientHeader: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
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
  logo: {
    height: 120,
    width: 120,
    borderRadius: 20,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
    textAlign: 'center',
    color: 'gray',
  },
});

export default styles;
