import React from 'react';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from '../colors';
import Constraints from '../utils/Constraints'; 
import EditItemScreen from '../Screens/EditItemScreen';
import ItemListScreen from '../Screens/ItemListScreen';

const Stack = createNativeStackNavigator();

const ItemNavigator = () => {
  const navigation = useNavigation();

  const handlepress = () => {
    navigation.navigate(Constraints.EDIT_ITEM);
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Constraints.ITEMS}
        component={ItemListScreen}
        options={{
          headerRight: () => (
            <Icon
              name="plus-circle"
              size={50}
              color={colors.primary}
              onPress={handlepress}
            />
          ),
        }}
      />
      <Stack.Screen name={Constraints.EDIT_ITEM} component={EditItemScreen} />
    </Stack.Navigator>
  );
};

export default ItemNavigator;
