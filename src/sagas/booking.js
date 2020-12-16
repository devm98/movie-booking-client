import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions/booking';
import { getMovieScheduleAction, getRoomAction } from '../api/booking';

function* getMovieSchedules({ payload }) {
  try {
    const results = yield call(getMovieScheduleAction, payload);

    yield put({
      type: actions.GET_MOVIE_SCHEDULE.SUCCESS,
      payload: {
        data: results.data,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_MOVIE_SCHEDULE.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  }
}

function* getRooms({ payload }) {
  try {
    const results = yield call(getRoomAction, payload);

    yield put({
      type: actions.GET_ROOM.SUCCESS,
      payload: {
        data: results.data,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_ROOM.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  }
}

export default function* bookingSaga() {
  yield takeLatest(actions.GET_MOVIE_SCHEDULE.REQUEST, getMovieSchedules);
  yield takeLatest(actions.GET_ROOM.REQUEST, getRooms);
}
