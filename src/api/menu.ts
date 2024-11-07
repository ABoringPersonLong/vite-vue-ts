import { AxiosResponse } from 'axios'
import request from '@/utils/request'

// 获取菜单列表
export const getMenuListApi = (): Promise<AxiosResponse> => request({
  url: '/menus',
  method: 'get'
})
