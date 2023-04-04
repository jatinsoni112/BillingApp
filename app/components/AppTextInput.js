import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../colors';

function AppTextInput({
  iconleft,
  iconright,
  onPressLeft,
  onPressRight,
  style,
  width = '100%',
  ...otherProps
}) {
  return (
    <View testID='input' style={[styles.container, style, {width}]}>
      {iconleft && (
        <Icon testID='left-button'
          onPress={onPressLeft}
          style={styles.icon}
          name={iconleft}
          size={20}
          color={colors.medium}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={styles.text}
        {...otherProps}
      />
      {iconright && (
        <Icon testID='right-button'
          onPress={onPressRight}
          style={styles.icon}
          name={iconright}
          size={30}
          color={colors.medium}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: colors.dark,
    fontSize: 20
  },
});

export default AppTextInput;
