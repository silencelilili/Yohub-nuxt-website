import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleError, handelCodeError } from './handleError';
import { getProcessEnv } from '@/global/env';

function createRequestInstance(getServerUrl: () => string): AxiosInstance {
  const instance = axios.create({
    timeout: 1000 * 60 * 5, // 超时时间
    withCredentials: true, // 允许跨域携带cookie
    baseURL: `${getServerUrl()}/`, // 请求地址
  });

  instance.interceptors.request.use((config: any) => {
    const headers = config.headers || {};
    // 这个地方可以自定义请求头
    config.headers = {
      contentType: 'application/json',
      ...headers,
      // language: 'en', // 这个是自定义的请求头，还可以加 token 等
    };
    return config;
  });
  instance.interceptors.response.use(
    async (res) => {
      const { config, data } = res;
      if (data.ret != 0) {
        return data;
      } else {
        const err = await handelCodeError(data); // 调用我们自定义的 错误处理方法
        return Promise.reject(err);
      }
    },
    async (err) => {
      err = await handleError(err); // 调用我们自定义的 错误处理方法
      if (err.isUnAuthorized) {
        // 未授权的情况的处理
      }
      // 还可以自定义其他的情况的处理
      return Promise.reject(err);
    },
  );
  return instance;
}

class API {
  request!: ReturnType<typeof createRequestInstance>;

  get!: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => Promise<R>;

  delete!: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => Promise<R>;

  head!: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => Promise<R>;

  options!: <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => Promise<R>;

  post!: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;

  put!: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;

  patch!: <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;

  constructor(options: { getServerUrl: () => string }) {
    const request = createRequestInstance(options.getServerUrl);
    this.request = request;
    this.post = request.post.bind(this);
    this.put = request.put.bind(this);
    this.get = request.get.bind(this);
    this.delete = request.delete.bind(this);
    this.head = request.head.bind(this);
    this.options = request.options.bind(this);
    this.patch = request.patch.bind(this);
  }
}

const $api = new API({
  getServerUrl: () => {
    return `${getProcessEnv('SERVER_URL') || ''}`;
  },
});
export default $api;
