import { actionCreator } from '../../core/helpers';
const actions = {
  GET_MOVIE_SCHEDULE: actionCreator('GET_MOVIE_SCHEDULE'),
  GET_ROOM: actionCreator('GET_ROOM'),
  GET_SEATS_BOOKED: actionCreator('GET_SEATS_BOOKED'),

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

  getSeatsBooked: (data = {}) => {
    return {
      type: actions.GET_SEATS_BOOKED.REQUEST,
      payload: data,
    };
  },
};

export default actions;
