import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import paymentReducer from './paymentReducer';
import analyticsReducer from './analyticsReducer';
import credentialReducer from './credentialReducer';
import newsReducer from './newsReducer';
import supportReducer from './supportReducer';
import ticketReducer from './ticketReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  payment: paymentReducer,
  dashboard: analyticsReducer,
  credentials: credentialReducer,
  news: newsReducer,
  supportData: supportReducer,
  tickets: ticketReducer
});

export default rootReducer;
