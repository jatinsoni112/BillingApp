import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';

import Screen from '../Screen';
import colors from '../colors';
import AppText from '../components/AppText';

import Constraints from '../utils/Constraints';
import AppTextInput from '../components/AppTextInput';
import BillIteminfo from '../components/BillIteminfo';

import {UserContext} from '../context/UserProvider';
import {DateContext} from '../context/DateProvider';
import {Button, IconButton} from 'react-native-paper';

const BillingScreen = ({navigation, route}) => {
  const [grantTotal, setGrantTotal] = useState(0);
  const [id, setId] = useState(0);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [person, setperson] = useState('');
  const [haste, sethaste] = useState();
  const [key, setKey] = useState();
  const [mobileNo, setmobileNo] = useState('');
  const [editmode, seteditmode] = useState(false);

  const date = new Date().toLocaleDateString();

  const {displayName} = useContext(UserContext);
  const {billdate} = useContext(DateContext);

  useEffect(() => {
    if (route.params != undefined) {
      if (id === route.params.item.id) {
        setItems([...items, route.params.item]);
        const Id = parseInt(route.params.item.id) + parseInt(1);
        setId(Id);
        const total = route.params.item.price * route.params.item.quantity;
        const gt = parseInt(total) + parseInt(grantTotal);
        setGrantTotal(gt);
      }
    }
  }, [route.params]);
  useEffect(() => {
    if (displayName != undefined) {
      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Customers')
        .onSnapshot(querySnapshot => {
          const users = [];

          querySnapshot.forEach(documentSnapshot => {
            console.log('customers ', documentSnapshot.data());
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setUsers(users);
        });
    }
  }, [displayName]);

  const handleaddpress = () => {
    navigation.navigate(Constraints.ADD_ITEM, {id});
  };

  const handlepress = () => {
    if (items.length == 0)
      Alert.alert(Constraints.ALERT, Constraints.ALERT_ADD_ITEM, [
        {
          text: Constraints.OK,
        },
      ]);
    else if (!person)
      Alert.alert(Constraints.ALERT, Constraints.ALERT_ADD_PERSON, [
        {
          text: Constraints.OK,
        },
      ]);
    else if (!haste)
      Alert.alert(Constraints.ALERT, Constraints.ALERT_ADD_HASTE, [
        {
          text: Constraints.OK,
        },
      ]);
    else if (person && items.length !== 0) {
      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Orders')
        .doc()
        .set({
          CustomerName: person,
          CustomerId: key,
          MobileNo: mobileNo,
          Date: billdate,
          OrderDate: date,
          Ammount: grantTotal,
          Haste: haste,
          Items: items,
        })
        .then(() => {
          console.log('User added!', id);
        })
        .catch(error => {
          console.log('Add user error ', error);
        });

      const totalBillDue = firestore.FieldValue.increment(parseInt(grantTotal));
      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Customers')
        .doc(key)
        .update({
          BillDue: totalBillDue,
        })
        .then(() => {
          console.log('Info added!');
        })
        .catch(error => {
          console.log(error);
        });
      setGrantTotal(0);
      sethaste('');
      setItems([]);
      setperson('');
    }
  };

  const onPressDelete = (id, price, quantity) => {
    setItems(current =>
      current.filter(item => {
        return item.id !== id;
      }),
    );
    const Total = parseInt(price) * parseInt(quantity);
    const gt = parseInt(grantTotal) - parseInt(Total);
    setGrantTotal(gt);
  };
  const onPressEdit = (id, price, quantity) => {
    seteditmode(true);

    if (editmode == true) {
      const remainingitems = items.filter(item => {
        return item.id != id;
      });
      setItems(remainingitems);
      setId(id);
      const Total = parseInt(price) * parseInt(quantity);
      const gt = parseInt(grantTotal) - parseInt(Total);
      setGrantTotal(gt);
      const itemdata = items.filter(item => {
        return item.id === id;
      });
      navigation.navigate(Constraints.ADD_ITEM, {itemdata, editmode});
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={{flexShrink: 1}}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.textstyle}
          iconColor={colors.dark}
          data={users}
          valueField="Name"
          value={person}
          labelField="Name"
          onChange={person => {
            setperson(person.Name);
            setKey(person.key);
            setmobileNo(person.MobileNo);
          }}
          search
          searchPlaceholder={Constraints.SEARCH}
          placeholder={Constraints.SELECT_PERSON}
        />
      </View>

      <FlatList
        style={{flex: 1}}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={{backgroundColor: 'white'}}>
            <View
              testID="billingScreen_FlatlistHeader_TestId"
              style={styles.list}>
              <AppText style={styles.heading}>{Constraints.ITEM_NAME}</AppText>
              <AppText style={styles.heading}>{Constraints.PRICE}</AppText>
              <AppText style={styles.heading}>{Constraints.QUANTITY}</AppText>
              <AppText style={styles.heading}>{Constraints.TOTAL}</AppText>
            </View>
          </View>
        }
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={info => (
          <BillIteminfo
            testID={'BillingScreen_itemcard_testId' + info.index}
            name={info.item.value}
            price={info.item.price}
            quantity={info.item.quantity}
            onPressEdit={() =>
              onPressEdit(info.item.id, info.item.price, info.item.quantity)
            }
            onPressDelete={() =>
              onPressDelete(info.item.id, info.item.price, info.item.quantity)
            }
          />
        )}
      />

      <View
        style={{
          flexShrink: 1,
          marginTop: 10,
          marginBottom: 15,
        }}>
        <View style={styles.hasterow}>
          <View style={styles.iconcontainer}>
            <AppTextInput
              style={[styles.field, {backgroundColor: colors.light}]}
              placeholder={Constraints.HASTE}
              onChangeText={text => {
                sethaste(text);
              }}
              onBlur={() => {}}
              value={haste}
            />
            <IconButton
              style={styles.icon}
              icon="plus-circle"
              size={50}
              iconColor={colors.primary}
              onPress={handleaddpress}
            />
          </View>
        </View>
        <View style={styles.datecontainer}>
          <View style={styles.date}>
            <AppText>{date}</AppText>
          </View>
          <View style={styles.total}>
            <AppText style={styles.grandtotal}>{Constraints.TOTAL}: </AppText>
            <AppText>{grantTotal ? grantTotal : 0}</AppText>
          </View>
        </View>
        <Button
          buttonColor={colors.primary}
          textColor={colors.white}
          mode="elevated"
          onPress={handlepress}>
          {Constraints.SAVE}
        </Button>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  additemtext: {
    marginRight: 10,
    fontSize: 22,
  },

  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
  },

  datecontainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dropdown: {
    padding: 10,
    marginBottom: 16,
    height: 50,
    borderWidth: 1,
    alignItems: 'baseline',
    borderColor: colors.medium,
    borderRadius: 30,
  },
  field: {
    flexShrink: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 6,
  },

  header: {
    fontSize: 26,
    flex: 1,
  },
  hasterow: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'stretch',
  },

  headercontainer: {
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: colors.light,
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },

  heading: {
    padding: 10,
    paddingRight: 10,
  },
  iconcontainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  iteminfocontainer: {
    marginTop: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.medium,
    borderRadius: 10,
  },
  iteminfototal: {
    borderTopWidth: 1,
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  list: {
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.medium,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.dark,
  },
  date: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textstyle: {
    fontSize: 16,
    color: colors.dark,
  },
  total: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grandtotal: {
    color: colors.medium,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default BillingScreen;
