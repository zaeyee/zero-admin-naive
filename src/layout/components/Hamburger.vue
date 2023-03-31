<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <button
    z-icon-btn
    transition="transform duration-300"
    :class="{ 'rotate-z-180': modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <SvgIcon name="ant-design:menu-fold-outlined" :size="20" />
  </button>
</template>
