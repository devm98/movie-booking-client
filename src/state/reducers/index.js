import { combineReducers } from 'redux';
import movies from './movies';
import auth from './auth';
import booking from './booking';

const rootReducer = combineReducers({
  movies,
  auth,
  booking,
});

export default rootReducer;
