import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import TransactionCard from '../TransactionCard/TransactionCard';
import styles from './TransactionHistory.styles';

type Props = {
  theme: string;
  transactions: TransactionData[];
};

const TransactionHistory = ({ theme, transactions }: Props) => {
  return (
    <View>
      {transactions?.length === 0 ? (
        <Text style={styles.noTransactionsText}>No Transactions Made!</Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 10, padding: 5 }}>
          {transactions.map((transaction: TransactionData) => (
            <TransactionCard transaction={transaction} theme={theme} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TransactionHistory;
