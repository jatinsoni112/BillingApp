import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';

import colors from '../colors';
import ItemField from '../components/ItemField';
import Constraints from '../utils/Constraints';

const ItemInfo = ({name, rate, onPress_Edit, onPress_Delete, testID}) => {
  const [IsVisible, setIsVisible] = useState(false);

  const handleModal = () => {
    setIsVisible(!IsVisible);
  };
  return (
    <>
      <TouchableOpacity
        testID={testID}
        style={styles.itemcontainer}
        onPress={() => {
          setIsVisible(!IsVisible);
        }}>
        <ItemField title={Constraints.NAME} value={name} />
        <ItemField title={Constraints.PRICE} value={rate} />
      </TouchableOpacity>
      {IsVisible && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <IconButton
            testID="itemlist_iteminfo_Edit_testid"
            icon="file-edit"
            size={30}
            containerColor={colors.primary}
            iconColor={colors.white}
            onPress={() => {
              onPress_Edit();
              setIsVisible(!IsVisible);
            }}
          />
          <IconButton
            testID="itemlist_iteminfo_Delete_testid"
            icon="trash-can-outline"
            size={30}
            iconColor={colors.white}
            containerColor={colors.red}
            onPress={() => {
              onPress_Delete();
              setIsVisible(!IsVisible);
            }}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  itemcontainer: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: colors.white,
    elevation: 7,
    marginBottom: 10,
    padding: 10,
  },
});
export default ItemInfo;
