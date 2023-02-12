import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { resolve } from 'path-browserify'

import SvgIcon from '@/components/SvgIcon.vue'
import { isExternal } from './validator'

// 渲染图标
export const renderIcon = (name: unknown) => {
  if (!name) return
  return () => h(SvgIcon, { name })
}

// 处理菜单的路径
const resolvePath = (path: string, basePath?: string) => {
  if (isExternal(path) || !basePath) {
    return path
  }
  if (isExternal(basePath)) {
    return basePath
  }
  return resolve(basePath, path)
}

// 基于路由生成菜单
export const generatorMenus = (routes: RouteRecordRaw[], basePath = '/') => {
  const menus: MenuOption[] = []
  routes.forEach(item => {
    // 若指定隐藏则不显示
    if (item.meta?.hidden) return
    // 若该父路由无meta信息
    if (!item.meta) {
      const children = item?.children?.filter(child => !child?.meta?.hidden)
      // 且只有一个子路由显示，则菜单为该子路由
      if (children?.length === 1) {
        item = children[0]
      }
    }
    menus.push({
      key: resolvePath(item.path, basePath),
      label: item.meta?.title,
      icon: renderIcon(item.meta?.icon),
      children: item.children?.length ? generatorMenus(item.children, item.path) : undefined
    })
  })
  return menus
}
