import AsyncStorage from '@react-native-async-storage/async-storage';

const retrieveTransactions = async () => {
  const res = await AsyncStorage.getItem('transactionsHistory');
  console.log('get transaxtion', res);
  if (res) return JSON.parse(res);
  else return [];
};

export default retrieveTransactions;
