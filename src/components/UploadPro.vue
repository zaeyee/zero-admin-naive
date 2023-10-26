<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui'

const props = defineProps<{
  modelValue?: string
  valueFn: (response: unknown) => string
}>()

const emit = defineEmits(['update:modelValue', 'on-finish', 'on-remove'])

const fileList = ref<UploadFileInfo[]>([])

const onFinish = (options: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const response = JSON.parse((options.event?.target as XMLHttpRequest).response)
  const value = props.valueFn(response.data)
  emit('update:modelValue', value)
  emit('on-finish', options)
}

const onRemove = (options: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  emit('update:modelValue', '')
  emit('on-remove', options)
}

watch(
  () => props.modelValue,
  newVal => {
    fileList.value = newVal ? [{ id: 'upload-pro', name: 'upload-pro', url: newVal, status: 'finished' }] : []
  },
  { immediate: true }
)
</script>

<template>
  <n-upload v-model:file-list="fileList" :max="1" list-type="image-card" @finish="onFinish" @remove="onRemove">
    <slot></slot>
  </n-upload>
</template>

<style scoped>
:deep(.n-upload-file-list) {
  display: block !important;
}

:deep(.n-upload-file),
:deep(.n-upload-trigger) {
  width: 100% !important;
  height: 160px !important;
}

:deep(.n-image) {
  height: 100% !important;
}

:deep(.n-image img) {
  object-fit: cover !important;
}
</style>
