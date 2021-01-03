import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions/booking';
import {
  getMovieScheduleAction,
  getRoomAction,
  getSeatBooked,
} from '../../core/api/booking';

function* getMovieSchedules({ payload }) {
  try {
    const results = yield call(getMovieScheduleAction, payload);
    const { code, data } = results.data;

    yield put({
      type: actions.GET_MOVIE_SCHEDULE.SUCCESS,
      payload: {
        data,
        code,
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
    const { status, data } = results;

    yield put({
      type: actions.GET_ROOM.SUCCESS,
      payload: {
        room: data,
        code: status,
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

function* getSeatBookedSaga({ payload }) {
  try {
    const results = yield call(getSeatBooked, payload);
    const { code, data } = results.data;

    yield put({
      type: actions.GET_SEATS_BOOKED.SUCCESS,
      payload: {
        seatsBooked: data,
        code,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_SEATS_BOOKED.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  }
}

export default function* bookingSaga() {
  yield takeLatest(actions.GET_MOVIE_SCHEDULE.REQUEST, getMovieSchedules);
  yield takeLatest(actions.GET_ROOM.REQUEST, getRooms);
  yield takeLatest(actions.GET_SEATS_BOOKED.REQUEST, getSeatBookedSaga);
}
