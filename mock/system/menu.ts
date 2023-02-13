import type { MockMethod } from 'vite-plugin-mock'

import { successResult } from '../_util'

export default [
  {
    url: '/api/system/menu',
    method: 'get',
    response: () =>
      successResult([
        {
          id: '1',
          path: '/',
          redirect: '/dashboard',
          component: 'Layout',
          children: [
            {
              id: '1-1',
              path: 'dashboard',
              name: 'Dashboard',
              component: '@/views/dashboard.vue',
              meta: {
                title: '控制台',
                icon: 'ant-design:dashboard-outlined'
              }
            }
          ]
        },
        {
          id: '2',
          path: '/system',
          name: 'System',
          component: 'Layout',
          meta: {
            title: '系统管理',
            icon: 'ant-design:setting-outlined'
          },
          children: [
            {
              id: '2-1',
              path: 'menu',
              name: 'Menu',
              component: '@/views/system/menu.vue',
              meta: {
                title: '菜单管理'
              }
            },
            {
              id: '2-2',
              path: 'role',
              name: 'Role',
              component: '@/views/system/role.vue',
              meta: {
                title: '角色管理'
              }
            },
            {
              id: '2-3',
              path: 'user',
              name: 'User',
              component: '@/views/dashboard.vue',
              meta: {
                title: '用户管理'
              }
            }
          ]
        }
      ])
  }
] as MockMethod[]
