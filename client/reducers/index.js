import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { money } from './money.reducer';
import { locale } from './locale.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  money,
  locale
});

export default rootReducer;