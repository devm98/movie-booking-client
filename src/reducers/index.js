import { combineReducers } from 'redux';
import movies from './movies';
import auth from './auth';
import schedule from './booking';

const rootReducer = combineReducers({
  movies,
  auth,
  schedule,
});

export default rootReducer;
