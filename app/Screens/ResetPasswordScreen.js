import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import Screen from '../Screen';
import Constraints from '../utils/Constraints';
import AppTextInput from '../components/AppTextInput';
import ErrorMessages from '../components/ErrorMessages';
import {Button} from 'react-native-paper';
import colors from '../colors';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(Constraints.EMAIL_REQUIRED_ERROR)
    .email()
    .label('Email'),
  password: Yup.string()
    .required(Constraints.PASSWORD_REQUIRED_ERROR)
    .min(6, Constraints.PASSWORD_MIN_ERROR)
    .label('Password'),
});

const ResetPasswordScreen = ({navigation}) => {
  const [password, setpassword] = useState();

  const handlepress = () => {
    auth().currentUser.updatePassword(password);
    navigation.navigate(Constraints.SETTINGS);
  };
  return (
    <Screen style={styles.container}>
      <Formik
        initialValues={{password: ''}}
        onSubmit={handlepress}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, touched, setFieldTouched}) => (
          <>
            <View style={{flex: 1}}>
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={Constraints.NEW_PASSWORD}
                icon="lock"
                onBlur={() => setFieldTouched('password')}
                onChangeText={text => {
                  handleChange('password')(text);
                  setpassword(text);
                }}
              />
              <ErrorMessages
                error={errors.password}
                visible={touched.password}
              />
            </View>
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

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    flexShrink: 1,
    marginBottom: 15,
  },
});
