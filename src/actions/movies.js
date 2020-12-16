import { actionCreator } from '../utils/helpers';

const actions = {
  GET_COMING_SOON_MOVIES: actionCreator('GET_COMING_SOON_MOVIES'),
  GET_NOW_SHOWING_MOVIES: actionCreator('GET_NOW_SHOWING_MOVIES'),

  getComingSoonMovies: (data = {}) => {
    return {
      type: actions.GET_COMING_SOON_MOVIES.REQUEST,
      payload: data,
    };
  },

  getNowShowingMovies: (data = {}) => {
    return {
      type: actions.GET_NOW_SHOWING_MOVIES.REQUEST,
      payload: data,
    };
  },
};

export default actions;
