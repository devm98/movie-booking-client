import apiService from '../../core/helpers/axiosService';

export const getMovieScheduleAction = (params = {}) => {
  return apiService.get('/public/schedules', { params });
};

export const getRoomAction = (params = {}) => {
  return apiService.get('/client/seats', { params });
};

export const getSeatBooked = (params = {}) => {
  return apiService.get('/client/auditoriums/seats', { params });
};

export const bookingTicket = (data) => {
  return apiService.post('/client/bookings', data);
};
