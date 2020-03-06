import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import paymentReducer from './paymentReducer';
import analyticsReducer from './analyticsReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  payment: paymentReducer,
  dashboard: analyticsReducer
});

export default rootReducer;
