<script setup lang="ts">
import { generatorMenus } from '@/utils/index'

const route = useRoute()
const router = useRouter()
const breadcrumbList = computed(() => generatorMenus(route.matched))

const onItemSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumbList" :key="item.key">
      <n-dropdown v-if="item.children?.length" :options="item.children" show-arrow @select="onItemSelect">
        <span>
          <component :is="item.icon" />
          {{ item.label }}
        </span>
      </n-dropdown>
      <span v-else>
        <component :is="item.icon" />
        {{ item.label }}
      </span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
