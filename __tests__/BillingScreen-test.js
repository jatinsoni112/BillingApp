import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import BillingScreen from '../app/Screens/BillingScreen';
import {UserProvider} from '../__mocks__/UserProvider';
import {DateProvider} from '../__mocks__/DateProvider';
import Constraints from '../app/utils/Constraints';

jest.mock('react-native-element-dropdown', () =>
  require('../__mocks__/Dropdown'),
);

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

const BillingScreenRender = ({route}) => {
  let navigationMock = {
    navigate: jest.fn(),
  };
  return (
    <UserProvider>
      <DateProvider>
        <BillingScreen route={route} navigation={navigationMock} />
      </DateProvider>
    </UserProvider>
  );
};

describe('Billing Screen ', () => {
  it('should render dropdown', () => {
    render(<BillingScreenRender route="" />);
    const dropdownElement = screen.getByTestId('dropdown_touchableOpacity');
    expect(dropdownElement).toBeDefined();
  });

  it('should render Haste, Date, Total component & Save Button', () => {
    render(<BillingScreenRender route="" />);
    const hasteElement = screen.getByPlaceholderText(Constraints.HASTE);
    const dateElement = screen.getByText(new Date().toLocaleDateString());
    const totalElement = screen.getByText(Constraints.TOTAL);
    const saveButtonElement = screen.getByRole('button', {
      name: Constraints.SAVE,
    });
    expect(hasteElement).toBeDefined();
    expect(dateElement).toBeDefined();
    expect(totalElement).toBeDefined();
    expect(saveButtonElement).toBeDefined();
  });

  it('should render Flatlist Header ', () => {
    render(<BillingScreenRender route="" />);
    const flatlistHeaderElement = screen.getByTestId(
      'billingScreen_FlatlistHeader_TestId',
    );
    expect(flatlistHeaderElement).toBeDefined();
  });

  it('should render Flatlist when route params passed from AddItem Screen ', () => {
    const route = {
      params: {
        item: {
          id: 0,
          price: '12',
          quantity: '1',
          value: 'Item 1',
        },
      },
    };
    render(<BillingScreenRender route={route} />);
    const itemcardElement = screen.getByTestId(
      'BillingScreen_itemcard_testId0',
    );
    expect(itemcardElement).toBeDefined();
  });
});
