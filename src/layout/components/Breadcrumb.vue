<script setup lang="ts">
import { generateBreadcrumbs } from '@/utils/index'

const route = useRoute()
const router = useRouter()

const list = computed(() => generateBreadcrumbs(route.matched))

const dropdownSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="(item, index) in list" :key="item.key" :clickable="index !== list.length - 1">
      <n-dropdown v-if="item.children?.length" :options="item.children" show-arrow @select="dropdownSelect">
        <span>
          <component :is="item.icon" />
          {{ item.label }}
        </span>
      </n-dropdown>
      <template v-else>
        <component :is="item.icon" />
        {{ item.label }}
      </template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
