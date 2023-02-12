<script setup lang="ts">
const columns = reactive([
  { type: 'selection', width: 50 },
  { type: 'index', title: '序号', width: 60 },
  { key: 'name', title: '角色名称' },
  { key: 'createdAt', title: '创建时间' },
  { key: 'operation', title: '操作', fixed: 'right' }
])
const data = reactive([
  { name: 'ss', createdAt: 'sss' },
  { name: 'ss', createdAt: 'sss' }
])
</script>

<template>
  <n-card :bordered="false">
    <n-space justify="space-between" align="center" class="mb-2">
      <n-button type="primary">添加角色</n-button>
      <div>
        <n-button secondary circle type="info" size="small">
          <SvgIcon name="ant-design:setting-outlined" />
        </n-button>
      </div>
    </n-space>

    <n-data-table :columns="columns" :data="data" :bordered="false" striped />
  </n-card>
</template>
