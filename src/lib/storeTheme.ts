import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTheme = async (theme: string) => {
  try {
    if (theme) {
      await AsyncStorage.setItem('ArtGeniusAI@theme', theme === 'dark' ? 'light' : 'dark').then(
        () => console.log('stored', theme === 'dark' ? 'light' : 'dark')
      );
    }
  } catch (error) {
    // Error saving data
  }
};

export default storeTheme;
