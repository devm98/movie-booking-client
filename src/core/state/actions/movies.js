import { actionCreator } from '../../helpers';

const actions = {
  GET_COMING_SOON_MOVIES: actionCreator('GET_COMING_SOON_MOVIES'),
  GET_NOW_SHOWING_MOVIES: actionCreator('GET_NOW_SHOWING_MOVIES'),
  GET_MOVIE_ALL: actionCreator('GET_MOVIE_ALL'),
  CREATE_MOVIE: actionCreator('CREATE_MOVIE'),
  UPDATE_MOVIE: actionCreator('UPDATE_MOVIE'),
  DELETE_MOVIE: actionCreator('DELETE_MOVIE'),

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

  getAllMovie: (data = {}) => {
    return {
      type: actions.GET_MOVIE_ALL.REQUEST,
      payload: data,
    };
  },

  createMovie: (data = {}) => {
    return {
      type: actions.CREATE_MOVIE.REQUEST,
      payload: data,
    };
  },
  updateMovie: (data = {}) => {
    return {
      type: actions.UPDATE_MOVIE.REQUEST,
      payload: data,
    };
  },
  removeMovie: (id) => {
    return {
      type: actions.DELETE_MOVIE.REQUEST,
      payload: id,
    };
  },
};

export default actions;
