<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <div class="h-$z-header-height flex justify-center items-center p-2 b-b b-b-dashed whitespace-nowrap">
    <img src="@/assets/vue.svg" class="max-h-full" />
    <span v-show="!collapsed" class="ml-2 font-bold">Zero Admin Naive</span>
  </div>
</template>
