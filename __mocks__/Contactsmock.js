const mockContacts = [
  {
    recordID: '1',
    givenName: 'John',
    familyName: '',
    phoneNumbers: [{label: 'mobile', number: '555-555-5555'}],
    displayName: 'John',
    middleName: 'Smith',
  },
  {
    recordID: '2',
    givenName: 'Jane',
    familyName: '',
    phoneNumbers: [
      {label: 'mobile', number: '444-444-4444'},
      {label: 'mobile', number: '555-555-5556'},
    ],
    displayName: 'Jane',
    middleName: 'Smith',
  },
];

const mockCheckPermission = jest.fn().mockResolvedValue('authorized');
const mockRequestPermission = jest.fn(() => Promise.resolve('authorized'));

const mockGetAll = jest.fn().mockResolvedValue(mockContacts);
const Contacts = {
  checkPermission: mockCheckPermission,
  getAll: mockGetAll,
  requestPermission: mockRequestPermission,
};

export default Contacts;
