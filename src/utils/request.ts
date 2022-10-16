import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000
})

let loadingInstance: any = null // 存放加载组件的实例

// 请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
  loadingInstance = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.3)'
  })
  return config
}, (error: AxiosError) => {
  loadingInstance.close()
  ElMessage.error('请求失败！')
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  loadingInstance.close()
  return response
}, (error: AxiosError) => {
  loadingInstance.close()
  ElMessage.error('请求失败！')
  return Promise.reject(error)
})

export default service
