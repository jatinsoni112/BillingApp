import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import Contacts from 'react-native-contacts';
import {IconButton} from 'react-native-paper';

import colors from '../colors';
import AppText from '../components/AppText';
import Contact from '../components/Contact';
import Constraints from '../utils/Constraints';

const ContactListScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [MobileNo, setMobileNo] = useState([]);
  const [Person, setPerson] = useState([]);

  useEffect(() => {
    Contacts.checkPermission().then(res => {
      // console.log('Permission result ', res);
      if (res === 'authorized') {
        Contacts.getAll()
          .then(contacts => {
            const sortedContacts = contacts.sort((a, b) => {
              if (a.givenName < b.givenName) return -1;
              if (a.givenName > b.givenName) return 1;
              return 0;
            });
            setContacts(sortedContacts);
          })
          .catch(e => {
            console.log(e);
          });
      } else if (res === 'denied') {
        Contacts.requestPermission()
          .then(result => {
            console.log('Resuest result ', result);
          })
          .catch(error => {
            console.log('Request error ', error);
          });
      }
    });
  }, []);
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  const numberpress = number => {
    if (Person != undefined && MobileNo) {
      navigation.navigate(Constraints.EDIT_CUSTOMER, {number, Person});
    }
  };
  const contactPress = (phoneNumbers, person) => {
    setPerson(person);
    setMobileNo(phoneNumbers);
    setisModalVisible(!isModalVisible);
  };
  const closepress = () => {
    setisModalVisible(!isModalVisible);
  };

  // console.log('contacts', contacts);
  return (
    <>
      <FlatList
        testID="testid_flatlist"
        data={contacts}
        renderItem={({item, index}) => {
          // console.log('contacts flatlist ', item);
          return (
            <Contact
              contact={item}
              onPress={() => contactPress(item.phoneNumbers, item.displayName)}
            />
          );
        }}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <Pressable style={{flex: 1}} onPress={closepress}></Pressable>
        <View style={styles.container}>
          <IconButton
            testID="close_icon_contacts"
            style={{flexShrink: 1, marginLeft: 'auto', marginTop: 10}}
            icon="close"
            size={30}
            iconColor={colors.black}
            onPress={closepress}
          />
          <View style={{flexShrink: 1, marginBottom: 10}}>
            <View style={{alignItems: 'center'}}>
              <AppText style={styles.name}>{Constraints.NAME} : </AppText>
              <AppText>{Person}</AppText>
            </View>
            <View style={{marginTop: 10}}>
              <AppText style={styles.name}>{Constraints.MOBILE_NO} </AppText>
            </View>
          </View>

          <FlatList
            data={MobileNo}
            style={{flexShrink: 1}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={info => (
              <TouchableOpacity
                style={styles.mobileno}
                onPress={() => numberpress(info.item.number)}>
                <AppText>{info.item.number}</AppText>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  container: {
    flexShrink: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 15,
    // height: '60%',
    backgroundColor: colors.light,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 'auto',
    elevation: 7,
    // paddingTop: '15%',
    paddingBottom: 10,
  },

  mobileno: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 30,
  },
  name: {
    fontWeight: 'bold',
    backgroundColor: colors.lightblue,
    textAlign: 'center',
    width: '100%',
  },
});
export default ContactListScreen;
