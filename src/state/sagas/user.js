import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getUsers,
  createUser,
  updateUser,
  removeUser,
} from '../../core/api/user';
import actions from '../actions/user';

function* getUsersSaga({ payload }) {
  try {
    const results = yield call(getUsers, payload);
    const { code, data, pageInfo } = results.data;

    yield put({
      type: actions.GET_USER_LIST.SUCCESS,
      payload: {
        data,
        pageInfo,
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
  } finally {
    yield put({
      type: actions.CREATE_USER.REFRESH,
    });
  }
}

function* updateUserSaga({ payload }) {
  try {
    const results = yield call(updateUser, payload);
    const { code } = results.data;
    yield put({
      type: actions.UPDATE_USER.SUCCESS,
      payload: code,
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_USER.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  } finally {
    yield put({
      type: actions.UPDATE_USER.REFRESH,
    });
  }
}

function* removeUserSaga({ payload }) {
  try {
    const results = yield call(removeUser, payload);
    const { code } = results.data;
    yield put({
      type: actions.REMOVE_USER.SUCCESS,
      payload: code,
    });
  } catch (error) {
    yield put({
      type: actions.REMOVE_USER.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  } finally {
    yield put({
      type: actions.REMOVE_USER.REFRESH,
    });
  }
}

export default function* userSaga() {
  yield takeLatest(actions.GET_USER_LIST.REQUEST, getUsersSaga);
  yield takeLatest(actions.CREATE_USER.REQUEST, createUserSaga);
  yield takeLatest(actions.UPDATE_USER.REQUEST, updateUserSaga);
  yield takeLatest(actions.REMOVE_USER.REQUEST, removeUserSaga);
}
