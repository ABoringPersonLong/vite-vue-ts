import Mock from 'mockjs'
import user from './user'
import menu from './menu'

user.forEach(item => Mock.mock(item.url, item.type, item.template)) // 用户管理
menu.forEach(item => Mock.mock(item.url, item.type, item.template)) // 菜单管理
