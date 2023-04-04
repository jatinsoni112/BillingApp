import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../colors';
import AppText from './AppText';
const Contact = ({contact, onPress}) => {
  return (
    <TouchableOpacity style={styles.contactCon} onPress={onPress}>
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
          <AppText style={styles.txt}>{contact?.givenName[0]}</AppText>
        </View>
      </View>
      <View style={styles.contactDat} testID='contact_view_test_id'>
        <AppText style={styles.name}>
          {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
          {contact?.familyName}
        </AppText>
        <AppText style={styles.phoneNumber}>
          {contact?.phoneNumbers[0]?.number}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightgray,
    borderRadius: 20,
    elevation: 7,
    backgroundColor: colors.white,
    margin: 10,
  },
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    marginLeft: 10,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
  },
});
export default Contact;
