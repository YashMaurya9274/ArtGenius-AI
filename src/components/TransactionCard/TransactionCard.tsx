import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
  transaction: TransactionData;
  theme: string;
};

const TransactionCard = ({ transaction, theme }: Props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'gray',
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          color: theme === 'dark' ? 'white' : 'black',
        }}
      >
        {transaction.name}
      </Text>
      <Text
        style={{
          color: theme === 'dark' ? 'white' : 'black',
        }}
      >
        {transaction.transactionId}
      </Text>
      <Text
        style={{
          color: theme === 'dark' ? 'white' : 'black',
        }}
      >
        {new Date(transaction.date).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionCard;
