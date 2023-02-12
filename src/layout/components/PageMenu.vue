<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { generatorMenus } from '@/utils/index'
import { isExternal } from '@/utils/validator'

defineProps<{
  collapsed: boolean
}>()

const userStore = useUserStore()
const menus = computed(() => generatorMenus(userStore.routes))
const router = useRouter()

const onItemClick = (key: string) => {
  isExternal(key) ? window.open(key) : router.push(key)
}
</script>

<template>
  <n-menu
    :options="menus"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    @update:value="onItemClick"
  />
</template>
