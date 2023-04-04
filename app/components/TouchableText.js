import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../colors';
import AppText from './AppText';
const TouchableText = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && (
        <Icon
          style={styles.icon}
          name={icon}
          size={20}
          color={colors.primary}
        />
      )}
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 7,
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    height: 70,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize:20
  },
});
export default TouchableText;
