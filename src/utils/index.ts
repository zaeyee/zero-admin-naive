import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption, DropdownOption } from 'naive-ui'
import { resolve } from 'path-browserify'

import SvgIcon from '@/components/SvgIcon.vue'
import { isExternal } from './validator'

// 渲染图标
export const icon = (name: string, props = {}) => {
  return () => h(SvgIcon, { name, ...props })
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
export const generateMenus = (routes: RouteRecordRaw[], basePath = '/') => {
  const menus: MenuOption[] = []
  routes.forEach(item => {
    // 若指定隐藏则不显示
    if (item.meta?.hidden) return
    // 若该父路由无title信息
    if (!item.meta?.title) {
      // 且没有子路由则不显示
      if (!item.children?.length) return
      // 但有子路由则递归生成子路由菜单
      menus.push(...generateMenus(item.children, item.path))
      return
    }
    // 否则生成该父路由菜单
    const path = resolvePath(item.path, basePath)
    menus.push({
      key: path,
      label: item.meta?.title,
      icon: typeof item.meta?.icon === 'string' ? icon(item.meta.icon) : undefined,
      children: item.children?.length ? generateMenus(item.children, path) : undefined
    })
  })
  return menus
}

// 基于路由生成面包屑导航
export const generateBreadcrumbs = (routes: RouteRecordRaw[]) => {
  const breadcrumbs: DropdownOption[] = []
  routes.forEach(item => {
    // 若指定隐藏则不显示
    if (item.meta?.breadcrumb === false) return
    // 若该父路由无title信息
    if (!item.meta?.title) return
    breadcrumbs.push({
      key: item.name as string,
      label: item.meta.title,
      icon: typeof item.meta?.icon === 'string' ? icon(item.meta.icon) : undefined,
      children: item.children?.length ? generateBreadcrumbs(item.children) : undefined
    })
  })
  return breadcrumbs
}
