import Layout from '@/layout/Layout.vue'

// 固定路由
export default [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
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
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'ant-design:setting-outlined'
    },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  }
]
