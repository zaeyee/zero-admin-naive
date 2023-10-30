import { useUserStore } from '@/stores/user'

// 鉴权（用户是否有某一个角色）
const isAuth = (role: string) => {
  const userStore = useUserStore()
  return userStore.roles.some(item => item === role)
}

export const useAuth = (role: string | string[], every?: boolean) => {
  if (Array.isArray(role)) {
    // 若every为true，全部角色符合才可，否则一个角色符合即可
    return every ? role.every(item => isAuth(item)) : role.some(item => isAuth(item))
  }
  return isAuth(role)
}
