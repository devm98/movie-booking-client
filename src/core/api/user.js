import apiService from '../helpers/axiosService';

export const getUsers = (params = {}) => {
  return apiService.get('/admin/users', { params });
};

export const createUser = (body = {}) => {
  return apiService.post('/admin/users', body);
};
