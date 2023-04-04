import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';

import Screen from '../Screen';
import Constraints from '../utils/Constraints';
import TouchableText from '../components/TouchableText';
import AppText from '../components/AppText';
import {UserContext} from '../context/UserProvider';

const SettingsScreen = ({navigation}) => {
  const {displayName} = useContext(UserContext);
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText>Welcome</AppText>
        <AppText style={styles.user}>{displayName}</AppText>
      </View>
      <TouchableText
        icon="lock-reset"
        title={Constraints.RESET_PASSWORD}
        onPress={() => navigation.navigate(Constraints.RESET_PASSWORD)}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  user: {
    fontSize: 25,
  },
});

export default SettingsScreen;
