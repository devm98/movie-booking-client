import { stateCreater } from '../../core/helpers';
import actions from '../actions/booking';

const stateList = ['schedule', 'room', 'seat', 'ticket'];
const initState = { ...stateCreater(stateList) };

const bookingState = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.GET_MOVIE_SCHEDULE.REQUEST:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          loading: true,
        },
      };
    case actions.GET_MOVIE_SCHEDULE.SUCCESS:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          loading: false,
          data: payload.data,
          httpCode: payload.code,
        },
      };
    case actions.GET_MOVIE_SCHEDULE.FAILURE:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };

    case actions.GET_ROOM.REQUEST:
      return {
        ...state,
        room: {
          ...state.room,
          loading: true,
        },
      };
    case actions.GET_ROOM.SUCCESS:
      return {
        ...state,
        room: {
          ...state.room,
          loading: false,
          data: payload.room,
          httpCode: payload.code,
        },
      };
    case actions.GET_ROOM.FAILURE:
      return {
        ...state,
        room: {
          ...state.room,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };

    case actions.GET_SEATS_BOOKED.REQUEST:
      return {
        ...state,
        seat: {
          ...state.seat,
          loading: true,
        },
      };
    case actions.GET_SEATS_BOOKED.SUCCESS:
      return {
        ...state,
        seat: {
          ...state.seat,
          loading: false,
          data: payload.seatsBooked,
          httpCode: payload.code,
        },
      };
    case actions.GET_SEATS_BOOKED.FAILURE:
      return {
        ...state,
        seat: {
          ...state.seat,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };

    case actions.BOOKING_TICKET.REQUEST:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          loading: true,
        },
      };
    case actions.BOOKING_TICKET.SUCCESS:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          loading: false,
          data: payload.data,
          httpCode: payload.code,
        },
      };
    case actions.BOOKING_TICKET.FAILURE:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          loading: false,
          error: payload.error,
          httpCode: payload.error.code,
        },
      };

    default:
      return state;
  }
};

export default bookingState;
