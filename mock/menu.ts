// 菜单列表
const menuList = [
  {
    id: 1,
    icon: 'icon-home-fill',
    name: '首页',
    path: '/home'
  },
  {
    id: 2,
    icon: 'icon-setting-fill',
    name: '系统管理',
    path: '/systemmanagement',
    children: [
      {
        id: 3,
        icon: 'icon-user',
        name: '用户管理',
        path: '/users'
      },
      {
        id: 4,
        icon: 'icon-team',
        name: '角色管理',
        path: '/roles'
      },
      {
        id: 5,
        icon: 'icon-menu',
        name: '菜单管理',
        path: '/menus'
      },
      {
        id: 6,
        icon: 'icon-apartment',
        name: '部门管理',
        path: '/departments'
      },
      {
        id: 7,
        icon: 'icon-edit-square',
        name: '参数设置',
        path: '/parameters'
      },
      {
        id: 8,
        icon: 'icon-message',
        name: '通知公告',
        path: '/announcements'
      }
    ]
  },
  {
    id: 9,
    icon: 'icon-video-fill',
    name: '系统监控',
    path: '/systemmonitoring',
    children: [
      {
        id: 10,
        icon: 'icon-wifi',
        name: '在线用户',
        path: '/onlineuser'
      },
      {
        id: 11,
        icon: 'icon-linechart',
        name: '数据监控',
        path: '/datamonitoring'
      }
    ]
  }
]

export default [
  // 获取菜单列表
  {
    url: 'http://localhost:3000/menus',
    type: 'get',
    template: {
      status: 200,
      message: '获取成功',
      data: menuList
    }
  }
]
