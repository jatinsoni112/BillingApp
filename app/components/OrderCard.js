import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {IconButton} from 'react-native-paper';

import colors from '../colors';

const OrderCard = ({Haste, OrderDate, Total, onPress,testId}) => {
  return (
    <View
    testID={testId}
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderRadius: 14,
      }}>
      <View
        style={{
          flex: 1,
          marginRight: 8,
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
            <Text style={{fontSize: 14, color: colors.black}}>{OrderDate}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.text}>Total:</Text>
            <Text style={{fontSize: 14, color: colors.black}}>{Total}</Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{flex: 1, marginRight: 8}}>
          <Text style={styles.text}>Items</Text>
          <Text style={{fontSize: 14}}></Text>
        </View>

        <IconButton
          icon="eye"
          mode="contained"
          size={20}
          containerColor={colors.light}
          iconColor={colors.dark}
          onPress={onPress}
        />
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
    fontWeight: 'bold',
  },
});
export default OrderCard;
