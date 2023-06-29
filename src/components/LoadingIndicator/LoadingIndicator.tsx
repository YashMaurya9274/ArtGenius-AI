import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORCODE } from '../../enums';

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      size="small"
      color={COLORCODE.PRIMARY}
      style={{
        marginTop: 40,
      }}
    />
  );
};

export default LoadingIndicator;
