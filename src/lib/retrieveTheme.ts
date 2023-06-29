import AsyncStorage from '@react-native-async-storage/async-storage';

const retrieveTheme = async () => {
  try {
    const value = await AsyncStorage.getItem('ArtGeniusAI@theme');
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export default retrieveTheme;
