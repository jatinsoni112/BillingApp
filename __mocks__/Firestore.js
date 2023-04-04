const ItemsCollection = 'Items';
const OrdersCollection = 'Orders';
const CustomersCollection = 'Customers';
const PaymentCollection = 'Payment';
const mockFirestore = jest.fn(() => {
  return {
    collection: jest.fn(collectionName => {
      return {
        doc: jest.fn(docId => {
          return {
            collection: jest.fn(nestedCollectionName => {
              if (nestedCollectionName == OrdersCollection) {
                return {
                  doc: jest.fn(nestedDocId => {
                    return {
                      set: jest.fn(() => Promise.resolve()),
                      get: jest.fn(() => Promise.resolve({data: () => ({})})),
                      update: jest.fn(() => Promise.resolve()),
                      delete: jest.fn(() => Promise.resolve()),
                    };
                  }),
                  where: jest.fn(() => {
                    return {
                      where: jest.fn(() => {
                        return {
                          where: jest.fn(() => {
                            return {
                              get: jest.fn(() =>
                                Promise.resolve({
                                  forEach: jest.fn(cb => {
                                    cb({
                                      id: '1',
                                      data: () => {
                                        return {
                                          Ammount: 1704,
                                          CustomerId: '4tCCfAB1WTKbVmpprDhK',
                                          CustomerName: 'Aa',
                                          Date: '20221228000000',
                                          Haste: 'Sd',
                                          Items: [
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                          ],
                                          MobileNo: '1111222214',
                                          OrderDate: '12/28/2022',
                                        };
                                      },
                                    });
                                    cb({
                                      id: '2',
                                      data: () => {
                                        return {
                                          Ammount: 704,
                                          CustomerId: '4tCCfAB1WTKbVmpprDhK',
                                          CustomerName: 'Aa',
                                          Date: '20221228000000',
                                          Haste: 'Sd',
                                          Items: [
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                            {
                                              id: 0,
                                              price: '142',
                                              quantity: '2',
                                              value: 'item 3',
                                            },
                                          ],
                                          MobileNo: '1111222214',
                                          OrderDate: '12/28/2022',
                                        };
                                      },
                                    });
                                  }),
                                }),
                              ),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              } else if (nestedCollectionName == PaymentCollection) {
                return {
                  doc: jest.fn(nestedDocId => {
                    return {
                      set: jest.fn(() => Promise.resolve()),
                      get: jest.fn(() => Promise.resolve({data: () => ({})})),
                      update: jest.fn(() => Promise.resolve()),
                      delete: jest.fn(() => Promise.resolve()),
                    };
                  }),
                  where: jest.fn(() => {
                    return {
                      where: jest.fn(() => {
                        return {
                          get: jest.fn(() =>
                            Promise.resolve({
                              forEach: jest.fn(cb => {
                                cb({
                                  id: '1',
                                  data: () => {
                                    return {
                                      Ammount: '5737',
                                      CustomerId: '4tCCfAB1WTKbVmpprDhK',
                                      CustomerName: 'Aa',
                                      Date: '20221231185506',
                                      Haste: 'Rt',
                                      MobileNo: '1111222214',
                                      PaymentDate: '12/31/2022',
                                    };
                                  },
                                });
                                cb({
                                  id: '2',
                                  data: () => {
                                    return {
                                      Ammount: '5737',
                                      CustomerId: '4tCCfAB1WTKbVmpprDhK',
                                      CustomerName: 'Aa',
                                      Date: '20221231185506',
                                      Haste: 'Rt',
                                      MobileNo: '1111222214',
                                      PaymentDate: '12/31/2022',
                                    };
                                  },
                                });
                              }),
                            }),
                          ),
                          where: jest.fn(() => {
                            return {
                              get: jest.fn(() =>
                                Promise.resolve({
                                  forEach: jest.fn(cb => {
                                    cb({
                                      id: '1',
                                      data: () => {
                                        return {
                                          Ammount: '5737',
                                          CustomerId: '4tCCfAB1WTKbVmpprDhK',
                                          CustomerName: 'Aa',
                                          Date: '20221231185506',
                                          Haste: 'Rt',
                                          MobileNo: '1111222214',
                                          PaymentDate: '12/31/2022',
                                        };
                                      },
                                    });
                                    cb({
                                      id: '2',
                                      data: () => {
                                        return {
                                          Ammount: '5737',
                                          CustomerId: '4tCCfAB1WTKbVmpprDhK',
                                          CustomerName: 'Aa',
                                          Date: '20221231185506',
                                          Haste: 'Rt',
                                          MobileNo: '1111222214',
                                          PaymentDate: '12/31/2022',
                                        };
                                      },
                                    });
                                  }),
                                }),
                              ),
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              } else if (nestedCollectionName == ItemsCollection) {
                return {
                  doc: jest.fn(nestedDocId => {
                    return {
                      set: jest.fn(() => Promise.resolve()),
                      get: jest.fn(() => Promise.resolve({data: () => ({})})),
                      update: jest.fn(() => Promise.resolve()),
                      delete: jest.fn(() => Promise.resolve()),
                    };
                  }),
                  onSnapshot: jest.fn(callback => {
                    callback({
                      forEach: jest.fn(cb => {
                        cb({
                          data: jest.fn(() => {
                            return {
                              ItemName: 'item1',
                              Price: 10,
                            };
                          }),
                          id: '123',
                        });
                        cb({
                          data: jest.fn(() => {
                            return {
                              ItemName: 'item2',
                              Price: 20,
                            };
                          }),
                          id: '234',
                        });
                      }),
                    });
                  }),
                };
              } else if (nestedCollectionName == CustomersCollection) {
                return {
                  doc: jest.fn(nestedDocId => {
                    return {
                      set: jest.fn(() => Promise.resolve()),
                      get: jest.fn(() => Promise.resolve({data: () => ({})})),
                      update: jest.fn(() => Promise.resolve()),
                      delete: jest.fn(() => Promise.resolve()),
                    };
                  }),
                  onSnapshot: jest.fn(callback => {
                    callback({
                      forEach: jest.fn(cb => {
                        cb({
                          data: jest.fn(() => {
                            return {
                              BillDate: '20230103200624',
                              BillDue: 819,
                              MobileNo: '1111222214',
                              Name: 'Aa',
                              PreviousBillDate: '1/3/2023',
                            };
                          }),
                          id: '123',
                        });
                        cb({
                          data: jest.fn(() => {
                            return {
                              BillDue: '0',
                              MobileNo: '1212121212',
                              Name: 'b',
                              PreviousBillDate: 'कोई पिछला बिल नहीं है',
                            };
                          }),
                          id: '234',
                        });
                      }),
                    });
                  }),
                };
              }
            }),
            set: jest.fn(() => Promise.resolve()),
            get: jest.fn(() => Promise.resolve({data: () => ({})})),
            update: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
          };
        }),
        where: jest.fn(() => {
          return {
            get: jest.fn(() => Promise.resolve({docs: []})),
          };
        }),
        onSnapshot: jest.fn(),
      };
    }),
  };
});

export default mockFirestore;
