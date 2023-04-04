import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import Screen from '../Screen';
import AppTextInput from '../components/AppTextInput';
import ErrorMessages from '../components/ErrorMessages';
import Constraints from '../utils/Constraints';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-paper';
import colors from '../colors';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(Constraints.EMAIL_REQUIRED_ERROR)
    .email(Constraints.EMAIL_VALIDATION_ERROR),
  password: Yup.string()
    .required(Constraints.PASSWORD_REQUIRED_ERROR)
    .min(6, Constraints.PASSWORD_MIN_ERROR),
  username: Yup.string().required(Constraints.NAME_REQUIRED_ERROR),
});
const RegisterScreen = ({navigation}) => {
  const [email, setemail] = useState();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState();

  const createUser = async (email, password) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          // Update the user's display name with the username
          console.log('hi user ', user);
          user.user
            .updateProfile({
              displayName: username,
            })
            .then(() => {
              // Update successful
              console.log('Display name updated successfully!');
            })
            .catch(error => {
              // An error occurred
              console.error(error);
            });
        })
        .catch(error => {
          // An error occurred
          console.error(error);
        });
      setloading(false);
    } catch (error) {
      console.log(error);
      let errorMessage = 'An error occurred';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = Constraints.ERROR_USER_EXIST;
          break;
        case 'auth/weak-password':
          errorMessage = Constraints.ERROR_WEAK_PASSWORD;
          break;
        case 'auth/invalid-email':
          errorMessage = Constraints.EMAIL_VALIDATION_ERROR;
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
    createUser(email, password);
  };
  return (
    <Screen style={styles.container}>
      <Formik
        initialValues={{email: '', password: '', username: ''}}
        onSubmit={handlepress}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, touched, setFieldTouched}) => (
          <>
            <KeyboardAwareScrollView>
              <AppTextInput
                icon="email"
                placeholder={Constraints.EMAIL}
                keyboartType="email-address"
                onBlur={() => setFieldTouched('email')}
                onChangeText={text => {
                  handleChange('email')(text);
                  setemail(text);
                }}
              />
              <ErrorMessages error={errors.email} visible={touched.email} />
              <AppTextInput
                icon="account"
                placeholder={Constraints.NAME}
                onBlur={() => setFieldTouched('username')}
                onChangeText={text => {
                  handleChange('username')(text);
                  setusername(text);
                }}
              />
              <ErrorMessages
                error={errors.username}
                visible={touched.username}
              />
              <AppTextInput
                icon="lock"
                placeholder={Constraints.PASSWORD}
                secureTextEntry
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

              {loading ? <ActivityIndicator size="large" /> : <View></View>}
            </KeyboardAwareScrollView>
            <View style={styles.button}>
              <Button
                onPress={handleSubmit}
                mode="elevated"
                buttonColor={colors.primary}
                textColor={colors.white}>
                {Constraints.REGISTER}
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
export default RegisterScreen;
