import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions/movies';
import { getComingSoon, getNowShowing } from '../api/movies';

function* getComingSoonMovie({ payload }) {
  try {
    const results = yield call(getComingSoon);

    yield put({
      type: actions.GET_COMING_SOON_MOVIES.SUCCESS,
      payload: {
        data: results.data.content,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_COMING_SOON_MOVIES.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  }
}

function* getNowShowingMovie({ payload }) {
  try {
    const results = yield call(getNowShowing);

    yield put({
      type: actions.GET_NOW_SHOWING_MOVIES.SUCCESS,
      payload: {
        data: results.data.content,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_NOW_SHOWING_MOVIES.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  }
}

export default function* movieSaga() {
  yield takeLatest(actions.GET_COMING_SOON_MOVIES.REQUEST, getComingSoonMovie);
  yield takeLatest(actions.GET_NOW_SHOWING_MOVIES.REQUEST, getNowShowingMovie);
}
