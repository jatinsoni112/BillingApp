import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Constraints from '../app/utils/Constraints';
import EditItem from '../app/Screens/EditItemScreen';
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

const Edititemscreen = () => {
  let navigationMock = {
    navigate: jest.fn(),
  };
  return (
    <UserProvider>
      <EditItem route="" navigation={navigationMock} />
    </UserProvider>
  );
};

describe('Edit item screen ', () => {
  it('renders the Name component', () => {
    const {getByPlaceholderText} = render(<Edititemscreen />);

    expect(getByPlaceholderText(Constraints.NAME)).toBeDefined();
  });

  it('renders the Price component', () => {
    const {getByPlaceholderText} = render(<Edititemscreen />);

    expect(getByPlaceholderText(Constraints.PRICE)).toBeDefined();
  });

  describe('submits the form with valid input', () => {
    it('editmode is false which means add new item in firestore', async () => {
      const {getByPlaceholderText, getByText} = render(<Edititemscreen />);

      const nameInputElement = getByPlaceholderText(Constraints.NAME);
      const priceInputElement = getByPlaceholderText(Constraints.PRICE);

      const submitButton = getByText(Constraints.SUBMIT_CHANGES);
      waitFor(() => {
        fireEvent.changeText(nameInputElement, 'item');
        fireEvent.changeText(priceInputElement, '123');
        fireEvent.press(submitButton);
      });

      const setFn = mockFirestore()
        .collection('collectionName')
        .doc('docId')
        .collection('Items')
        .doc('docId').set;

      await setFn();

      expect(setFn).toHaveBeenCalledTimes(1);
    });

    it('editmode is true which means update current item in firestore', async () => {
      const {getByPlaceholderText, getByText} = render(<Edititemscreen />);

      const nameInputElement = getByPlaceholderText(Constraints.NAME);
      const priceInputElement = getByPlaceholderText(Constraints.PRICE);

      const submitButton = getByText(Constraints.SUBMIT_CHANGES);
      waitFor(() => {
        fireEvent.changeText(nameInputElement, 'item');
        fireEvent.changeText(priceInputElement, '123');
        fireEvent.press(submitButton);
      });

      updateFn = mockFirestore()
        .collection('collectionName')
        .doc('docId')
        .collection('Items')
        .doc('docId').update;

      await updateFn();
      expect(updateFn).toHaveBeenCalledTimes(1);
    });
  });
});
