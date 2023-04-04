import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import colors from '../colors';
const PaymentCard = ({Ammount, Date, Haste, testId}) => {
  return (
    <View
      testID={testId}
      style={{
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 14,
      }}>
      <Text style={styles.text}>Haste:</Text>
      <Text style={{fontSize: 14, color: colors.black}}>{Haste}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <View style={{flex: 1, marginRight: 8}}>
          <Text style={styles.text}>Date:</Text>
          <Text style={{fontSize: 14, color: colors.black}}>{Date}</Text>
        </View>

        <View style={{flex: 1, marginRight: 8}}>
          <Text style={styles.text}>Ammount:</Text>
          <Text style={{fontSize: 14, color: colors.black}}>{Ammount}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  tableButton: {},
  text: {
    fontSize: 16,
    color: colors.dark,
    backgroundColor: colors.light,
    fontWeight: '400',
  },
});
export default PaymentCard;
