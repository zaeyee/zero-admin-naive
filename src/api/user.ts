import type { LoginModel, UserModel } from '@/types/user'

import request from '@/utils/request'

// 用户登录
export const login = (data: LoginModel) => request.post('/login', data)
// 获取登录信息
export const fetchMe = () => request.get('/me')

// 获取用户列表
export const fetchUsers = (page: number, pageSize: number) => request.get('/users', { params: { page, pageSize } })
// 创建用户
export const createUser = (data: UserModel) => request.post('/users', data)
// 更新用户
export const updateUser = (_id: string, data: UserModel) => request.put('/users/' + _id, data)
// 删除用户
export const deleteUser = (_id: string) => request.delete('/users/' + _id)
