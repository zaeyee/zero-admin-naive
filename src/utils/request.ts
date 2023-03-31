import axios from 'axios'
import { network } from '@/config/index'
import { useUserStore } from '@/stores/user'

const service = axios.create({
  baseURL: network.baseURL,
  timeout: network.timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求前，附加token到headers上
    const userStore = useUserStore()
    const token = userStore.token || localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // 处理请求错误
    window.$message.error(error.message)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { data } = response
    const router = useRouter()
    const userStore = useUserStore()
    // 处理自定义响应状态码
    switch (data.code) {
      case 200:
        // 响应正常返回响应数据
        return data
      case 401:
        // 处理token无效情况
        userStore.logout()
        window.$message.error('请先登录')
        router.replace('/login')
        break
      case 422:
        // 处理参数错误情况
        window.$message.error(data.message)
        break
      default:
        // 处理服务器错误情况
        window.$dialog.error({
          title: 'Error: ' + data.code,
          content: data.message,
          closeOnEsc: false,
          maskClosable: false
        })
        break
    }
    return Promise.reject(data.message || 'Error')
  },
  error => {
    // 处理网络超时或http状态码非200
    const message = error.response?.data?.message
    if (message) {
      window.$message.error(message)
    } else {
      window.$dialog.error({
        title: error.name,
        content: error.message,
        closeOnEsc: false,
        maskClosable: false
      })
    }
    return Promise.reject(error)
  }
)

export default service
