import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions/movies';
import { getComingSoon, getNowShowing } from '../../core/api/movies';

function* getComingSoonMovie() {
  try {
    const results = yield call(getComingSoon);
    const { data, errorCode, pageInfo } = results.data;

    yield put({
      type: actions.GET_COMING_SOON_MOVIES.SUCCESS,
      payload: {
        data,
        errorCode,
        pageInfo,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_COMING_SOON_MOVIES.FAILURE,
      payload: {
        error: error.response.data,
      },
    });
  }
}

function* getNowShowingMovie() {
  try {
    const results = yield call(getNowShowing);
    const { data, errorCode, pageInfo } = results.data;

    yield put({
      type: actions.GET_NOW_SHOWING_MOVIES.SUCCESS,
      payload: {
        data,
        errorCode,
        pageInfo,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_NOW_SHOWING_MOVIES.FAILURE,
      payload: {
        error: error.response.data,
      },
    });
  }
}

export default function* movieSaga() {
  yield takeLatest(actions.GET_COMING_SOON_MOVIES.REQUEST, getComingSoonMovie);
  yield takeLatest(actions.GET_NOW_SHOWING_MOVIES.REQUEST, getNowShowingMovie);
}
