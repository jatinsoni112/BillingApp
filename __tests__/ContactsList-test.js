import React from 'react';
import { fireEvent, render, waitFor} from '@testing-library/react-native';
import ContactListScreen from '../app/Screens/ContactListScreen';
import Constraints from '../app/utils/Constraints';



jest.mock('react-native-contacts', () => require('../__mocks__/Contactsmock'));

describe('Contact list', () => {
  let navigation;
  beforeEach(() => {
    navigation = {navigate: jest.fn()};
  });

  it('renders a list of contacts sorted by name', async () => {
    const {getByText} = render(<ContactListScreen navigation={navigation} />);

    await waitFor(() => {
      expect(getByText('John Smith')).toBeDefined();
      expect(getByText('Jane Smith')).toBeDefined();
    });
  });

  it('opens a modal when a contact is pressed', async () => {
    const {getByText} = render(<ContactListScreen navigation={navigation} />);
    await waitFor(() => {
      fireEvent.press(getByText('Jane Smith'));
    });
    expect(getByText('Jane')).toBeDefined();
    expect(getByText('555-555-5555')).toBeDefined();
    expect(getByText('555-555-5556')).toBeDefined();
  });

  it('navigates to the EditCustomer screen when a phone number is pressed', async () => {
    const {getByText} = render(<ContactListScreen navigation={navigation} />);
    await waitFor(() => {
      fireEvent.press(getByText('Jane Smith'));
      fireEvent.press(getByText('555-555-5556'));
    });
    expect(navigation.navigate).toHaveBeenCalledWith(
      Constraints.EDIT_CUSTOMER,
      {
        number: '555-555-5556',
        Person: 'Jane',
      },
    );
  });

  it('closes the modal when the close button is pressed', async () => {
    const {getByText, queryByText, getByTestId} = render(
      <ContactListScreen navigation={navigation} />,
    );
    await waitFor(() => {
      fireEvent.press(getByText('Jane Smith'));
      fireEvent.press(getByTestId('close_icon_contacts'));
    });
    expect(queryByText('Jane')).toBeNull();
  });
});
