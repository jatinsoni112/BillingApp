import React, {useContext, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';

import * as Yup from 'yup';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';

import Screen from '../Screen';
import AppTextInput from '../components/AppTextInput';
import ErrorMessages from '../components/ErrorMessages';
import Constraints from '../utils/Constraints';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {UserContext} from '../context/UserProvider';
import {Button} from 'react-native-paper';
import colors from '../colors';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(Constraints.EMAIL_REQUIRED_ERROR)
    .email(Constraints.EMAIL_VALIDATION_ERROR),
  password: Yup.string()
    .required(Constraints.PASSWORD_REQUIRED_ERROR)
    .min(6, Constraints.PASSWORD_MIN_ERROR),
});
const LoginScreen = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState();

  const {setDisplayName} = useContext(UserContext);

  const signin = async (email, password) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setDisplayName(auth().currentUser.displayName);
        });
      setloading(false);
    } catch (error) {
      console.log(error);
      let errorMessage = 'An error occurred';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = Constraints.EMAIL_VALIDATION_ERROR;
          break;
        case 'auth/user-not-found':
          errorMessage = Constraints.ERROR_WRONG_EMAIL;
          break;
        case 'auth/wrong-password':
          errorMessage = Constraints.ERROR_WRONG_PASSWORD;
          break;
        default:
          break;
      }
      Alert.alert(Constraints.ALERT, errorMessage, [
        {
          text: Constraints.OK,
        },
      ]);
      setloading(false);
    }
  };
  const handlepress = () => {
    setloading(true);
      
  };
  return (
    <Screen style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={handlepress}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, touched, setFieldTouched}) => (
          <>
            <KeyboardAwareScrollView style={{flex: 1}}>
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                iconleft="email"
                keyboartType="email-address"
                placeholder={Constraints.EMAIL}
                onBlur={() => setFieldTouched('email')}
                onChangeText={text => {
                  handleChange('email')(text);
                  setemail(text);
                }}
              />
              <ErrorMessages error={errors.email} visible={touched.email} />
              <AppTextInput
                autoCapitalize="none"
                autoCorrect={false}
                iconleft="lock"
                placeholder={Constraints.PASSWORD}
                onBlur={() => setFieldTouched('password')}
                onChangeText={text => {
                  handleChange('password')(text);
                  setpassword(text);
                }}
                secureTextEntry
              />
              <ErrorMessages
                error={errors.password}
                visible={touched.password}
              />

              {loading ? <ActivityIndicator size="large" /> : <View></View>}
            </KeyboardAwareScrollView>

            <View style={styles.button}>
              <Button
                onPress={handleSubmit}
                mode="elevated"
                buttonColor={colors.primary}
                textColor={colors.white}>
                {Constraints.LOGIN}
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  button: {
    flexShrink: 1,
    marginBottom: 15,
  },
});
export default LoginScreen;
