import React from 'react';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import colors from '../colors';
import AppText from './AppText';
import {useNetInfo} from '@react-native-community/netinfo';
import Constraints from '../utils/Constraints';

const OfflineNotice = props => {
  const NetInfo = useNetInfo();

  if (NetInfo.type !== 'unknown' && NetInfo.isInternetReachable === false) {
    return (
      <TouchableOpacity style={styles.container}>
        <AppText style={styles.text}>{Constraints.ERROR_NO_INTERNET}</AppText>
      </TouchableOpacity>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 50,
    elevation: Platform.OS === 'android' ? 1 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 10,
  },
  text: {
    color: colors.white,
  },
});
export default OfflineNotice;
