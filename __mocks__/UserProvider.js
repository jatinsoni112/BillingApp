import React, {createContext} from 'react';

const UserContext = createContext();

const UserProvider = props => {
  const displayName = 'Test Name';
  const value = {displayName};
  return <UserContext.Provider value={value} {...props} />;
};
export {UserContext, UserProvider};

