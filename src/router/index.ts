import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import Layout from '@/layout/Layout.vue'
import Home from '@/views/Home.vue'
import Users from '@/views/system-management/Users.vue'
import DataMonitoring from '@/views/system-monitoring/DataMonitoring.vue'

NProgress.configure({ showSpinner: false }) // 显示右上角螺旋加载提示

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'users',
        name: 'users',
        component: Users
      },
      {
        path: 'datamonitoring',
        name: 'datamonitoring',
        component: DataMonitoring
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开始进度条
  next()
})

// 路由后置守卫
router.afterEach(() => NProgress.done()) // 结束进度条

export default router
