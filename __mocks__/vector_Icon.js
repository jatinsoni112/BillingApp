import React from 'react';
import {Text} from 'react-native';

const Icon = ({name, size, color}) => {
  return (
    <Text>
      {name}-{size}-{color}
    </Text>
  );
};
export default Icon;
