<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
// import { useUserStore } from '@/stores/user'

defineProps<{
  collapsed: boolean
}>()

// const userStore = useUserStore()
const menuOptions: MenuOption[] = []
</script>

<template>
  <n-menu :collapsed="collapsed" :options="menuOptions" />
</template>
