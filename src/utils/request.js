import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://www.dogjun.com/api'
} else {
  axios.defaults.baseURL = 'http://localhost:3000/api'
}
// 请求拦截
axios.interceptors.request.use(
  config => {
    // 发送请求之前做一些处理
    return config
  },
  error => {
    // 当请求异常时做一些处理
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    console.log(error)
    // Vue.prototype.$toast(error)
    // return Promise.resolve(error.response)
  }
)

export default {
  post (url, data) {
    return axios({
      method: 'post',
      data: qs.stringify(data),
      url
    }).then(res => {
      const result = res.data
      return Promise.resolve(result)
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params
    }).then(res => {
      const result = res.data
      return Promise.resolve(result)
    })
  }
}
