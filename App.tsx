import React from 'react';
import RootNavigator from './src/navigator/RootNavigator';
import './flow/config';
import 'react-native-url-polyfill/auto';
import '@thirdweb-dev/react-native-compat';

const App = () => {
  return <RootNavigator />;
};

export default App;
