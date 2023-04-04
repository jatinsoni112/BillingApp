import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import colors from './colors';

function Screen({children, style}) {
  return <SafeAreaView style={[styles.screen, style]}>
    {children}
    </SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default Screen;
