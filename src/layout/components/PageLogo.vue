<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <div flex justify-center items-center p-2 b-b b-b-dashed h-12 whitespace-nowrap>
    <img src="@/assets/vue.svg" alt="LOGO" max-h-full />
    <span v-show="!collapsed" ml-2 font-bold>Zero Admin Naive</span>
  </div>
</template>
