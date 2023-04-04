import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import ViewOrders from '../app/Screens/ViewOrdersScreen';
import {UserProvider} from '../__mocks__/UserProvider';
import {DateProvider} from '../__mocks__/DateProvider';
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

const ViewOrdersScreen = () => {
  const route = {
    params: '',
  };
  return (
    <UserProvider>
      <DateProvider>
        <ViewOrders route={route} />
      </DateProvider>
    </UserProvider>
  );
};

describe('submits the form with valid input', () => {
  it('Should display Start Date, End Date & Filter Button  ', async () => {
    const {getByText, getByTestId} = render(<ViewOrdersScreen />);

    expect(getByTestId('Enddate_testId')).toBeDefined();
    expect(getByTestId('Startdate_testId')).toBeDefined();

    expect(getByText('Start Date')).toBeDefined();
    expect(getByText('End Date')).toBeDefined();
    expect(getByTestId('Filter_Button_TestId')).toBeDefined();
  });

  it('Should display Order Table', async () => {
    await waitFor(() => {
      render(<ViewOrdersScreen />);
    });

    const ordercardElement = screen.getByTestId('OrderCard_TestId0');
    const orderTextElement = screen.getByText(Constraints.ORDERS_TABLE);

    expect(ordercardElement).toBeDefined();
    expect(orderTextElement).toBeDefined();
  });

  it('Should display Order Table', async () => {
    await waitFor(() => {
      render(<ViewOrdersScreen />);
    });

    const paymentTextElement = screen.getByText(Constraints.PAYMENTS_TABLE);
    const paymentcardElement = screen.getByTestId('PaymentCard_TestId0');
    expect(paymentcardElement).toBeDefined();
    expect(paymentTextElement).toBeDefined();
  });
});
