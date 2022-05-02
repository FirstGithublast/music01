import axios from 'axios';
import router from "./router";
import Elementui from 'element-ui'

axios.defaults.baseURL = "http://localhost:8088"
//设置axios默认参数
const request = axios.create({
  timeout: 500,
  headers: {
    'Content-Type': "application/json; charset=utf-8"
  }
})

request.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem("token")
  return config;
})

request.interceptors.response.use(response => {
  let res = response.data

  if (res.code === 200) {
    return response
  } else {
    Elementui.Message.error(!res.msg ? "系统异常" : res.msg)
    return Promise.reject("resolve:" + response.data.msg)
  }
}, error => {
  if (error.response.data) {
    error.message = error.response.data.msg
  }

  if (error.response.status === 401) {
    router.push("/login")
  }
  if (error.response.status === 404) {
    Elementui.Message.error("没有发现此页面", {duration: 3000})
    return Promise.reject("没有发现此页面")
  }
  //duration:弹窗时限
  Elementui.Message.error(error.message, {duration: 3000})
  return Promise.reject("后置" + error.message)
})
export default request