import config from '../config/config';
import axios from 'axios';

const request = (api, data) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const timeout = 5000;
  const baseURL = config.API_GATEWAY;
  const instance = axios.create({
    baseURL,
    headers,
    timeout,
    withCredentials: true,
  });
  const url = data && data.id ? `${api.url}/${data.id}` : api.url;
  const params = data && data.params ? data.params : null;

  switch (api.method) {
    case 'get':
      return instance.get(url, { params });
    case 'post':
      return instance.post(url, params);
    case 'put':
      return instance.put(url, params);
    case 'delete':
      return instance.delete(url, { params });
    default:
      return null;
  }
};
export default request;