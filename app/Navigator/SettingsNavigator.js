import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Constraints from '../utils/Constraints';
import SettingsScreen from '../Screens/SettingsScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Constraints.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={Constraints.RESET_PASSWORD} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
export default SettingsNavigator;
