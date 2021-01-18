import { call, put, takeLatest } from 'redux-saga/effects';
import actions from '../actions/movies';
import {
  getComingSoon,
  getNowShowing,
  getMovieAll,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../../api/movies';

function* getComingSoonMovie({ payload }) {
  try {
    const results = yield call(getComingSoon, payload);
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

function* getNowShowingMovie({ payload }) {
  try {
    const results = yield call(getNowShowing, payload);
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

function* getMovieAllSaga({ payload }) {
  try {
    const results = yield call(getMovieAll, payload);
    const { data, errorCode, pageInfo } = results.data;

    yield put({
      type: actions.GET_MOVIE_ALL.SUCCESS,
      payload: {
        data,
        errorCode,
        pageInfo,
      },
    });
  } catch (error) {
    yield put({
      type: actions.GET_MOVIE_ALL.FAILURE,
      payload: {
        error: error.response.data,
      },
    });
  }
}

function* createMovieSaga({ payload }) {
  try {
    const results = yield call(createMovie, payload);
    const { code } = results.data;
    yield put({
      type: actions.CREATE_MOVIE.SUCCESS,
      payload: code,
    });
  } catch (error) {
    yield put({
      type: actions.CREATE_MOVIE.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  } finally {
    yield put({
      type: actions.CREATE_MOVIE.REFRESH,
    });
  }
}

function* updateMovieSaga({ payload }) {
  try {
    const results = yield call(updateMovie, payload);
    const { code } = results.data;
    yield put({
      type: actions.UPDATE_MOVIE.SUCCESS,
      payload: code,
    });
  } catch (error) {
    yield put({
      type: actions.UPDATE_MOVIE.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  } finally {
    yield put({
      type: actions.UPDATE_MOVIE.REFRESH,
    });
  }
}

function* removeMovieSaga({ payload }) {
  try {
    const results = yield call(deleteMovie, payload);
    const { code } = results.data;
    yield put({
      type: actions.DELETE_MOVIE.SUCCESS,
      payload: code,
    });
  } catch (error) {
    yield put({
      type: actions.DELETE_MOVIE.FAILURE,
      payload: {
        error: error.response || error.message,
      },
    });
  } finally {
    yield put({
      type: actions.DELETE_MOVIE.REFRESH,
    });
  }
}

export default function* movieSaga() {
  yield takeLatest(actions.GET_COMING_SOON_MOVIES.REQUEST, getComingSoonMovie);
  yield takeLatest(actions.GET_NOW_SHOWING_MOVIES.REQUEST, getNowShowingMovie);
  yield takeLatest(actions.GET_MOVIE_ALL.REQUEST, getMovieAllSaga);
  yield takeLatest(actions.CREATE_MOVIE.REQUEST, createMovieSaga);
  yield takeLatest(actions.UPDATE_MOVIE.REQUEST, updateMovieSaga);
  yield takeLatest(actions.DELETE_MOVIE.REQUEST, removeMovieSaga);
}
