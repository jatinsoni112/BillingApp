import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import {UserProvider} from '../__mocks__/UserProvider';
import LoginScreen from '../app/Screens/LoginScreen';
import Constraints from '../app/utils/Constraints';
import mockAuth from '../__mocks__/FirebaseAuth';

jest.mock('@react-native-firebase/auth', () =>
  require('../__mocks__/FirebaseAuth'),
);

jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () =>
  require('../__mocks__/vector_Icon'),
);

const LoginScreenRender = () => {
  return (
    <UserProvider>
      <LoginScreen />
    </UserProvider>
  );
};

describe('Login Screen', () => {
  it('should display Email, Password & Login Button component', () => {
    render(<LoginScreenRender />);

    const emailElement = screen.getByPlaceholderText(Constraints.EMAIL);
    const passwordElement = screen.getByPlaceholderText(Constraints.PASSWORD);
    const loginButtonElement = screen.getByRole('button', {
      name: Constraints.LOGIN,
    });

    expect(emailElement).toBeDefined();
    expect(passwordElement).toBeDefined();
    expect(loginButtonElement).toBeDefined();
  });

  it('should login the user', async () => {
    render(<LoginScreenRender />);

    const emailElement = screen.getByPlaceholderText(Constraints.EMAIL);
    const passwordElement = screen.getByPlaceholderText(Constraints.PASSWORD);
    const loginButtonElement = screen.getByRole('button', {
      name: Constraints.LOGIN,
    });

    fireEvent.changeText(emailElement, 'logintest@gmail.com');
    fireEvent.changeText(passwordElement, 'loginpassword');
    fireEvent.press(loginButtonElement);
    mockAuth.signInWithEmailAndPassword()

    await waitFor(() => {
      expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });
});
