import React from 'react';
import {View} from 'react-native';

const DatePicker = props => {
  const {date, modal, mode, open, onConfirm, onCancel, testID} = props;
  return (
    <View
      testID={testID}
      date={date}
      modal={modal}
      mode={mode}
      open={open}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default DatePicker;
