<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { useUserStore } from '@/stores/user'

defineProps<{
  collapsed: boolean
}>()

// 基于路由生成菜单
const generatorMenus = (routes: RouteRecordRaw[]) => {
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
      key: item.name as string,
      label: item.meta?.title,
      children: item.children?.length ? generatorMenus(item.children) : undefined
    })
  })
  return menus
}

const userStore = useUserStore()
const menuOptions = computed(() => generatorMenus(userStore.routes))
</script>

<template>
  <n-menu :collapsed="collapsed" :options="menuOptions" />
</template>
