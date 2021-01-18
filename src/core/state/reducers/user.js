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
  userUpdated: {
    loading: false,
    error: false,
    httpCode: -1,
  },
  userDeleted: {
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
    case actions.CREATE_USER.REFRESH:
      return {
        ...state,
        userCreated: {
          ...state.userCreated,
          loading: false,
          error: false,
          httpCode: -1,
        },
      };

    case actions.UPDATE_USER.REQUEST:
      return {
        ...state,
        userUpdated: {
          ...state.userUpdated,
          loading: true,
        },
      };
    case actions.UPDATE_USER.SUCCESS:
      return {
        ...state,
        userUpdated: {
          ...state.userUpdated,
          loading: false,
          httpCode: payload,
        },
      };
    case actions.UPDATE_USER.FAILURE:
      return {
        ...state,
        userUpdated: {
          ...state.userUpdated,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };
    case actions.UPDATE_USER.REFRESH:
      return {
        ...state,
        userUpdated: {
          ...state.userUpdated,
          loading: false,
          error: false,
          httpCode: -1,
        },
      };

    case actions.REMOVE_USER.REQUEST:
      return {
        ...state,
        userDeleted: {
          ...state.userDeleted,
          loading: true,
        },
      };
    case actions.REMOVE_USER.SUCCESS:
      return {
        ...state,
        userDeleted: {
          ...state.userDeleted,
          loading: false,
          httpCode: payload,
        },
      };
    case actions.REMOVE_USER.FAILURE:
      return {
        ...state,
        userDeleted: {
          ...state.userDeleted,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };
    case actions.REMOVE_USER.REFRESH:
      return {
        ...state,
        userDeleted: {
          ...state.userDeleted,
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
