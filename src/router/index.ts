import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

NProgress.configure({ showSpinner: false }) // 显示右上角螺旋加载提示

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/system-management/Users.vue')
      },
      {
        path: 'datamonitoring',
        name: 'datamonitoring',
        component: () => import('@/views/system-monitoring/DataMonitoring.vue')
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
