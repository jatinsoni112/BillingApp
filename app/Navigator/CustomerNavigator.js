import React from 'react';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from '../colors';
import CustomerListScreen from '../Screens/CustomerListScreen';
import EditCustomerScreen from '../Screens/EditCustomerScreen';
import PayBill from '../Screens/PayBillScreen';
import Constraints from '../utils/Constraints';
import ContactListScreen from '../Screens/ContactListScreen';
import ViewOrders from '../Screens/ViewOrdersScreen';
import {IconButton} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const CustomerNavigator = () => {
  const navigation = useNavigation();

  const handlepress = () => {
    navigation.navigate(Constraints.EDIT_CUSTOMER);
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constraints.CUSTOMER}
        component={CustomerListScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon="plus"
              size={30}
              containerColor={colors.primary}
              iconColor={colors.white}
              onPress={handlepress}
            />
          ),
        }}
      />
      <Stack.Screen
        name={Constraints.EDIT_CUSTOMER}
        component={EditCustomerScreen}
      />

      <Stack.Screen name={Constraints.PAY_BILL} component={PayBill} />
      <Stack.Screen name={Constraints.CONTACTS} component={ContactListScreen} />
      <Stack.Screen name={Constraints.VIEW_ORDERS} component={ViewOrders} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
