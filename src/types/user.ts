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
