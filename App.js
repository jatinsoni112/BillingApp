import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import NavigationTheme from './app/Navigator/NavigationTheme';
import auth from '@react-native-firebase/auth';

import AuthNavigator from './app/Navigator/AuthNavigator';
import AppNavigator from './app/Navigator/AppNavigator';
import OfflineNotice from './app/components/OfflineNotice';
import {UserProvider} from './app/context/UserProvider';
import {DateProvider} from './app/context/DateProvider';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  return (
    <UserProvider user={authenticated}>
      <DateProvider>
        <OfflineNotice />
        <NavigationContainer theme={NavigationTheme}>
          {authenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </DateProvider>
    </UserProvider>
  );
};

export default App;
