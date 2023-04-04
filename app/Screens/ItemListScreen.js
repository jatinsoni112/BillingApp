import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Screen from '../Screen';
import ItemInfo from '../components/ItemInfo';
import Constraints from '../utils/Constraints';
import {UserContext} from '../context/UserProvider';

const ItemList = ({navigation}) => {
  const [Items, setItems] = useState([]);
  const [editmode, seteditmode] = useState(false);
  const {displayName} = useContext(UserContext);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(displayName)
      .collection('Items')
      .onSnapshot(querySnapshot => {
        const items = [];

        querySnapshot.forEach(documentSnapshot => {
          items.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setItems(items);
      });
  }, []);

  const handleDelete = id => {
    // console.log('hi', id);
    firestore()
      .collection('Users')
      .doc(displayName)
      .collection(displayName + '-' + 'Items')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Item deleted!', id);
      });
  };
  const handleEdit = (id, name, price) => {
    seteditmode(true);
    // console.log('hii', name);
    navigation.navigate(Constraints.EDIT_ITEM, {id, name, price, editmode});
  };

  console.log('Items', Items);
  return (
    <Screen style={styles.container}>
      <FlatList
        data={Items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={info => {
          // console.log(info.item);
          return (
            <ItemInfo
              testID={'itemlist_iteminfo_testid' + info.index}
              name={info.item.ItemName}
              rate={info.item.Price}
              onPress_Delete={() => handleDelete(info.item.key)}
              onPress_Edit={() =>
                handleEdit(info.item.key, info.item.ItemName, info.item.Price)
              }
            />
          );
        }}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ItemList;
