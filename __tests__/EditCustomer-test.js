import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Constraints from '../app/utils/Constraints';
import EditCustomer from '../app/Screens/EditCustomerScreen';
import {UserProvider} from '../__mocks__/UserProvider';
import mockFirestore from '../__mocks__/Firestore';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () =>
  require('../__mocks__/vector_Icon'),
);

jest.mock('@react-native-firebase/firestore', () =>
  require('../__mocks__/Firestore'),
);

jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

const EditCustomerScreen = () => {
  let navigationMock = {
    navigate: jest.fn(),
  };
  return (
    <UserProvider>
      <EditCustomer route="" navigation={navigationMock} />
    </UserProvider>
  );
};

describe('Edit Customer screen ', () => {
  it('renders the Name, MobileNo, BillDue & Submit Button component', () => {
    const {getByPlaceholderText,getByText} = render(<EditCustomerScreen />);

    const nameInputElement = getByPlaceholderText(Constraints.NAME);
    const numberInputElement = getByPlaceholderText(Constraints.MOBILE_NO);
    const dueInputElement = getByPlaceholderText(Constraints.BILL_DUE);
    const submitButton = getByText(Constraints.SUBMIT_CHANGES);

    expect(nameInputElement).toBeDefined();
    expect(numberInputElement).toBeDefined();
    expect(dueInputElement).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  describe('submits the form with valid input', () => {
    it('editmode is false which means add new Customer in firestore', async () => {
      const {getByPlaceholderText, getByText} = render(<EditCustomerScreen />);

      const nameInputElement = getByPlaceholderText(Constraints.NAME);
      const numberInputElement = getByPlaceholderText(Constraints.MOBILE_NO);
      const dueInputElement = getByPlaceholderText(Constraints.BILL_DUE);

      const submitButton = getByText(Constraints.SUBMIT_CHANGES);
      waitFor(() => {
        fireEvent.changeText(nameInputElement, 'Customer');
        fireEvent.changeText(numberInputElement, '2222222222');
        fireEvent.changeText(dueInputElement, '12');
        fireEvent.press(submitButton);
      });

      const setFn = mockFirestore()
        .collection('collectionName')
        .doc('docId')
        .collection('Customers')
        .doc('docId').set;

      await setFn();

      expect(setFn).toHaveBeenCalledTimes(1);
    });

    it('editmode is true which means update current Customer in firestore', async () => {
      const {getByPlaceholderText, getByText} = render(<EditCustomerScreen />);

      const nameInputElement = getByPlaceholderText(Constraints.NAME);
      const numberInputElement = getByPlaceholderText(Constraints.MOBILE_NO);
      const dueInputElement = getByPlaceholderText(Constraints.BILL_DUE);

      const submitButton = getByText(Constraints.SUBMIT_CHANGES);
      waitFor(() => {
        fireEvent.changeText(nameInputElement, 'Customer');
        fireEvent.changeText(numberInputElement, '2222222222');
        fireEvent.changeText(dueInputElement, '12');
        fireEvent.press(submitButton);
      });

      updateFn = mockFirestore()
        .collection('collectionName')
        .doc('docId')
        .collection('Customers')
        .doc('docId').update;

      await updateFn();
      expect(updateFn).toHaveBeenCalledTimes(1);
    });
  });
});
