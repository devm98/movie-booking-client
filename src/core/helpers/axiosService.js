import axios from 'axios';
import { getToken } from './localStorage';

// import createStore from '../../state/redux/configStore';
// import authActions from '../../state/actions/auth';
// import { useHistory } from 'react-router-dom';

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
