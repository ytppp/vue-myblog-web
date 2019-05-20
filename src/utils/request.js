import axios from 'axios'
import router from '@/router'

let service = axios.create({
  baseURL: '',
  timeout: 3000
})

// 兼容ie ie浏览器在请求数据时，url不会自动编码，当url出现中文时会报错
service.interceptors.request.use((config) => {
  config.url = encodeURI(config.url)
  return config
}, (error) => {
  console.log('请求出错', error) // for debug 
  return Promise.reject(error) // for debug
})

service.interceptors.response.use((response) => {
  // 返回为jsonp格式的数据
  if (typeof response.data === 'string') {
    let num1 = response.data.indexOf('(')
    let num2 = response.data.lastIndexOf(')')
    let resultData = JSON.parse(response.data.substring(num1 + 1, num2))
    return resultData
  }

  if (!response.data.success) {
    if (response.data.code === 9) {
      router.push('/login')
    }

    this.$message.error(response.data.message)
  }
  return response
}, (err) => {
  console.log(err)// for debug
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)'; break
      case 401: err.message = '未授权，请重新登录(401)'; break
      case 403: err.message = '拒绝访问(403)'; break
      case 404: err.message = '请求出错(404)'; break
      case 408: err.message = '请求超时(408)'; break
      case 500: err.message = '服务器错误(500)'; break
      case 501: err.message = '服务未实现(501)'; break
      case 502: err.message = '网络错误(502)'; break
      case 503: err.message = '服务不可用(503)'; break
      case 504: err.message = '网络超时(504)'; break
      case 505: err.message = 'HTTP版本不受支持(505)'; break
      default: err.message = `连接出错(${err.response.status})!`
    }
  } else if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
    err.message = '请求超时!'
  } else {
    err.message = '连接服务器失败!'
  }
  this.$message.error(err)
  return Promise.reject(err)
})

export function converFormData (data) {
  let formData = new FormData()
  Object.keys(data).forEach(function (key) {
    formData.append(key, data[key])
  })
  return formData
}

export default service
