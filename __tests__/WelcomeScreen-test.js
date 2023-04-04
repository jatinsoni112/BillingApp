import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import WelcomeScreen from '../app/Screens/WelcomeScreen';
import Constraints from '../app/utils/Constraints';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
    })),
  };
});

describe('Welcome Screen', () => {
  it('should display Login & Register button', () => {
    const {getByText} = render(<WelcomeScreen />);
    expect(getByText(Constraints.LOGIN).props).toBeDefined();
    expect(getByText(Constraints.REGISTER).props).toBeDefined();
  });
});
