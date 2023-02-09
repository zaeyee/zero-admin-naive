import request from '@/utils/request'

// 用户登录
export const login = (data: unknown) => request.post('/login', data)
// 获取用户信息
export const getInfo = () => request.get('/getInfo')

// // 获取用户列表
// export const getUsers = params => request.get('/users', params)
// // 创建用户
// export const createUser = data => request.post('/users', data)
// // 更新用户
// export const updateUser = (id, data) => request.put('/users/' + id, data)
// // 删除用户
// export const deleteUser = id => request.delete('/users/' + id)
