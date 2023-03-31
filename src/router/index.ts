import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { filterRoutes } from '@/utils/auth'
import constantRoutes from './constantRoutes'
import asyncRoutes from './asyncRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 全局前置守卫
router.beforeEach(async (to, _from, next) => {
  window.$loadingBar.start()
  const userStore = useUserStore()
  // 若已有token
  if (userStore.token) {
    // 若目标是登录页，则重定向到首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (userStore.roles && userStore.roles.length) {
        // 若已获取用户角色列表，则直接进入
        next()
      } else {
        // 未获取用户角色列表，则先获取
        try {
          // 获取用户信息
          await userStore.getInfo()

          // 基于角色生成可访问的异步路由
          const accessAsyncRoutes = filterRoutes(asyncRoutes, userStore.roles)
          // 保存合并后的路由表
          userStore.routes = [...constantRoutes, ...accessAsyncRoutes]

          // 动态添加可访问的异步路由
          accessAsyncRoutes.forEach((item: RouteRecordRaw) => router.addRoute(item))

          //设置replace为true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 获取用户信息失败，则退出登录后重定向到登录页
          userStore.logout()
          next('/login?redirect=' + to.fullPath)
        }
      }
    }
  } else {
    // 无token时
    // 免登录白名单
    const whiteList = ['/login']
    if (whiteList.includes(to.path)) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面，则重定向到登录页
      next('/login?redirect=' + to.fullPath)
    }
  }
})

router.afterEach(to => {
  useTitle([to.meta?.title, 'Zero Admin Naive'].join(' - '))
  window.$loadingBar.finish()
})

export default router
