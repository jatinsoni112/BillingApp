import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import ResetPasswordScreen from '../app/Screens/ResetPasswordScreen';
import mockAuth from '../__mocks__/FirebaseAuth';
import Constraints from '../app/utils/Constraints';

jest.mock('@react-native-firebase/auth', () => {
  require('../__mocks__/FirebaseAuth');
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () =>
  require('../__mocks__/vector_Icon'),
);

describe('ResetPasswordScreen', () => {
  let navigationMock;

  beforeEach(() => {
    navigationMock = {
      navigate: jest.fn(),
    };
  });

  it('renders the component', () => {
    const {getByPlaceholderText} = render(
      <ResetPasswordScreen navigation={navigationMock} />,
    );

    expect(getByPlaceholderText(Constraints.NEW_PASSWORD)).toBeTruthy();
  });

  it('submits the form with valid input', async () => {
    const {getByPlaceholderText, getByText} = render(
      <ResetPasswordScreen navigation={navigationMock} />,
    );

    const passwordInput = getByPlaceholderText(Constraints.NEW_PASSWORD);

    const submitButton = getByText(Constraints.SUBMIT_CHANGES);
    waitFor(() => {
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(submitButton);
    });
    mockAuth.currentUser.updatePassword('password123');
    expect(mockAuth.currentUser.updatePassword).toHaveBeenCalledWith(
      'password123',
    );
  });
});
