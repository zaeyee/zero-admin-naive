<script setup lang="ts">
import { FormInst, NSpace, NButton } from 'naive-ui'

import { getMenus } from '@/api/menu'
import { renderIcon } from '@/utils/index'

interface RowData {
  id: string
  path: string
  children?: RowData[]
  meta?: {
    title: string
    icon?: string
  }
}

interface FormModel {
  id?: string
  title: string
  path: string
  icon?: string
}

// 表格
const table = reactive({
  loading: false,
  rowKey: (row: RowData) => row.id,
  columns: [
    { type: 'selection', width: 50 },
    { key: 'title', title: '菜单标题', render: (row: RowData) => row.meta?.title },
    { key: 'path', title: '菜单路径' },
    {
      key: 'icon',
      title: '菜单图标',
      align: 'center',
      render: (row: RowData) => row.meta?.icon && renderIcon(row.meta.icon, { size: 18 })()
    },
    {
      key: 'operation',
      title: '操作',
      fixed: 'right',
      render: (row: RowData) =>
        h(NSpace, () => [
          h(
            NButton,
            { size: 'tiny', type: 'primary', secondary: true, 'on-click': () => showForm('编辑菜单', row) },
            () => '编辑'
          ),
          h(NButton, { size: 'tiny', type: 'error', secondary: true }, () => '删除')
        ])
    }
  ],
  data: [] as RowData[]
})

const initData = async () => {
  try {
    table.loading = true
    const { data } = await getMenus()
    table.data = data
  } finally {
    table.loading = false
  }
}

initData()

// 表单
const formRef = ref<FormInst>()
const form = reactive({
  show: false,
  loading: false,
  title: '',
  rules: {
    title: { required: true, message: '请输入菜单标题' },
    path: { required: true, message: '请输入菜单路径' },
    icon: { required: true, message: '请输入菜单图标' }
  },
  model: {} as FormModel
})
// 显示表单
const showForm = (title: string, row?: RowData) => {
  form.title = title
  form.model = {
    id: row?.id,
    title: row?.meta?.title || '',
    path: row?.path || '',
    icon: row?.meta?.icon || ''
  }
  form.show = true
}
// 提交表单
const message = useMessage()
const submitForm = async () => {
  try {
    await formRef.value?.validate()
    message.success('Valid')
  } catch {
    message.error('Invalid')
  }
}
</script>

<template>
  <n-card :bordered="false" size="small">
    <TablePro
      :columns="table.columns"
      :data="table.data"
      :row-key="table.rowKey"
      :loading="table.loading"
      @add="showForm('新增菜单')"
      @reload="initData"
    />

    <n-drawer v-model:show="form.show" width="420">
      <n-drawer-content :title="form.title" :native-scrollbar="false" closable>
        <n-form ref="formRef" :rules="form.rules">
          <n-form-item label="菜单标题" path="title">
            <n-input v-model:value="form.model.title" placeholder="请输入菜单标题"></n-input>
          </n-form-item>
          <n-form-item label="菜单路径" path="path">
            <n-input v-model:value="form.model.path" placeholder="请输入菜单路径"></n-input>
          </n-form-item>
          <n-form-item label="菜单图标" path="icon">
            <n-input v-model:value="form.model.icon" placeholder="请输入菜单图标"></n-input>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space>
            <n-button @click="form.show = false">取消</n-button>
            <n-button type="primary" @click="submitForm">确定</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>
