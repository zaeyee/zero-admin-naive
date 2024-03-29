import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Layout.vue'

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'ant-design:setting-outlined',
      auth: ['admin']
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user.vue'),
        meta: {
          title: '用户管理'
        }
      }
    ]
  }
]

export default asyncRoutes
