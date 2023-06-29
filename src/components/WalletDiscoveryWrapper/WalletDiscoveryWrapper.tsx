import { View } from 'react-native';

export default function WalletDiscoveryWrapper({ children }: { children: any }) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
      }}
    >
      {children}
    </View>
  );
}
