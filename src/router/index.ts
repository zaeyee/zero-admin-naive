import { createRouter, createWebHistory } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { filterRoutes } from '@/utils/index'
import constantRoutes from './constantRoutes'
import asyncRoutes from './asyncRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

const whiteList = ['/login']

// 全局前置守卫
router.beforeEach(async (to, _from, next) => {
  window.$loadingBar.start()
  const userStore = useUserStore()
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (userStore.roles?.length) {
        next()
      } else {
        try {
          await userStore.loadMe()
          // 基于角色生成可访问的异步路由
          const accessAsyncRoutes = filterRoutes(asyncRoutes, userStore.roles)
          // 保存合并后的路由表
          userStore.routes = [...constantRoutes, ...accessAsyncRoutes]
          // 动态添加可访问的异步路由
          accessAsyncRoutes.forEach(route => router.addRoute(route))
          next({ ...to, replace: true })
        } catch (error) {
          userStore.clear()
          next('/login?redirect=' + to.fullPath)
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login?redirect=' + to.fullPath)
    }
  }
})

router.afterEach(to => {
  useTitle([to.meta?.title, 'Zero Admin Naive'].join(' - '))
  window.$loadingBar.finish()
})

export default router
