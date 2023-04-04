import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PayBill from '../app/Screens/PayBillScreen';
import {UserProvider} from '../__mocks__/UserProvider';
import {DateProvider} from '../__mocks__/DateProvider';
import Constraints from '../app/utils/Constraints';

jest.mock('@react-native-firebase/firestore', () =>
  require('../__mocks__/Firestore'),
);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () =>
  require('../__mocks__/vector_Icon'),
);

jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

jest.mock('../app/context/DateProvider', () =>
  require('../__mocks__/DateProvider'),
);

const PayBillScreen = () => {
  let navigationMock = {
    navigate: jest.fn(),
  };

  const route = {
    params: {
      billdue: 819,
      key: '4tCCfAB1WTKbVmpprDhK',
      mobileno: '1111222214',
      name: 'Aa',
    },
  };

  return (
    <UserProvider>
      <DateProvider>
        <PayBill route={route} navigation={navigationMock} />
      </DateProvider>
    </UserProvider>
  );
};

describe('Pay BIll', () => {
  it('should display customer name,Mobileno,BillDue', () => {
    const {getByText} = render(<PayBillScreen />);

    const nameElement = getByText('Aa');
    const numberElement = getByText('1111222214');
    const billdueElement = getByText('819');

    expect(nameElement).toBeDefined();
    expect(numberElement).toBeDefined();
    expect(billdueElement).toBeDefined();
  });

  it('should display TextInput for Haste & Payment ammount and also change text ', () => {
    const {getByPlaceholderText} = render(<PayBillScreen />);

    const ammountElement = getByPlaceholderText(Constraints.AMMOUNT_TO_PAY);
    const hasteElement = getByPlaceholderText(Constraints.HASTE);

    expect(ammountElement).toBeDefined();
    expect(hasteElement).toBeDefined();

    fireEvent.changeText(ammountElement, 200);
    fireEvent.changeText(hasteElement, 'some person');

    expect(ammountElement.props.value).toBe(200);
    expect(hasteElement.props.value).toBe('some person');
  });

  test('should display PayBill Button Component ', () => {
    const {getByText} = render(<PayBillScreen />);

    const buttonElement = getByText(Constraints.PAY_BILL);

    expect(buttonElement).toBeDefined();
  });
});
