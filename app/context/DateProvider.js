import moment from 'moment';
import {createContext} from 'react';

const DateContext = createContext();

function DateProvider(props) {
  const billdate = moment(new Date()).format('YYYYMMDDHHmmss');
  const PreviousMonth = moment(new Date()).subtract(1, 'month');
  const monthEnd = PreviousMonth.endOf('month').format('YYYYMMDDHHmmss');
  const monthStart = PreviousMonth.startOf('month').format('YYYYMMDDHHmmss');
  const value = {billdate, monthEnd, monthStart};
  return <DateContext.Provider value={value} {...props} />;
}

export {DateContext, DateProvider};
