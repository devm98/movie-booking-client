import actions from '../actions/movies';

const initState = {
  comingSoon: {
    loading: false,
    data: [],
    error: false,
  },
  nowShowing: {
    loading: false,
    data: [],
    error: false,
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
        },
      };
    case actions.GET_COMING_SOON_MOVIES.FAILURE:
      return {
        ...state,
        comingSoon: {
          ...state.comingSoon,
          loading: false,
          error: payload,
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
        },
      };
    case actions.GET_NOW_SHOWING_MOVIES.FAILURE:
      return {
        ...state,
        nowShowing: {
          ...state.nowShowing,
          loading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default movies;
