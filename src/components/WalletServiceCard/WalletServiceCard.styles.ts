import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  serviceContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
    // backgroundColor: 'transparent',
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
