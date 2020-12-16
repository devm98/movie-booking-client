import apiService from '../utils/helpers/axiosService';

export const getMovieScheduleAction = (params = {}) => {
  return apiService.get('/home/movies/schedules', { params });
};

export const getRoomAction = (params = {}) => {
  return apiService.get('/client/auditoriums', { params });
};
