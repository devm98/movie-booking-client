import { actionCreator } from "../utils/helpers";

const actions = {
  SIGN_IN: actionCreator("SIGN_IN"),
  CHECK_AUTHENTICATION: actionCreator("CHECK_AUTHENTICATION"),
  SIGN_OUT: "SIGN_OUT",

  signInActions: (data = {}) => {
    return {
      type: actions.SIGN_IN.REQUEST,
      payload: data,
    };
  },

  signOutActions: () => ({
    type: actions.SIGN_OUT,
  }),

  checkAuthorization: (data) => ({
    type: actions.CHECK_AUTHENTICATION.REQUEST,
    payload: data,
  }),
};

export default actions;
