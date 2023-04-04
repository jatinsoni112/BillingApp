import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppNavigator from '../Navigator/AppNavigator';
import RegisterScreen from '../Screens/RegisterScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import Constraints from '../utils/Constraints';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name={Constraints.LOGIN} component={LoginScreen} />
    <Stack.Screen name={Constraints.REGISTER} component={RegisterScreen} />
    <Stack.Screen
      name="Home"
      component={AppNavigator}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
export default AuthNavigator;
