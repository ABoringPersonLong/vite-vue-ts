import Mock, { MockjsRequestOptions } from 'mockjs'

// 定义类型
interface UserType { // 用户类型
  id: number
  username: string
  email: string
  phone: string
  role_name: string
  status: boolean
}

// 用户列表
const userList: UserType[] = Mock.mock({
  'data|35': [
    {
      id: '@id()',
      username: '@cname()',
      email: '@email()',
      phone: /^1[35789]\d{9}$/,
      'role_name|1': ['管理员', '经理', '普通用户'],
      status: '@boolean()'
    }
  ]
}).data.map((item: any) => ({ ...item, id: parseInt(item.id) })) // 点出里面的数组并将ID转成数字类型

export default [
  // 获取用户列表
  {
    url: /http:\/\/localhost:3000\/users\?current=\d+&size=\d+&search=\w*/,
    type: 'get',
    template: (options: MockjsRequestOptions): any => {
      // 获取请求参数
      const { url } = options
      const params = url.substring(url.indexOf('?') + 1).split('&')
      const current = +params[0].split('=')[1]
      const size = +params[1].split('=')[1]
      const search = decodeURI(params[2].split('=')[1])

      // 搜索并分页
      const c = (current - 1) * size
      const tempUserList = userList.filter(item => item.username.includes(search)).slice(c, size + c)

      // 响应数据
      return {
        status: 200,
        message: '获取成功',
        total: userList.length,
        data: tempUserList
      }
    }
  },
  // 按照ID获取用户
  {
    url: /http:\/\/localhost:3000\/users\/\d+/,
    type: 'get',
    template: (options: MockjsRequestOptions): any => {
      // 获取请求参数
      const { url } = options
      const id = +url.substring(url.lastIndexOf('/') + 1)

      // 按照ID查找
      const user = userList.find(item => item.id === id)

      // 响应数据
      return {
        status: 200,
        message: '获取成功',
        data: user
      }
    }
  },
  // 设置用户状态
  {
    url: 'http://localhost:3000/users/setstatus',
    type: 'put',
    template: (options: MockjsRequestOptions): any => {
      // 获取请求参数
      const params = JSON.parse(options.body)

      // 设置状态
      const flag = userList.some(item => {
        if (item.id === params.id) {
          item.status = params.status
          return true
        }
        return false
      })

      // 响应数据
      return flag
        ? {
          status: 200,
          message: '设置成功'
        }
        : {
          status: 500,
          message: '设置失败'
        }
    }
  },
  // 添加用户
  {
    url: 'http://localhost:3000/users',
    type: 'post',
    template: (options: MockjsRequestOptions): any => {
      // 获取请求参数
      const params = JSON.parse(options.body)

      // 校验数据
      if (!params.username || !params.password || !params.email || !params.phone) return { status: 500, message: '添加失败' }

      // 添加用户
      delete params.password
      userList.push({
        ...params,
        id: Date.now() + Math.floor(Math.random() * 9000) + 1000,
        role_name: '普通用户',
        status: true
      })

      // 响应数据
      return { status: 200, message: '添加成功' }
    }
  },
  // 修改用户
  {
    url: 'http://localhost:3000/users',
    type: 'put',
    template: (options: MockjsRequestOptions): any => {
      // 获取请求参数
      const params = JSON.parse(options.body)

      // 校验数据
      if (!params.email || !params.phone) return { status: 500, message: '修改失败' }

      // 修改用户
      userList.some(item => {
        if (item.id === params.id) {
          item.email = params.email
          item.phone = params.phone
          return true
        }
        return false
      })

      // 响应数据
      return { status: 200, message: '修改成功' }
    }
  },
  // 删除用户
  {
    url: /http:\/\/localhost:3000\/users\/\d+/,
    type: 'delete',
    template: (options: MockjsRequestOptions): any => {
      // 获取请求参数
      const { url } = options
      const id = +url.substring(url.lastIndexOf('/') + 1)

      // 删除用户
      userList.splice(userList.findIndex(item => item.id === id), 1)

      // 响应数据
      return { status: 200, message: '删除成功' }
    }
  }
]
