import axios from 'axios';
import statusHandler from './statusHandler';

const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
});
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    statusHandler(error);
    if (error.response.status === 401) {
      instance(error.config);
    }
    return error.response;
  },
);

export default instance;
