<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  name: unknown
}>()
</script>

<template>
  <Icon :icon="name" />
</template>
