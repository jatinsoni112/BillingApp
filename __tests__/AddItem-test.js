import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import AddItem from '../app/Screens/AddItemScreen';
import {UserProvider} from '../__mocks__/UserProvider';
import Constraints from '../app/utils/Constraints';

jest.mock('react-native-element-dropdown', () =>
  require('../__mocks__/Dropdown'),
);
jest.mock('@react-native-firebase/firestore', () =>
  require('../__mocks__/Firestore'),
);

jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

const AdditemScreen = () => {
  let navigationMock = {
    navigate: jest.fn(),
  };

  return (
    <UserProvider>
      <AddItem route="" navigation={navigationMock} />
    </UserProvider>
  );
};

describe('Add item screen', () => {
  it('should display Price, Quantity & Total component', () => {
    const {getByText, getByPlaceholderText} = render(<AdditemScreen />);

    const priceElement = getByText(Constraints.PRICE);
    const totalElement = getByText(Constraints.TOTAL);
    const quantityElement = getByPlaceholderText(Constraints.QUANTITY);

    expect(priceElement).toBeDefined();
    expect(totalElement).toBeDefined();
    expect(quantityElement).toBeDefined();
  });

  test('should display Dropdown Component', () => {
    const {getByTestId} = render(<AdditemScreen />);

    const dropdownElement = getByTestId('dropdown_touchableOpacity');

    expect(dropdownElement).toBeDefined();
  });

  test('should display Add & Cancel Button Component', () => {
    const {getByText} = render(<AdditemScreen />);

    const addButtonElement = getByText(Constraints.ADD);
    const cancelButtonElement = getByText(Constraints.CANCEL);

    expect(addButtonElement).toBeDefined();
    expect(cancelButtonElement).toBeDefined();
  });

  test('should change item name, Price, Quantity & Total value', () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(
      <AdditemScreen />,
    );
    const priceElement = getByText(Constraints.PRICE);
    const quantityElement = getByPlaceholderText(Constraints.QUANTITY);

    const dropdownElement = getByTestId('dropdown_touchableOpacity');

    fireEvent.press(dropdownElement);

    const itemElement = getByTestId('dropdown_flatlist_touchableOpacity0');
    fireEvent.press(itemElement);
    fireEvent.changeText(quantityElement, '2');

    const totalElement = getByText(': 24');

    expect(priceElement.props.children[0]).toEqual('12');
    expect(quantityElement.props.value).toEqual('2');
    expect(totalElement.props.children[1]).toEqual(24);
  });
});
