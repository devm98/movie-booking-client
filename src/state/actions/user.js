import { actionCreator } from '../../core/helpers';

const actions = {
  GET_USER_LIST: actionCreator('GET_USER_LIST'),
  CREATE_USER: actionCreator('CREATE_USER'),
  UPDATE_USER: actionCreator('UPDATE_USER'),
  REMOVE_USER: actionCreator('REMOVE_USER'),

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
  updateUser: (data = {}) => {
    return {
      type: actions.UPDATE_USER.REQUEST,
      payload: data,
    };
  },
  removeUser: (id) => {
    return {
      type: actions.REMOVE_USER.REQUEST,
      payload: id,
    };
  },
};

export default actions;
