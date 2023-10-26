<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <button class="u-icon-btn" @click="toggle">
    <SvgIcon
      :name="isFullscreen ? 'ant-design:fullscreen-exit-outlined' : 'ant-design:fullscreen-outlined'"
      :size="20"
    />
  </button>
</template>
