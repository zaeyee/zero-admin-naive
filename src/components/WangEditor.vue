<script setup lang="ts">
import type { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { network } from '@/config/index'

import '@wangeditor/editor/dist/css/style.css'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    mode?: 'default' | 'simple'
    height?: string
    toolbarConfig?: Partial<IToolbarConfig>
    editorConfig?: Partial<IEditorConfig>
  }>(),
  {
    modelValue: '',
    mode: 'default',
    height: '60vh',
    toolbarConfig: () => ({}),
    editorConfig: () => ({
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          fieldName: 'file',
          server: network.baseURL + '/upload/images'
        },
        uploadVideo: {
          fieldName: 'file',
          server: network.baseURL + '/upload/videos'
        }
      }
    })
  }
)

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const editorRef = shallowRef()
const onEditorCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

onBeforeUnmount(() => {
  editorRef.value?.destroy()
})
</script>

<template>
  <div class="overflow-hidden b b-solid rounded">
    <Toolbar :mode="mode" :default-config="toolbarConfig" :editor="editorRef" class="b-b b-b-solid" />
    <Editor
      v-model="value"
      :mode="mode"
      :default-config="editorConfig"
      :style="{ height }"
      class="overflow-y-hidden"
      @on-created="onEditorCreated"
    />
  </div>
</template>
