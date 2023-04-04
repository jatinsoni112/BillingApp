import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const UserContext = createContext();

const UserProvider=(props) =>{
  const [displayName, setDisplayName] = useState();

  const {user} = props;
  useEffect(() => {
    if (user) {
      setDisplayName(auth().currentUser.displayName);
    }
  }, [user]);

  const value = {displayName, setDisplayName};
  return <UserContext.Provider value={value} {...props} />;
}

export {UserContext, UserProvider};
