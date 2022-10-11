import { AxiosResponse } from 'axios'
import request from '@/utils/request'

// 按照ID获取用户
export const getUserById = (params: {
  id: number
}): Promise<AxiosResponse> => request({
  url: '/users',
  method: 'get',
  params
})

// 添加用户
export const addUser = (data: {
  id: number
  name: string
}): Promise<AxiosResponse> => request({
  url: '/users',
  method: 'post',
  data
})
