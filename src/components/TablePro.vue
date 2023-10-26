<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import { icon } from '@/utils/index'

const props = defineProps<{
  searchOptions?: []
  page?: number
  pageSize?: number
  itemCount?: number
}>()

const emit = defineEmits(['add', 'reload', 'update:page', 'update:pageSize'])

const bordered = ref(true)
const striped = ref(true)
const size = ref<'small' | 'medium' | 'large'>('medium')
const sizeOptions = reactive([
  { label: '紧凑', value: 'small' },
  { label: '中等', value: 'medium' },
  { label: '宽松', value: 'large' }
])

const { page, pageSize } = useVModels(props, emit)
</script>

<template>
  <n-space justify="space-between" align="center" class="mb-3">
    <!-- 左侧工具栏 -->
    <n-space align="center">
      <n-button type="primary" :render-icon="icon('ant-design:plus-outlined')" @click="$emit('add')">新增</n-button>
      <slot name="toolbar-left"></slot>
    </n-space>
    <!-- 右侧工具栏 -->
    <n-space align="center">
      <slot name="toolbar-right"></slot>
      <n-tooltip>
        <template #trigger>
          <n-button
            :render-icon="icon('ant-design:reload-outlined', { size: 16 })"
            type="primary"
            size="small"
            secondary
            circle
            @click="$emit('reload')"
          />
        </template>
        刷新
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button
            :type="bordered ? 'primary' : 'default'"
            size="small"
            secondary
            circle
            @click="bordered = !bordered"
          >
            B
          </n-button>
        </template>
        边框
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-button :type="striped ? 'primary' : 'default'" size="small" secondary circle @click="striped = !striped">
            S
          </n-button>
        </template>
        斑马纹
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <n-popselect v-model:value="size" :options="sizeOptions" trigger="click">
            <n-button
              :render-icon="icon('ant-design:column-height-outlined', { size: 16 })"
              type="primary"
              size="small"
              secondary
              circle
            />
          </n-popselect>
        </template>
        密度
      </n-tooltip>
    </n-space>
  </n-space>

  <n-data-table v-bind="$attrs" :bordered="bordered" :striped="striped" :size="size" :single-line="!bordered" />

  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :item-count="itemCount"
    :page-sizes="[10, 20, 30, 50, 100]"
    show-size-picker
    show-quick-jumper
    class="mt-3 justify-end"
    @update:page="$emit('reload')"
    @update:page-size="$emit('reload')"
  />
</template>
