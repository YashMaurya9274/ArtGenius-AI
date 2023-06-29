import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = (props: any) => {
  return (
    // @ts-ignore
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={['#579CFF', '#E157FF', '#FF8557']}
        // colors={['blue', 'red', 'orange']}
        // colors={['#1D51DF', 'pink', '#DF1D1D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
