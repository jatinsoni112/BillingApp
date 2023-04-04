import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import colors from '../colors';
// import MenuNavigator from './MenuNavigator';
import AddItemScreen from '../Screens/AddItemScreen';
import BillingScreen from '../Screens/BillingScreen';
import Constraints from '../utils/Constraints';
// import MenuScreen from '../Screens/MenuScreen';
import CustomerNavigator from './CustomerNavigator';
import ItemNavigator from './ItemNavigator';
import SettingsNavigator from './SettingsNavigator';
import WelcomeScreen from '../Screens/WelcomeScreen';
import {Modal, Pressable, View} from 'react-native';
import TouchableText from '../components/TouchableText';
const Stack = createNativeStackNavigator();

const BillingNavigator = () => {
  const [IsVisible, setIsVisible] = useState(false);

  const navigation = useNavigation();

  const handlemenupress = () => {
    //  navigation.navigate('MenuScreen');
    setIsVisible(!IsVisible);
  };

  //new
  const settingPress = () => {
    navigation.navigate('SettingsScreen');
    setIsVisible(!IsVisible);
  };
  const customerPress = () => {
    navigation.navigate(Constraints.CUSTOMER_LIST);
    setIsVisible(!IsVisible);
  };
  const itemPress = () => {
    navigation.navigate(Constraints.ITEM_LIST);
    setIsVisible(!IsVisible);
  };
  const logout = () => {
    auth().signOut();
    setIsVisible(!IsVisible);
  };

  return (
    <>
      <Modal visible={IsVisible} transparent animationType="fade">
        <Pressable
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          onPress={handlemenupress}></Pressable>
        <View
          style={{
            backgroundColor: colors.white,
            flexShrink: 1,
            paddingHorizontal: 10,
            paddingBottom: 10,
            marginLeft: 'auto',
            elevation: 10,
            width: '60%',
          }}>
          <View
            style={{
              flexShrink: 1,
              // position: 'absolute', bottom: 1, right: 10, left: 10
            }}>
            <Icon
              style={{
                marginLeft: 'auto',
                marginRight: 6,
                marginTop: 6,
              }}
              name="dots-horizontal"
              size={50}
              color={colors.black}
              onPress={handlemenupress}
            />
            <TouchableText
              icon="cog-outline"
              title={Constraints.SETTINGS}
              onPress={settingPress}
            />
            <TouchableText
              icon="account"
              title={Constraints.CUSTOMER_LIST}
              onPress={customerPress}
            />
            <TouchableText
              icon="cart"
              title={Constraints.ITEM_LIST}
              onPress={itemPress}
            />
            <TouchableText
              icon="logout"
              title={Constraints.LOGOUT}
              onPress={logout}
            />
          </View>
        </View>
      </Modal>
      <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
        <Stack.Screen
          name={Constraints.BILL}
          component={BillingScreen}
          options={{
            headerBackVisible: false,
            headerRight: () => (
              <Icon
                name="dots-vertical"
                size={50}
                color={colors.black}
                onPress={handlemenupress}
              />
            ),
          }}
        />
        {/* <Stack.Screen
          name="MenuScreen"
          component={MenuNavigator}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name={Constraints.ADD_ITEM}
          component={AddItemScreen}
          options={{headerBackVisible: false}}
        />

        <Stack.Screen
          name={Constraints.CUSTOMER_LIST}
          component={CustomerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constraints.ITEM_LIST}
          component={ItemNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name={Constraints.LOGOUT} component={WelcomeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default BillingNavigator;
