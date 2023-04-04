import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import * as Yup from 'yup';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';

import colors from '../colors';
import Screen from '../Screen';
import Constraints from '../utils/Constraints';
import AppTextInput from '../components/AppTextInput';
import ErrorMessages from '../components/ErrorMessages';
import {UserContext} from '../context/UserProvider';
import {Button} from 'react-native-paper';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(Constraints.NAME_REQUIRED_ERROR),
  mobileNo: Yup.string()
    .required(Constraints.MOBILE_NO_REQUIRED_ERROR)
    .length(10, Constraints.MOBILE_NO_ERROR),

  bill: Yup.string().required(Constraints.BILL_REQUIRED_ERROR),
});

const EditCustomer = ({navigation, route}) => {
  const [Bill, setBIll] = useState('0');
  const [editmode, seteditmode] = useState(false);
  const [id, setId] = useState();
  const [name, setname] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [Users, setUsers] = useState([]);

  const {displayName} = useContext(UserContext);

  useEffect(() => {
    if (route.params != undefined) {
      if (route.params.name) {
        setId(route.params.id);
        setBIll(route.params.billdue);
        setname(route.params.name);
        setmobileNo(route.params.mobile);

        seteditmode(route.params.editmode);

        const subscriber = firestore()
          .collection('Users')
          .doc(displayName)
          .collection('Customers')
          .onSnapshot(querySnapshot => {
            const users = [];

            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });

            const filteredusers = users.filter(data => {
              return data.MobileNo !== route.params.mobile;
            });

            setUsers(filteredusers);
          });

        return () => subscriber();
      }
      if (route.params.Person) {
        setname(route.params.Person);
        setmobileNo(route.params.number);
      }
    }
  }, [route.params]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(displayName)
      .collection('Customers')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
      });

    return () => subscriber();
  }, []);

  const handlepress = () => {
    if (mobileNo != undefined) {
      const usermobileno = Users.find(user => user.MobileNo === mobileNo);

      if (usermobileno) {
        Alert.alert(Constraints.ALERT, Constraints.ALERT_CUSTOMER_EXIST, [
          {
            text: Constraints.OK,
          },
        ]);
      } else {
        if (editmode === false) {
          firestore()
            .collection('Users')
            .doc(displayName)
            .collection('Customers')
            .doc()
            .set({
              Name: name,
              MobileNo: mobileNo,
              BillDue: Bill,
              PreviousBillDate: Constraints.NO_PREVIOUS_BILL,
            })
            .then(() => {
              console.log('User added!');
            })
            .catch(error => {
              console.log('Add user error ', error);
            });
          navigation.navigate(Constraints.CUSTOMER);
        } else {
          firestore()
            .collection('Users')
            .doc(displayName)
            .collection('Customers')
            .doc(id)
            .update({
              Name: name,
              MobileNo: mobileNo,
              BillDue: Bill,
            })
            .then(() => {
              console.log('User updated!');
            })
            .catch(error => {
              console.log('Update user error', error);
            });
          navigation.navigate(Constraints.CUSTOMER);
        }
      }
    }
  };

  const onpressContacts = () => {
    navigation.navigate(Constraints.CONTACTS);
  };
  return (
    <Screen style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={{name: name, mobileNo: mobileNo, bill: Bill}}
        onSubmit={handlepress}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, touched, setFieldTouched}) => (
          <>
            <View style={styles.namecontainer}>
              <View style={styles.contactcontainer}>
                <AppTextInput
                  placeholder={Constraints.NAME}
                  iconleft="account-outline"
                  iconright="contacts"
                  onPressRight={onpressContacts}
                  onBlur={() => setFieldTouched('name')}
                  onChangeText={text => {
                    setname(text);
                    handleChange('name')(text);
                  }}
                  value={name}
                />
              </View>
              <ErrorMessages error={errors.name} visible={touched.name} />
              <AppTextInput
                placeholder={Constraints.MOBILE_NO}
                keyboardType="numeric"
                iconleft="phone"
                onBlur={() => setFieldTouched('mobileNo')}
                onChangeText={text => {
                  setmobileNo(text);
                  handleChange('mobileNo')(text);
                }}
                value={mobileNo}
              />
              <ErrorMessages
                error={errors.mobileNo}
                visible={touched.mobileNo}
              />

              {editmode ? null : (
                <>
                  <AppTextInput
                    placeholder={Constraints.BILL_DUE}
                    keyboardType="numeric"
                    iconleft="file-document"
                    onBlur={() => setFieldTouched('bill')}
                    onChangeText={text => {
                      setBIll(text);
                      handleChange('bill')(text);
                    }}
                    value={Bill}
                  />
                  <ErrorMessages error={errors.bill} visible={touched.bill} />
                </>
              )}
            </View>
            <View style={styles.button}>
              <Button
                onPress={handleSubmit}
                buttonColor={colors.primary}
                textColor={colors.white}
                mode="elevated">
                {Constraints.SUBMIT_CHANGES}
              </Button>
            </View>
          </>
        )}
      </Formik>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  Billtext: {
    fontSize: 20,
  },
  Billtextcontainer: {
    backgroundColor: colors.lightcyan,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 20,
    marginVertical: 10,
    height: 80,
    alignItems: 'center',
  },
  button: {
    flexShrink: 1,
    marginBottom: 15,
  },
  contactcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    backgroundColor: colors.light,
    flex: 1,
    padding: 25,
    marginVertical: 10,
    borderRadius: 20,
  },
  datecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  icon_calendar: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  namecontainer: {
    flex: 1,
  },
});
export default EditCustomer;
