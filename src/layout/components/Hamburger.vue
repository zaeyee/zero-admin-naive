<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <button z-icon-btn @click="$emit('update:modelValue', !modelValue)">
    <SvgIcon :name="modelValue ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'" :size="20" />
  </button>
</template>
