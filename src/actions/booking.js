import { actionCreator } from '../utils/helpers';
const actions = {
  GET_MOVIE_SCHEDULE: actionCreator('GET_MOVIE_SCHEDULE'),
  GET_ROOM: actionCreator('GET_ROOM'),

  getMovieSchedule: (data = {}) => {
    return {
      type: actions.GET_MOVIE_SCHEDULE.REQUEST,
      payload: data,
    };
  },

  getRooms: (data = {}) => {
    return {
      type: actions.GET_ROOM.REQUEST,
      payload: data,
    };
  },
};

export default actions;
