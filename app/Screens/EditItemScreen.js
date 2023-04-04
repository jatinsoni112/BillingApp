import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import * as Yup from 'yup';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';

import Screen from '../Screen';
import Constraints from '../utils/Constraints';
import {UserContext} from '../context/UserProvider';
import AppTextInput from '../components/AppTextInput';
import ErrorMessages from '../components/ErrorMessages';
import {Button} from 'react-native-paper';
import colors from '../colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(Constraints.NAME_REQUIRED_ERROR),
  price: Yup.string().required(Constraints.PRICE_REQUIRED_ERROR),
});

const EditItem = ({navigation, route}) => {
  const [id, setId] = useState();
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [editmode, seteditmode] = useState(false);

  const {displayName} = useContext(UserContext);

  useEffect(() => {
    // console.log('item ', name);
    if (route.params != undefined) {
      setId(route.params.id);
      setname(route.params.name);
      setprice(route.params.price);
      seteditmode(route.params.editmode);
    }
  }, [route.params]);

  handlepress = () => {
    if (editmode == false) {
      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Items')
        .doc()
        .set({
          ItemName: name,
          Price: price,
        })
        .then(() => {
          console.log('Item added!');
        });
    } else {
      firestore()
        .collection('Users')
        .doc(displayName)
        .collection('Items')
        .doc(id)
        .update({
          ItemName: name,
          Price: price,
        })
        .then(() => {
          console.log('Item updated!');
        });
    }
    navigation.navigate(Constraints.ITEMS);
  };
  return (
    <Screen style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={{name: name, price: price}}
        onSubmit={handlepress}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, touched, setFieldTouched}) => (
          <>
            <AppTextInput
              placeholder={Constraints.NAME}
              iconleft="text"
              onBlur={() => setFieldTouched('name')}
              onChangeText={text => {
                setname(text);
                handleChange('name')(text);
              }}
              value={name}
            />
            <ErrorMessages error={errors.name} visible={touched.name} />
            <AppTextInput
              placeholder={Constraints.PRICE}
              keyboardType="numeric"
              iconleft="currency-inr"
              onBlur={() => setFieldTouched('price')}
              onChangeText={text => {
                setprice(text);
                handleChange('price')(text);
              }}
              value={price}
            />
            <ErrorMessages error={errors.price} visible={touched.price} />
            <View style={styles.button}>
              <Button
                onPress={handleSubmit}
                mode="elevated"
                buttonColor={colors.primary}
                textColor={colors.white}>
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
  button: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
});
export default EditItem;
