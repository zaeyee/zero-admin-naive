import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout.vue'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
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
          title: '仪表盘',
          icon: 'ant-design:dashboard-outlined'
        }
      }
    ]
  },
  {
    path: '/examples',
    name: 'examples',
    component: Layout,
    meta: {
      title: '功能示例',
      icon: 'ant-design:appstore-outlined',
      auth: ['admin']
    },
    children: [
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@/views/examples/permission.vue'),
        meta: {
          title: '权限校验'
        }
      }
    ]
  }
]

export default constantRoutes
