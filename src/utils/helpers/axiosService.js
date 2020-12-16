import axios from 'axios';
import { getToken } from './localStorage';
import { PUBLIC_API } from '../../constants/api';
import { omit } from 'lodash';

const token = getToken();

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // prettier-ignore
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

instance.interceptors.request.use((requestConfig) => {
  let configOverride = requestConfig;
  // if (PUBLIC_API.includes(requestConfig.url)) {
  //   configOverride = omit(requestConfig, 'headers.Authorization');
  // }
  if (requestConfig.url === '/client/authenticate') {
    configOverride = omit(requestConfig, 'headers.Authorization');
  }
  if (requestConfig.url === '/home/movies/?query=coming-soon') {
    configOverride = omit(requestConfig, 'headers.Authorization');
  }
  if (requestConfig.url === '/home/movies') {
    configOverride = omit(requestConfig, 'headers.Authorization');
  }
  console.log(configOverride);
  return configOverride;
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
