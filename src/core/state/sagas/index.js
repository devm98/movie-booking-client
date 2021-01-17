import { all } from 'redux-saga/effects';

import movieSaga from './movies';
import authSaga from './auth';
import bookingSaga from './booking';
import userSaga from './user';

export default function* rootSaga() {
  yield all([movieSaga(), authSaga(), bookingSaga(), userSaga()]);
}
