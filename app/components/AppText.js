import React from 'react';
import {StyleSheet, Text} from 'react-native';

import colors from '../colors';

function AppText({children, style, ...otherProps}) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    color: colors.dark,
    fontSize: 18,
  },
});

export default AppText;
