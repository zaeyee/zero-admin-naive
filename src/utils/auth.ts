import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 判断某路由是否有权限访问
export const isRouteAuth = (roles: string[], route: RouteRecordRaw) => {
  if (!route.meta?.auth) return true
  const auth = route.meta.auth
  return roles.some(role => auth.includes(role))
}

// 过滤出可访问的路由
export const filterRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const newRoutes: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    const newRoute = { ...route }
    if (isRouteAuth(roles, newRoute)) {
      if (newRoute.children) {
        newRoute.children = filterRoutes(newRoute.children, roles)
      }
      newRoutes.push(newRoute)
    }
  })
  return newRoutes
}

// 鉴权（用户是否有某一个角色）
export const isAuth = (role: string) => {
  const userStore = useUserStore()
  return userStore.roles.some(item => item === role)
}

// 鉴权（一个角色符合即可）
export const isAuthSome = (roles: string[]) => {
  return roles.some(item => isAuth(item))
}

// 鉴权（全部角色符合才可）
export const isAuthEvery = (roles: string[]) => {
  return roles.every(item => isAuth(item))
}
