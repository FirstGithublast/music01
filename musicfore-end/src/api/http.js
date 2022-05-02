import axios from "axios"
axios.defaults.timeout = 5000;  //超时时间设置
axios.defaults.withCredentials = true;  //true允许跨域
axios.defaults.baseURL='http://localhost:8088'
//Content-Type 响应头
const request=axios.create({
  headers: {
    'Content-Type':"application/json;charset=utf-8"
  }
})
request.interceptors.request.use(config=>{
  config.headers['Authorization'] = localStorage.getItem("token")
  return config;
})
//响应拦截器
request.interceptors.response.use(
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    response=>{
      if (response.status === 200){
        return Promise.resolve(response)
      }else {
        return Promise.reject(response)
      }
    },
// 服务器状态码不是2开头的的情况
    error => {
      if (error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
          case 401:
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
            break;
          case 403:
            // console.log('管理员权限已修改请重新登录')
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            setTimeout(() => {
              router.replace({
                path: '/',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              });
            }, 1000);
            break;

            // 404请求不存在
          case 404:
            // console.log('请求页面飞到火星去了')
            break;
        }
        return Promise.reject(error.response);
      }
    });

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    request.post(url, data)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err)
        })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deletes(url, data = {}) {
  return new Promise((resolve, reject) => {
    request.delete(url, data)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err)
        })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    request.put(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
  })
}

