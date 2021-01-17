import apiService from '../helpers/axiosService';

export const getUsers = (params = {}) => {
  return apiService.get('/admin/users', { params });
};

export const createUser = (body = {}) => {
  return apiService.post('/admin/users', body);
};

export const updateUser = (body = {}) => {
  return apiService.put(`/admin/users/${body.id}`, body);
};

export const removeUser = (id) => {
  return apiService.delete(`/admin/users/${id}`);
};
