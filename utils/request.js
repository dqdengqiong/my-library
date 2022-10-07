/*
 * @Description:
 * @Date: 2022-01-27 10:27:36
 * @LastEditTime: 2022-10-07 17:07:30
 */
import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';
import { baseUrl, appCode } from './env';

const service = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      'UA-MULTI-APP-CODE': appCode,
      ...config.headers,
    };
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res instanceof Blob) {
      return res;
    }
    if (res && (res.code === '20000' || res.code === '200' || res.code === 200)) {
      return res;
    }
    Vue.trackEvents({
      eventName: 'noahgroup_h5_log',
      params: {
        log_data: JSON.stringify({
          log_data: res,
          log_config_url: response.config.url,
        }),
        log_event: 'service_res',
      },
    });
    const errorMsg = (res && res.message) || '系统错误';
    Message({
      message: errorMsg,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(new Error(errorMsg));

  },
  (error) => {
    try {
      Vue.trackEvents({
        eventName: 'noahgroup_h5_log',
        params: {
          log_data: JSON.stringify({
            log_data: error.message || JSON.stringify(error),
            log_config_url: (error.config && error.config.url) || '',
          }),
          log_event: 'service_err',
        },
      });
      try {
        if (error.response.status === 401) {
          window.postMessage({ data: 'loginfail' }, '*');
        }
      } catch (e) {
        console.log('parent login function', e);
      }

      Vue.prototype.$message({
        message: error.response.data.message,
        type: 'error',
        duration: 3 * 1000,
      });
    } catch (e) {}

    return Promise.reject(error);
  },
);

export default service;
