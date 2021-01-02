import axios from 'axios';
import { getToken } from './localStorage';

import createStore from '../../state/redux/configStore';
import authActions from '../../state/actions/auth';

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
    const store = createStore();
    const { status } = error.response;
    if (status === 401) {
      store.dispatch(authActions.signOutActions());
    }
    return Promise.reject(error);
  }
);

export default instance;
