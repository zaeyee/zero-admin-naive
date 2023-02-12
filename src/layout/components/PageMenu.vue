<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { generatorMenus } from '@/utils/index'
import { isExternal } from '@/utils/validator'

defineProps<{
  collapsed: boolean
}>()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const menus = computed(() => generatorMenus(userStore.routes))

const onItemClick = (key: string) => {
  isExternal(key) ? window.open(key) : router.push(key)
}
</script>

<template>
  <n-menu
    :value="route.path"
    :options="menus"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    @update:value="onItemClick"
  />
</template>
