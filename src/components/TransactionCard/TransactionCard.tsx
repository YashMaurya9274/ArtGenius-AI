import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import ImageLinks from '../../assets/images';

type Props = {
  transaction: TransactionData;
  theme: string;
};

const TransactionCard = ({ transaction, theme }: Props) => {
  const openTransaction = (transacId: string) => {
    Linking.openURL(`https://testnet.flowscan.org/transaction/${transacId}`);
  };

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme === 'dark' ? '#383838' : '#F1F1F1',
        marginTop: 15,
        padding: 10,
        borderRadius: 20,
      }}
      onPress={() => openTransaction(transaction.transactionId)}
    >
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 10,
          backgroundColor: '#00ef8b',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={ImageLinks.flowLogo} style={{ height: 40, width: 40 }} />
      </View>
      <View
        style={{
          marginLeft: 10,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: theme === 'dark' ? '#929292' : 'gray',
              fontSize: 18,
              marginBottom: 10,
              fontWeight: '500',
            }}
          >
            {transaction.name}
          </Text>
          <Text
            style={{
              color: theme === 'dark' ? '#929292' : 'gray',
              fontSize: 12,
              marginBottom: 10,
              // fontWeight: '500',
              // marginRight: 10,
            }}
          >
            {new Date(transaction.date).toLocaleString()}
          </Text>
        </View>
        <Text
          style={{
            color: theme === 'dark' ? '#BBBBBB' : '#808080',
            maxWidth: '100%',
            fontSize: 15,
          }}
        >
          {transaction.transactionId.slice(0, 30)}...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;
