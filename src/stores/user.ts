import type { RouteRecordRaw } from 'vue-router'
import type { LoginModel, UserRow } from '@/api/user'
import { login, getInfo } from '@/api/user'

export interface UserState {
  token: string
  roles: string[]
  profile: UserRow | Record<string, string>
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
    async login(model: LoginModel) {
      const { data } = await login(model)
      const { token } = data
      this.token = token
      localStorage.setItem('token', token)
    },
    // 获取登录信息
    async getInfo() {
      const { data } = await getInfo()
      const { roles, profile } = data
      if (!roles || roles.length <= 0) {
        throw new Error('用户至少需要有一个角色')
      }
      this.roles = roles
      this.profile = profile
    },
    // 退出登录
    logout() {
      this.token = ''
      this.profile = {}
      localStorage.removeItem('token')
    }
  }
})
