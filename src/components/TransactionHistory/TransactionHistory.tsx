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
    <View style={{ flex: 1 }}>
      {transactions?.length === 0 ? (
        <Text style={styles.noTransactionsText}>No Transactions Made!</Text>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 10, padding: 5 }}>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 10,
              fontSize: 14,
              color: 'gray',
            }}
          >
            Your Transactions History..!
          </Text>
          {transactions.map((transaction: TransactionData, index: number) => (
            <TransactionCard key={index} transaction={transaction} theme={theme} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TransactionHistory;
