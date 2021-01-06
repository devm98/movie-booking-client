import apiService from '../../core/helpers/axiosService';

export const signInHandler = (data) => {
  return apiService.post('/api/authenticate', data);
};
