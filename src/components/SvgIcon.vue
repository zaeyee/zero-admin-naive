<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  name: string
}>()
</script>

<template>
  <n-icon>
    <Icon :icon="name" />
  </n-icon>
</template>
