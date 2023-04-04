import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';

const Dropdown = ({
  onChange,
  placeholder,
  placeholderStyle,
  selectedTextStyle,
  inputSearchStyle,
  itemTextStyle,
  iconColor,
  searchPlaceholder,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [visible, setVisible] = useState(false);
  const data = [
    {
      ItemId: '0.7513432353848506',
      ItemName: 'Item 1',
      Price: '12',
      key: 'CBvFObF1P6nhFd6rFi2U',
    },
    {
      ItemId: '0.588269311204246',
      ItemName: 'Item 2',
      Price: '201',
      key: 'pZFtwfo8mYqczXj8OB3l',
    },
  ];

  const handleChange = item => {
    setSelectedValue(item);
    setVisible(!visible);
  };

  return (
    <View {...props} testID="testid_dropdown_view">
      <TouchableOpacity
        testID="dropdown_touchableOpacity"
        onPress={() => setVisible(!visible)}>
        <Text>{selectedValue || placeholder}</Text>
      </TouchableOpacity>
      {visible && (
        <View>
          <FlatList
            testID="flatlist_dropdown"
            data={data}
            keyExtractor={(data, index) => index + data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                testID={'dropdown_flatlist_touchableOpacity' + index}
                onPress={() => {
                  handleChange(item.ItemName);
                  if (onChange) onChange(item);
                }}>
                <Text>{item.ItemName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};
export {Dropdown};
