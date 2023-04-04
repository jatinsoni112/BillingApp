import React from 'react';
import {View, StyleSheet} from 'react-native';

import AppText from './AppText';

const ItemField = ({title, value, style}) => {
  return (
    <View style={[styles.container, style]}>
      <AppText>{title} : </AppText>
      <AppText style={styles.value}>{value}</AppText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 15,
  },
});
export default ItemField;
