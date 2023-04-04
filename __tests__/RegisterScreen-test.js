import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import {UserProvider} from '../__mocks__/UserProvider';
import Constraints from '../app/utils/Constraints';
import mockAuth from '../__mocks__/FirebaseAuth';
import RegisterScreen from '../app/Screens/RegisterScreen';

jest.mock('@react-native-firebase/auth', () =>
  require('../__mocks__/FirebaseAuth'),
);

jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () =>
  require('../__mocks__/vector_Icon'),
);

const RegisterScreenRender = () => {
  return (
    <UserProvider>
      <RegisterScreen />
    </UserProvider>
  );
};

describe('Login Screen', () => {
  it('should display Email, Password & Login Button component', () => {
    render(<RegisterScreenRender />);

    const emailElement = screen.getByPlaceholderText(Constraints.EMAIL);
    const usernameElement = screen.getByPlaceholderText(Constraints.NAME);
    const passwordElement = screen.getByPlaceholderText(Constraints.PASSWORD);
    const registerButtonElement = screen.getByRole('button', {
      name: Constraints.REGISTER,
    });

    expect(emailElement).toBeDefined();
    expect(usernameElement).toBeDefined();
    expect(passwordElement).toBeDefined();
    expect(registerButtonElement).toBeDefined();
  });

  it('should login the user', async () => {
    render(<RegisterScreenRender />);

    const emailElement = screen.getByPlaceholderText(Constraints.EMAIL);
    const usernameElement = screen.getByPlaceholderText(Constraints.NAME);
    const passwordElement = screen.getByPlaceholderText(Constraints.PASSWORD);
    const registerButtonElement = screen.getByRole('button', {
      name: Constraints.REGISTER,
    });

    fireEvent.changeText(emailElement, 'registertest@gmail.com');
    fireEvent.changeText(usernameElement, 'register test');
    fireEvent.changeText(passwordElement, 'registerpassword');
    fireEvent.press(registerButtonElement);
    mockAuth.createUserWithEmailAndPassword();

    await waitFor(() => {
      expect(mockAuth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });
});
