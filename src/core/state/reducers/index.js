import { combineReducers } from 'redux';
import movies from './movies';
import auth from './auth';
import booking from './booking';
import user from './user';

const rootReducer = combineReducers({
  movies,
  auth,
  booking,
  user,
});

export default rootReducer;
