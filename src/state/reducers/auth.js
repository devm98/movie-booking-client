import actions from '../actions/auth';

const initState = {
  loading: false,
  idToken: null,
  error: false,
  userInfo: {},
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

    default:
      return state;
  }
};

export default auth;
