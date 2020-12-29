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
    default:
      return state;
  }
};

export default movies;
