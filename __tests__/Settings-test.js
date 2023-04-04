import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SettingsScreen from '../app/Screens/SettingsScreen';
import {UserProvider} from '../__mocks__/UserProvider';
import Constraints from '../app/utils/Constraints';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () =>
  require('../__mocks__/vector_Icon'),
);
jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

describe('SettingsScreen', () => {
  it('should display the user name', () => {
    const navigation = {navigate: jest.fn()};
    const displayName = 'John Doe';
    const {getByText} = render(
      <UserProvider value={{displayName}}>
        <SettingsScreen navigation={navigation} />
      </UserProvider>,
    );
    expect(getByText(displayName)).toBeTruthy();
  });

  it('should navigate to the reset password screen when the reset password button is pressed', () => {
    const navigation = {navigate: jest.fn()};
    const {getByText} = render(
      <UserProvider value={{displayName: 'John Doe'}}>
        <SettingsScreen navigation={navigation} />
      </UserProvider>,
    );
    const resetPasswordButton = getByText(Constraints.RESET_PASSWORD);
    fireEvent.press(resetPasswordButton);
    expect(navigation.navigate).toHaveBeenCalledWith(
      Constraints.RESET_PASSWORD,
    );
  });
});
