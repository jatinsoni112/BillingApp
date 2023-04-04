import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import colors from '../colors';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import Constraints from '../utils/Constraints';
import {UserContext} from '../context/UserProvider';
import {DateContext} from '../context/DateProvider';
import {Button} from 'react-native-paper';

const PayBill = ({navigation, route}) => {
  const [Name, setName] = useState();
  const [MobileNo, setMobileNo] = useState();
  const [BillDue, setBillDue] = useState();
  const [key, setKey] = useState();
  const [Haste, setHaste] = useState();
  const [Ammount, setAmmount] = useState(0);

  const {displayName} = useContext(UserContext);

  const {billdate} = useContext(DateContext);

  useEffect(() => {
    if (route.params != undefined) {
      setName(route.params.name);
      setMobileNo(route.params.mobileno);
      setBillDue(route.params.billdue);
      setKey(route.params.key);
      console.log(key);
    }
  }, [route.params]);
  // console.log(route)
  const paybill = () => {
    //const billdate = moment(new Date()).format('YYYYMMDDHHMMSS');
    if (BillDue !== 0) {
      if (Ammount && Haste) {
        const remainingamount = parseInt(BillDue) - parseInt(Ammount);
        if (remainingamount >= 0) {
          firestore()
            .collection('Users')
            .doc(displayName)
            .collection('Customers')
            .doc(key)
            .update({
              BillDue: remainingamount,
            })
            .then(() => {
              console.log('User added!');
            })
            .catch(error => {
              console.log('Add user error ', error);
            });

          firestore()
            .collection('Users')
            .doc(displayName)
            .collection('Payment')
            .doc()
            .set({
              CustomerName: Name,
              CustomerId: key,
              MobileNo: MobileNo,
              Date: billdate,
              PaymentDate: new Date().toLocaleDateString(),
              Ammount: Ammount,
              Haste: Haste,
            });
          navigation.goBack();
        } else
          Alert.alert(Constraints.ALERT, Constraints.ALERT_LESS_AMMOUNT, [
            {
              text: Constraints.OK,
            },
          ]);
      } else
        Alert.alert(Constraints.ALERT, Constraints.ALERT_HASTE, [
          {
            text: Constraints.OK,
          },
        ]);
    } else
      Alert.alert(Constraints.ALERT, Constraints.ALERT_WRONG_CUSTOMER, [
        {
          text: Constraints.OK,
        },
      ]);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.innercontainer}>
        <View style={{flex: 1, marginBottom: 20}}>
          <View style={styles.fieldContainer}>
            <AppText style={styles.field}>{Constraints.CUSTOMER}:</AppText>
            <AppText style={styles.field}>{Name}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.field}>{Constraints.MOBILE_NO}:</AppText>
            <AppText style={styles.field}>{MobileNo}</AppText>
          </View>
          <View style={styles.fieldContainer}>
            <AppText style={styles.field}>{Constraints.BILL_DUE}:</AppText>
            <AppText style={styles.field}>{BillDue}</AppText>
          </View>
        </View>
        <View style={styles.textinput}>
          <AppTextInput
            keyboardType="numeric"
            placeholder={Constraints.AMMOUNT_TO_PAY}
            onChangeText={text => setAmmount(text)}
            value={Ammount}
          />
          <AppTextInput
            placeholder={Constraints.HASTE}
            onChangeText={text => setHaste(text)}
            value={Haste}
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        style={{flexShrink: 1}}
        onPress={paybill}
        mode="elevated"
        buttonColor={colors.primary}
        textColor={colors.white}>
        {Constraints.PAY_BILL}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
    margin: 15,
  },
  field: {
    fontSize: 20,
    margin: 10,
  },
  innercontainer: {
    flex: 1,
  },
  textinput: {
    flex: 1,
  },
});

export default PayBill;
