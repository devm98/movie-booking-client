import { call, all, put, takeLatest } from 'redux-saga/effects';
import { signInHandler } from '../api/auth';
import { createBrowserHistory } from 'history';
import actions from '../actions/auth';
import {
  saveToken,
  saveState,
  clearToken,
  getToken,
  loadState,
} from '../utils/helpers';

const history = createBrowserHistory();

function* signIn({ payload }) {
  try {
    const results = yield call(signInHandler, payload);
    const { token, userInfo } = results?.data;
    yield all([
      yield call(saveToken, token),
      yield call(saveState, 'user_info', userInfo),
    ]);

    yield put({
      type: actions.SIGN_IN.SUCCESS,
      payload: {
        token,
        userInfo,
      },
    });
  } catch (error) {
    yield put({
      type: actions.SIGN_IN.FAILURE,
      payload: error,
    });
  } finally {
    yield put({
      type: actions.SIGN_IN.REFRESH,
    });
  }
}

function* checkAuthentication() {
  try {
    const [token, user] = yield all([getToken(), loadState('user_info')]);
    if (token) {
      yield put({
        type: actions.CHECK_AUTHENTICATION.SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      yield put({ type: actions.SIGN_OUT });
    }
  } catch (error) {
    yield put({ type: actions.SIGN_OUT });
  } finally {
    yield put({
      type: actions.CHECK_AUTHENTICATION.REFRESH,
    });
  }
}

function* signOut() {
  yield clearToken();
  yield history.push('/');
}

export default function* authSaga() {
  yield takeLatest(actions.SIGN_IN.REQUEST, signIn);
  yield takeLatest(actions.SIGN_OUT, signOut);
  yield takeLatest(actions.CHECK_AUTHENTICATION.REQUEST, checkAuthentication);
}
