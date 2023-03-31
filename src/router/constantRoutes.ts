import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout.vue'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '控制台',
          icon: 'ant-design:dashboard-outlined'
        }
      }
    ]
  }
]

export default constantRoutes
