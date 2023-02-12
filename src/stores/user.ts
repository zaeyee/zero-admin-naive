import type { RouteRecordRaw } from 'vue-router'

// import { login, getInfo } from '@/api/user'
import { filterRoutes } from '@/utils/auth'
import constantRoutes from '@/router/constant'
import asyncRoutes from '@/router/async'

export interface LoginForm {
  username: string
  password: string
}

export interface UserProfile {
  username?: string
  nickname?: string
  avatar?: string
}

export interface UserState {
  token: string
  roles: string[]
  profile: UserProfile
  routes: RouteRecordRaw[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    roles: [],
    profile: {},
    routes: []
  }),
  actions: {
    // 登录
    async login(userForm: LoginForm) {
      // const { data } = await login(userForm)
      // const { token } = data
      const token = userForm.username + userForm.password
      this.token = token
      localStorage.setItem('token', token)
    },
    // 获取用户信息
    async getInfo() {
      // const { data } = await getInfo()
      const data = {
        roles: ['admin'],
        username: 'admin',
        nickname: '超级管理员'
      }
      const { roles, ...profile } = data
      if (!roles || roles.length <= 0) {
        throw new Error('用户至少需要有一个角色')
      }
      this.roles = roles
      this.profile = profile
      return data
    },
    // 退出登录
    logout() {
      this.token = ''
      localStorage.removeItem('token')
    },
    // 基于角色生成可访问的异步路由
    generateRoutes(roles: string[]) {
      const newAsyncRoutes = filterRoutes(asyncRoutes, roles)
      this.routes = [...constantRoutes, ...newAsyncRoutes]
      return newAsyncRoutes
    }
  }
})
