import axios from 'axios';
import codeMessage from './codeMessage';

const baseURL = 'http://api.example.com';
const timeout = 5000;

const instance = axios.create({
  baseURL,
  timeout
});

let pendingRequests = [];

const removePendingRequest = (config) => {
  for (let i = 0; i < pendingRequests.length; i++) {
    if (pendingRequests[i].url === config.url) {
      pendingRequests[i].cancel(); // 中断请求
      pendingRequests.splice(i, 1);
    }
  }
};

instance.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('access_token');
    removePendingRequest(config);
    config.cancelToken = new axios.CancelToken(function executor(c) {
      pendingRequests.push({ url: config.url, cancel: c });
    });
    if (accessToken) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: accessToken ? `Bearer ${accessToken}` : ''
        }
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    /**
     * status含义
     * -1 服务端错误
     *  0 OK
     *  1 用户错误
     *  2 token过期
     */
    if (response?.status === 0) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error?.message?.includes?.('timeout')) {
      console.error('timeout');
    } else {
      console.error(
        codeMessage?.[error?.response?.status]
      );
      if (error?.response?.status === 403) console.error('403');
    }
    Promise.reject(error);
  }
);

export default {
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, data) {
    return instance.post(url, data);
  },
  put(url, data) {
    return instance.put(url, data);
  },
  delete(url) {
    return instance.delete(url);
  },
  cancelAllRequests() {
    pendingRequests.forEach(req => {
      req.cancel && req.cancel();
    });
    pendingRequests = [];
  }
};
