import { AxiosResponse } from 'axios'
import request from '@/utils/request'

// 获取用户列表
export const getUserListApi = (params: {
  current: number
  size: number
  search?: string
}): Promise<AxiosResponse> => request({
  url: '/users',
  method: 'get',
  params
})

// 按照ID获取用户
export const getUserByIdApi = (id: number): Promise<AxiosResponse> => request({
  url: `/users/${id}`,
  method: 'get'
})

// 设置用户状态
export const setUserStatusApi = (data: {
  id: number
  status: boolean
}): Promise<AxiosResponse> => request({
  url: '/users/setstatus',
  method: 'put',
  data
})

// 添加用户
export const addUserApi = (data: {
  username: string
  email: string
  phone: string
  role_name: string
}): Promise<AxiosResponse> => request({
  url: '/users',
  method: 'post',
  data
})

// 修改用户
export const updateUserApi = (data: {
  id: number
  email: string
  phone: string
}): Promise<AxiosResponse> => request({
  url: '/users',
  method: 'put',
  data
})

// 删除用户
export const deleteUserApi = (id: number): Promise<AxiosResponse> => request({
  url: `/users/${id}`,
  method: 'delete'
})
