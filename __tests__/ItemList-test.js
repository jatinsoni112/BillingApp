import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';

import ItemList from '../app/Screens/ItemListScreen';
import {UserProvider} from '../__mocks__/UserProvider';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () =>
  require('../__mocks__/vector_Icon'),
);

jest.mock('@react-native-firebase/firestore', () =>
  require('../__mocks__/Firestore'),
);

jest.mock('../app/context/UserProvider', () =>
  require('../__mocks__/UserProvider'),
);

const ItemListScreen = () => {
  let navigationMock = {
    navigate: jest.fn(),
  };
  return (
    <UserProvider>
      <ItemList navigation={navigationMock} />
    </UserProvider>
  );
};

describe('Item List Screen', () => {
  it('should display list of items', async () => {
    await waitFor(() => {
      const {getByText} = render(<ItemListScreen />);
      expect(getByText('item1')).toBeDefined();
      expect(getByText('item2')).toBeDefined();
    });
  });

  it('should display edit & delete Buttons when itemcard is pressed', async () => {
    await waitFor(() => {
      render(<ItemListScreen />);
    });
    const itemElement = screen.getByTestId('itemlist_iteminfo_testid0');
    fireEvent.press(itemElement);
    const editElement = screen.getByTestId('itemlist_iteminfo_Edit_testid');
    const deleteElement = screen.getByTestId('itemlist_iteminfo_Delete_testid');
    expect(editElement).toBeDefined();
    expect(deleteElement).toBeDefined();
  });
});
