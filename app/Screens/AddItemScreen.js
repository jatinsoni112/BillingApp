import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import colors from '../colors';
import Screen from '../Screen';
import AppText from '../components/AppText';
import Constraints from '../utils/Constraints';
import {UserContext} from '../context/UserProvider';

const AddItem = ({navigation, route}) => {
  const [value, setValue] = useState(null);
  const [Items, setItems] = useState();
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState();
  const [id, setId] = useState(0);
  const [editmode, seteditmode] = useState(false);

  const {displayName} = useContext(UserContext);

  useEffect(() => {
    if (route.params != undefined) {
      if (route.params.itemdata != undefined) {
        setId(route.params.itemdata[0].id);
        setprice(route.params.itemdata[0].price);
        setValue(route.params.itemdata[0].value);
        setquantity(route.params.itemdata[0].quantity);
      } else setId(route.params.id);
      seteditmode(route.params.editmode);
    } else setId(0);
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(displayName)
      .collection('Items')
      .onSnapshot(querySnapshot => {
        const items = [];

        querySnapshot.forEach(documentSnapshot => {
          items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setItems(items);
      });
    return () => subscriber();
  }, []);

  const handeladdpress = () => {
    if (value && quantity) {
      navigation.navigate(Constraints.BILL, {
        item: {id, value, price, quantity},
      });
    } else {
      if (value)
        Alert.alert(Constraints.ALERT, Constraints.ALERT_ADD_QUANTITY, [
          {
            text: Constraints.OK,
          },
        ]);
      else
        Alert.alert(Constraints.ALERT, Constraints.ALERT_ADD_ITEM, [
          {
            text: Constraints.OK,
          },
        ]);
    }
  };
  const handelcancelpress = () => {
    navigation.goBack();
  };

  return (
    <Screen style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.textstyle}
        iconColor={colors.dark}
        data={Items}
        valueField="ItemName"
        value={value}
        labelField="ItemName"
        onChange={item => {
          setValue(item.ItemName);
          setprice(item.Price);
          setquantity('1');
        }}
        search
        searchPlaceholder={Constraints.SEARCH}
        placeholder={Constraints.SELECT_ITEM}
      />
      <View style={styles.totalcontainer}>
        <View style={styles.quantitycontainer}>
          <View style={styles.field}>
            {!price ? (
              <AppText style={styles.price}>{Constraints.PRICE}</AppText>
            ) : (
              <AppText>{price} </AppText>
            )}
          </View>
          <TextInput
            testID="quantity_textinput"
            style={[styles.field, {marginLeft: 20}]}
            placeholder={Constraints.QUANTITY}
            keyboardType="numeric"
            onChangeText={text => {
              setquantity(text);
            }}
            value={quantity}
          />
        </View>
        <View style={styles.totalfield}>
          <AppText style={styles.total}>{Constraints.TOTAL}</AppText>
          {!quantity ? (
            <AppText></AppText>
          ) : (
            <AppText>: {price * quantity}</AppText>
          )}
        </View>
      </View>
      <View style={styles.button}>
        {editmode ? null : (
          <Button
            testID="cancel-button"
            mode="elevated"
            buttonColor={colors.primary}
            style={styles.cancel}
            textColor={colors.white}
            onPress={handelcancelpress}>
            {Constraints.CANCEL}
          </Button>
        )}
        <Button
          testID="add-button"
          mode="elevated"
          style={styles.add}
          buttonColor={colors.primary}
          textColor={colors.white}
          onPress={handeladdpress}>
          {Constraints.ADD}
        </Button>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  add: {
    flex: 0.45,
  },
  button: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancel: {
    flex: 0.45,
  },
  container: {
    padding: 15,
  },
  dropdown: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.medium,
    flexShrink: 1,
  },
  field: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    fontSize: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.medium,
  },
  price: {
    color: colors.medium,
    fontSize: 16,
    fontWeight: '400',
  },
  quantitycontainer: {
    flexDirection: 'row',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.dark,
  },
  total: {
    color: colors.medium,
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalfield: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
    width: '100%',
  },
  textstyle: {
    fontSize: 16,
    color: colors.dark,
  },
  totalcontainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
export default AddItem;
