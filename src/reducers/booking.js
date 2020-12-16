import actions from '../actions/booking';

const initState = {
  loading: false,
  data: [],
  error: false,
  dataRoom: [],
  loadingRoom: false,
  errorRoom: false,
};

const schedule = (state = initState, { type, payload }) => {
  switch (type) {
    case actions.GET_MOVIE_SCHEDULE.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_MOVIE_SCHEDULE.SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data,
      };
    case actions.GET_MOVIE_SCHEDULE.FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    case actions.GET_ROOM.REQUEST:
      return {
        ...state,
        loadingRoom: true,
      };
    case actions.GET_ROOM.SUCCESS:
      return {
        ...state,
        loadingRoom: false,
        dataRoom: payload.data,
      };
    case actions.GET_ROOM.FAILURE:
      return {
        ...state,
        loadingRoom: false,
        errorRoom: payload.error,
      };

    default:
      return state;
  }
};

export default schedule;
