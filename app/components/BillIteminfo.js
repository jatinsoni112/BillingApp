import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';

import colors from '../colors';
import AppText from './AppText';

const BillIteminfo = ({
  name,
  price,
  quantity,
  onPressDelete,
  onPressEdit,
  testID,
}) => {
  const total = quantity * price;
  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.textcontainer}>
        <AppText>{name}</AppText>
        <AppText>{price}</AppText>
        <AppText>{quantity}</AppText>
        <AppText>{total}</AppText>
      </View>
      <View style={styles.iconcontainer}>
        <IconButton
          icon="file-edit"
          size={40}
          iconColor={colors.primary}
          onPress={onPressEdit}
        />

        <IconButton
          icon="trash-can-outline"
          size={40}
          onPress={onPressDelete}
          iconColor={colors.red}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  delete: {
    backgroundColor: colors.danger,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    backgroundColor: colors.lightblue,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer: {
    alignItems: 'baseline',
    paddingVertical: 10,
    borderBottomColor: colors.medium,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
export default BillIteminfo;
