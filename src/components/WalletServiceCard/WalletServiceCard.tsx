import { Service } from '@onflow/typedefs';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import retrieveTheme from '../../lib/retrieveTheme';
import { COLORCODE, DARK_COLORS, LIGHT_COLORS } from '../../enums';
import { Button } from 'react-native-paper';
import styles from './WalletServiceCard.styles';

export default function WalletDiscoveryServiceCard({
  service,
  onPress,
}: {
  service: Service;
  onPress: () => void;
}) {
  const provider: any = service.provider;
  const name = provider?.name || 'Unknown';
  const icon = provider?.icon || 'https://placekitten.com/200/200';
  const [theme, setTheme] = useState<string>('');

  const fetchTheme = async () => {
    const themeFromStorage = await retrieveTheme();
    if (themeFromStorage) {
      setTheme(themeFromStorage);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  return (
    <View style={styles.serviceContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.serviceButton,
          {
            backgroundColor: theme === 'dark' ? '#000F39' : 'white',
          },
        ]}
      >
        <Image source={{ uri: icon }} style={styles.icon} />
        <Text
          style={[
            styles.serviceText,
            {
              color: theme === 'dark' ? DARK_COLORS.LOGIN_TEXT : LIGHT_COLORS.LOGIN_TEXT,
            },
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
