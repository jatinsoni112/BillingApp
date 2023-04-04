import {createContext} from 'react';

const DateContext = createContext();

function DateProvider(props) {
  const billdate = '20230115162847';
  const monthEnd = '20230131235959';
  const monthStart = '20230101000000';

  const value = {billdate, monthEnd, monthStart};
  return <DateContext.Provider value={value} {...props} />;
}

export {DateContext, DateProvider};
