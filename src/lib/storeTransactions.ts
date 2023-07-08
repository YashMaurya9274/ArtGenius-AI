import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTransactions = async (data: TransactionData[]) => {
  await AsyncStorage.setItem('transactionsHistory', JSON.stringify(data));
};

export default storeTransactions;
