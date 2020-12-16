import actions from '../actions/auth';

const initState = {
  loading: false,
  idToken: false,
  error: false,
  user: {},
};

const auth = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.CHECK_AUTHENTICATION.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.CHECK_AUTHENTICATION.SUCCESS:
      const { token, user } = payload;
      return {
        ...state,
        loading: false,
        idToken: token,
        user,
      };
    case actions.CHECK_AUTHENTICATION.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case actions.CHECK_AUTHENTICATION.REFRESH:
      return {
        ...state,
        error: false,
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
        user: payload.user,
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
