import request from '@/utils/request'

// 获取菜单列表
export const getMenus = () => request.get('/api/system/menu')
