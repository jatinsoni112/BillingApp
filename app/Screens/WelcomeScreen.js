import React from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Constraints from '../utils/Constraints';
import {Button} from 'react-native-paper';
import colors from '../colors';

const WelcomeScreen = props => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate(Constraints.LOGIN);
  };
  const handleRegister = () => {
    navigation.navigate(Constraints.REGISTER);
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}>
      <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.button}>
        <Button
          onPress={handleLogin}
          style={{margin: 10}}
          mode="elevated"
          buttonColor={colors.primary}
          textColor={colors.white}>
          {Constraints.LOGIN}
        </Button>
        <Button
          onPress={handleRegister}
          style={{margin: 10}}
          mode="elevated"
          buttonColor={colors.secondary}
          textColor={colors.white}>
          {Constraints.REGISTER}
        </Button>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: 20,
  },
  image: {
    flex: 1,
  },
  logo: {
    height: 100,
    width: 100,
  },
  logocontainer: {
    position: 'absolute',
    top: 80,
  },
});
export default WelcomeScreen;
