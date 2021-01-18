import actions from '../actions/auth';

const initState = {
  loading: false,
  idToken: null,
  error: false,
  userInfo: {},
  register: {
    loading: false,
    error: false,
    httpCode: -1,
  },
};

const auth = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.CHECK_AUTHENTICATION:
      return {
        ...state,
        loading: true,
      };
    case actions.SIGN_IN.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.SIGN_IN.SUCCESS:
      return {
        ...state,
        loading: false,
        idToken: payload.token,
        userInfo: payload.userInfo,
      };
    case actions.SIGN_IN.FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case actions.SIGN_IN.REFRESH:
      return {
        ...state,
        loading: false,
      };

    case actions.SIGN_OUT:
      return initState;

    case actions.REGISTER_USER.REQUEST:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
      };
    case actions.REGISTER_USER.SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          httpCode: payload,
        },
      };
    case actions.REGISTER_USER.FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };
    case actions.REGISTER_USER.REFRESH:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: false,
          httpCode: -1,
        },
      };

    default:
      return state;
  }
};

export default auth;
