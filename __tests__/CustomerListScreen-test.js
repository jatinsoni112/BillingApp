import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {UserProvider} from '../__mocks__/UserProvider';
import {DateProvider} from '../__mocks__/DateProvider';
import CustomerList from '../app/Screens/CustomerListScreen';
import Constraints from '../app/utils/Constraints';

jest.mock('@react-native-firebase/firestore', () =>
  require('../__mocks__/Firestore'),
);

jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

jest.mock('../app/context/DateProvider', () =>
  require('../__mocks__/DateProvider'),
);

const CustomerListScreenRender = () => {
  let navigationMock = {
    navigate: jest.fn(),
  };
  return (
    <UserProvider>
      <DateProvider>
        <CustomerList navigation={navigationMock} />
      </DateProvider>
    </UserProvider>
  );
};

describe('Customer List Screen ', () => {
  it('should render customer card', () => {
    render(<CustomerListScreenRender />);
    const customercardElement = screen.getByTestId('CustomerCard_TestId0');

    expect(customercardElement).toBeDefined();
  });

  it('should render Modal containing CreateBill, PayBill,ViewOrders, Edit & Delete Button When CustomerCard is Pressed', () => {
    render(<CustomerListScreenRender />);
    const customercardElement = screen.getByTestId('CustomerCard_TestId0');

    fireEvent.press(customercardElement);

    const createBillButtonElement = screen.getByRole('button', {
      name: Constraints.CREATE_BILL,
    });
    const payBillButtonElement = screen.getByRole('button', {
      name: Constraints.PAY_BILL,
    });
    const viewOrderButtonElement = screen.getByRole('button', {
      name: Constraints.VIEW_ORDERS,
    });
    const editButtonElement = screen.getByTestId('editButton_testId');
    const deleteButtonElement = screen.getByTestId('deleteButton_testId');
    const closeButtonElement = screen.getByTestId('closeButton_testId');

    expect(createBillButtonElement).toBeDefined();
    expect(payBillButtonElement).toBeDefined();
    expect(viewOrderButtonElement).toBeDefined();
    expect(editButtonElement).toBeDefined();
    expect(deleteButtonElement).toBeDefined();
    expect(closeButtonElement).toBeDefined();
  });
});
