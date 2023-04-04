import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../colors';
import ItemField from './ItemField';
import Constraints from '../utils/Constraints';
import {Button, IconButton} from 'react-native-paper';

const CustomerInfo = ({
  testID,
  name,
  phone,
  date,
  image,
  onPress_Createbill,
  onPress_Paybill,
  onPress_Edit,
  onPress_Delete,
  onPress_ViewOrders,
  onPress,
}) => {
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
          onPress();
          handleModal();
        }}>
        <View style={styles.titleContainer}>
          <ItemField title={Constraints.NAME} value={name} />
          <ItemField title={Constraints.MOBILE_NO} value={phone} />
          <ItemField title={Constraints.PREVIOUS_BILL} value={date} />
          <ItemField title={Constraints.BILL_DUE} value={image} />
        </View>
      </TouchableOpacity>
      <Modal visible={IsVisible} transparent>
        <Pressable
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          onPress={handleModal}></Pressable>

        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: colors.light,
            flexShrink: 1,
            borderRadius: 30,
            padding: 20,
            marginHorizontal: 20,
            marginTop: 'auto',
            marginBottom: 'auto',
            elevation: 10,
          }}>
          <IconButton
          testID='closeButton_testId'
            style={styles.closeIcon}
            icon="close"
            size={40}
            iconColor={colors.dark}
            onPress={handleModal}
          />
          <View style={styles.buttoncontainer}>
            <Button
              buttonColor={colors.primary}
              textColor={colors.white}
              style={styles.createbill}
              mode="elevated"
              onPress={() => {
                onPress_Createbill();
                handleModal();
              }}>
              {Constraints.CREATE_BILL}
            </Button>
            <Button
              buttonColor={colors.primary}
              textColor={colors.white}
              style={styles.paybill}
              mode="elevated"
              onPress={() => {
                onPress_Paybill();
                handleModal();
              }}>
              {Constraints.PAY_BILL}
            </Button>
          </View>

          <Button
            buttonColor={colors.primary}
            textColor={colors.white}
            mode="elevated"
            style={{margin: 10, width: '100%'}}
            onPress={() => {
              onPress_ViewOrders();
              handleModal();
            }}>
            {Constraints.VIEW_ORDERS}
          </Button>

          <View style={styles.iconcontainer}>
            <IconButton
              testID="editButton_testId"
              icon="file-edit"
              size={40}
              containerColor={colors.primary}
              iconColor={colors.white}
              onPress={() => {
                onPress_Edit();
                handleModal();
              }}
            />
            <IconButton
              testID="deleteButton_testId"
              icon="trash-can-outline"
              size={40}
              iconColor={colors.white}
              containerColor={colors.red}
              onPress={() => {
                onPress_Delete();
                handleModal();
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  itemcontainer: {
    margin: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 7,
    marginBottom: 10,
    flex: 1,
  },
  buttoncontainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  iconcontainer: {
    flexShrink: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  createbill: {
    marginRight: 10,
    flex: 1,
  },
  paybill: {
    marginLeft: 10,
    flex: 1,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
    padding: 10,
    flex: 1,
  },
  modalView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.light,
    flexShrink: 1,
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    elevation: 10,
  },
  closeIcon: {
    marginLeft: 'auto',
    marginTop: -10,
    marginRight: -10,
    marginBottom: 5,
    flexGrow: 1,
  },
});
export default CustomerInfo;
