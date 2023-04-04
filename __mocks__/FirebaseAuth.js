const mockAuth = {
  currentUser: {
    updatePassword: jest.fn().mockImplementation(() => Promise.resolve()),
  },
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  delete: jest.fn(),
};

export default mockAuth;
