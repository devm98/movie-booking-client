import actions from '../actions/user';

const initState = {
  loading: false,
  data: [],
  pageInfo: {},
  error: false,
  status: undefined,
  userCreated: {
    loading: false,
    error: false,
    httpCode: -1,
  },
};

const movies = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.GET_USER_LIST.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_USER_LIST.SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data,
        errorCode: payload.errorCode,
        pageInfo: payload.pageInfo,
      };
    case actions.GET_USER_LIST.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case actions.CREATE_USER.REQUEST:
      return {
        ...state,
        userCreated: {
          ...state.userCreated,
          loading: true,
        },
      };

    case actions.CREATE_USER.SUCCESS:
      return {
        ...state,
        userCreated: {
          ...state.userCreated,
          loading: false,
          httpCode: payload,
        },
      };

    case actions.CREATE_USER.FAILURE:
      return {
        ...state,
        userCreated: {
          ...state.userCreated,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };
    default:
      return state;
  }
};

export default movies;
