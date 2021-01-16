import { actionCreator } from '../../core/helpers';

const actions = {
  GET_USER_LIST: actionCreator('GET_USER_LIST'),
  CREATE_USER: actionCreator('CREATE_USER'),

  getUsers: (data = {}) => {
    return {
      type: actions.GET_USER_LIST.REQUEST,
      payload: data,
    };
  },

  createUser: (data = {}) => {
    return {
      type: actions.CREATE_USER.REQUEST,
      payload: data,
    };
  },
};

export default actions;
