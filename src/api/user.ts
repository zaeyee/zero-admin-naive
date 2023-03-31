import request from '@/utils/request'

export interface LoginModel {
  username: string
  password: string
}

export interface UserModel {
  _id?: string
  username: string
  password?: string
  nickname?: string
  avatar?: string
  status: 0 | 1
}

export interface UserRow extends UserModel {
  _id: string
  createdAt: string
  updatedAt: string
  avatarUrl: string
}

// 用户登录
export const login = (data: LoginModel) => request.post('/login', data)
// 获取登录信息
export const getInfo = () => request.get('/me')

// 获取用户列表
export const getUsers = (page: number, pageSize: number) => request.get('/users', { params: { page, pageSize } })
// 创建用户
export const createUser = (data: UserModel) => request.post('/users', data)
// 更新用户
export const updateUser = (_id: string, data: UserModel) => request.put('/users/' + _id, data)
// 删除用户
export const deleteUser = (_id: string) => request.delete('/users/' + _id)
