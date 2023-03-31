import type { MockMethod } from 'vite-plugin-mock'

import { successResult, failResult } from './_util'

const users = [
  { _id: '01', username: 'admin', password: '', status: 1 },
  { _id: '02', username: 'test', password: '', status: 1 }
]

export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      if (username !== 'admin' || password !== '123456') {
        return failResult('账号密码错误', 422)
      }
      return successResult({
        token: 'admin'
      })
    }
  },
  {
    url: '/api/me',
    method: 'get',
    response: ({ headers }) => {
      const { authorization } = headers
      if (authorization !== 'admin') {
        return failResult('token无效', 401)
      }
      return successResult({
        roles: ['admin'],
        profile: {
          username: 'admin',
          nickname: '超级管理员'
        }
      })
    }
  },
  {
    url: '/api/users',
    method: 'get',
    response: ({ headers, query }) => {
      const { authorization } = headers
      if (authorization !== 'admin') {
        return failResult('token无效', 401)
      }
      const { page, pageSize } = query
      const startIndex = (page - 1) * pageSize
      return successResult({
        list: users.slice(startIndex, startIndex + pageSize),
        total: users.length
      })
    }
  },
  {
    url: '/api/users',
    method: 'post',
    response: ({ headers, body }) => {
      const { authorization } = headers
      if (authorization !== 'admin') {
        return failResult('token无效', 401)
      }
      const { username } = body
      if (users.find(item => item.username === username)) {
        return failResult('用户名重复')
      }
      return successResult(body)
    }
  }
] as MockMethod[]
