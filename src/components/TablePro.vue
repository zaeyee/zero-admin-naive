<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
defineEmits(['add', 'reload'])

const bordered = ref(false)
const striped = ref(false)

const size = ref('medium')
const sizeOptions = reactive([
  { label: '紧凑', value: 'small' },
  { label: '中等', value: 'medium' },
  { label: '宽松', value: 'large' }
])
</script>

<template>
  <div>
    <n-space justify="space-between" align="center" class="mb-3">
      <!-- 左侧操作栏 -->
      <n-button type="primary" @click="$emit('add')">
        <template #icon>
          <SvgIcon name="ant-design:plus-outlined" />
        </template>
        新增
      </n-button>
      <!-- 右侧操作栏 -->
      <n-space>
        <n-tooltip>
          <template #trigger>
            <n-button
              secondary
              circle
              size="small"
              :type="bordered ? 'primary' : 'default'"
              @click="bordered = !bordered"
            >
              B
            </n-button>
          </template>
          边框
        </n-tooltip>
        <n-tooltip>
          <template #trigger>
            <n-button secondary circle size="small" :type="striped ? 'primary' : 'default'" @click="striped = !striped">
              S
            </n-button>
          </template>
          斑马纹
        </n-tooltip>
        <n-tooltip>
          <template #trigger>
            <n-button secondary circle type="primary" size="small" @click="$emit('reload')">
              <SvgIcon name="ant-design:reload-outlined" :size="16" />
            </n-button>
          </template>
          刷新
        </n-tooltip>
        <n-tooltip>
          <template #trigger>
            <n-popselect v-model:value="size" :options="sizeOptions" trigger="click">
              <n-button secondary circle type="primary" size="small">
                <SvgIcon name="ant-design:column-height-outlined" :size="16" />
              </n-button>
            </n-popselect>
          </template>
          密度
        </n-tooltip>
        <n-tooltip>
          <template #trigger>
            <n-button secondary circle type="primary" size="small">
              <SvgIcon name="ant-design:setting-outlined" :size="16" />
            </n-button>
          </template>
          设置
        </n-tooltip>
      </n-space>
    </n-space>

    <n-data-table v-bind="$attrs" :bordered="bordered" :striped="striped" :size="size" />
  </div>
</template>
