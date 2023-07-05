import { Image } from 'react-native';
import React from 'react';
import ImageLinks from '../../assets/images';
import styles from './AppLogo.styles';

const AppLogo = () => <Image source={ImageLinks.logo} style={styles.logo} />;

export default AppLogo;
