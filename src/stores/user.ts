import type { RouteRecordRaw } from 'vue-router'
import type { LoginModel, UserRow } from '@/types/user'
import { login, fetchMe } from '@/api/user'

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
      const { token } = await login(model)
      this.token = token
      localStorage.setItem('token', token)
    },
    // 加载登录信息
    async loadMe() {
      const { roles, profile } = await fetchMe()
      if (!roles || roles.length <= 0) {
        throw new Error('用户至少需要有一个角色')
      }
      this.roles = roles
      this.profile = profile
    },
    // 清除数据
    clear() {
      this.$reset()
      localStorage.removeItem('token')
    }
  }
})
