import actions from '../actions/movies';

const initState = {
  comingSoon: {
    loading: false,
    data: [],
    pageInfo: {},
    error: false,
    status: undefined,
  },
  nowShowing: {
    loading: false,
    data: [],
    pageInfo: {},
    error: false,
    status: undefined,
  },
  movieAll: {
    loading: false,
    data: [],
    pageInfo: {},
    error: false,
    httpCode: -1,
  },
  movieCreated: {
    loading: false,
    error: false,
    httpCode: -1,
  },
  movieUpdated: {
    loading: false,
    error: false,
    httpCode: -1,
  },
  movieDeleted: {
    loading: false,
    error: false,
    httpCode: -1,
  },
};

const movies = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.GET_COMING_SOON_MOVIES.REQUEST:
      return {
        ...state,
        comingSoon: {
          ...state.comingSoon,
          loading: true,
        },
      };
    case actions.GET_COMING_SOON_MOVIES.SUCCESS:
      return {
        ...state,
        comingSoon: {
          ...state.comingSoon,
          loading: false,
          data: payload.data,
          errorCode: payload.errorCode,
          pageInfo: payload.pageInfo,
        },
      };
    case actions.GET_COMING_SOON_MOVIES.FAILURE:
      return {
        ...state,
        comingSoon: {
          ...state.comingSoon,
          loading: false,
          error: payload.error,
        },
      };

    case actions.GET_NOW_SHOWING_MOVIES.REQUEST:
      return {
        ...state,
        nowShowing: {
          ...state.nowShowing,
          loading: true,
        },
      };
    case actions.GET_NOW_SHOWING_MOVIES.SUCCESS:
      return {
        ...state,
        nowShowing: {
          ...state.nowShowing,
          loading: false,
          data: payload.data,
          errorCode: payload.errorCode,
          pageInfo: payload.pageInfo,
        },
      };
    case actions.GET_NOW_SHOWING_MOVIES.FAILURE:
      return {
        ...state,
        nowShowing: {
          ...state.nowShowing,
          loading: false,
          error: payload.error,
        },
      };

    case actions.GET_MOVIE_ALL.REQUEST:
      return {
        ...state,
        movieAll: {
          ...state.movieAll,
          loading: true,
        },
      };
    case actions.GET_MOVIE_ALL.SUCCESS:
      return {
        ...state,
        movieAll: {
          ...state.movieAll,
          loading: false,
          data: payload.data,
          pageInfo: payload.pageInfo,
          httpCode: payload.errorCode,
        },
      };
    case actions.GET_MOVIE_ALL.FAILURE:
      return {
        ...state,
        movieAll: {
          ...state.movieAll,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };

    //================ADMIN=====================

    case actions.CREATE_MOVIE.REQUEST:
      return {
        ...state,
        movieCreated: {
          ...state.movieCreated,
          loading: true,
        },
      };
    case actions.CREATE_MOVIE.SUCCESS:
      return {
        ...state,
        movieCreated: {
          ...state.movieCreated,
          loading: false,
          httpCode: payload,
        },
      };
    case actions.CREATE_MOVIE.FAILURE:
      return {
        ...state,
        movieCreated: {
          ...state.movieCreated,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };
    case actions.CREATE_MOVIE.REFRESH:
      return {
        ...state,
        movieCreated: {
          ...state.movieCreated,
          loading: false,
          error: false,
          httpCode: -1,
        },
      };

    case actions.UPDATE_MOVIE.REQUEST:
      return {
        ...state,
        movieUpdated: {
          ...state.movieUpdated,
          loading: true,
        },
      };
    case actions.UPDATE_MOVIE.SUCCESS:
      return {
        ...state,
        movieUpdated: {
          ...state.movieUpdated,
          loading: false,
          httpCode: payload,
        },
      };
    case actions.UPDATE_MOVIE.FAILURE:
      return {
        ...state,
        movieUpdated: {
          ...state.movieUpdated,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };
    case actions.UPDATE_MOVIE.REFRESH:
      return {
        ...state,
        movieUpdated: {
          ...state.movieUpdated,
          loading: false,
          error: false,
          httpCode: -1,
        },
      };

    case actions.DELETE_MOVIE.REQUEST:
      return {
        ...state,
        movieDeleted: {
          ...state.movieDeleted,
          loading: true,
        },
      };
    case actions.DELETE_MOVIE.SUCCESS:
      return {
        ...state,
        movieDeleted: {
          ...state.movieDeleted,
          loading: false,
          httpCode: payload,
        },
      };
    case actions.DELETE_MOVIE.FAILURE:
      return {
        ...state,
        movieDeleted: {
          ...state.movieDeleted,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };
    case actions.DELETE_MOVIE.REFRESH:
      return {
        ...state,
        movieDeleted: {
          ...state.movieDeleted,
          loading: false,
          error: false,
          httpCode: -1,
        },
      };

    default:
      return state;
  }
};

export default movies;
