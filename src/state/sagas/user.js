import { call, put, takeLatest } from 'redux-saga/effects';
import { getUsers, createUser } from '../../core/api/user';
import actions from '../actions/user';

function* getUsersSaga({ payload }) {
  try {
    const results = yield call(getUsers, payload);
    const { code, data } = results.data;

    yield put({
      type: actions.GET_USER_LIST.SUCCESS,
      payload: {
        data,
        code,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_USER_LIST.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  }
}

function* createUserSaga({ payload }) {
  try {
    const results = yield call(createUser, payload);
    const { code } = results.data;
    yield put({
      type: actions.CREATE_USER.SUCCESS,
      payload: code,
    });
  } catch (error) {
    yield put({
      type: actions.CREATE_USER.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  }
}
export default function* userSaga() {
  yield takeLatest(actions.GET_USER_LIST.REQUEST, getUsersSaga);
  yield takeLatest(actions.CREATE_USER.REQUEST, createUserSaga);
}
