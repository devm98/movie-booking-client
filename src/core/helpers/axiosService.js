import axios from 'axios';
import { getToken } from './localStorage';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use((request) => {
  const token = getToken();

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
