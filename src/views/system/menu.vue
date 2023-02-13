<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

import { renderIcon } from '@/utils/index'

interface RowData {
  id: string | number
  title: string
  path: string
  icon?: string
  children?: RowData[]
}

const router = useRouter()

// 表格
const table = reactive({
  loading: false,
  rowKey: (row: RowData) => row.id,
  columns: [
    { type: 'selection', width: 50 },
    { key: 'title', title: '菜单标题' },
    { key: 'path', title: '菜单路径' },
    {
      key: 'icon',
      title: '菜单图标',
      align: 'center',
      render: (rowData: RowData) => rowData.icon && renderIcon(rowData.icon, { size: 18 })()
    },
    { key: 'operation', title: '操作', fixed: 'right' }
  ],
  data: [] as RowData[]
})

const getMenus: (routes: RouteRecordRaw[]) => RowData[] = routes => {
  return routes.map(item => ({
    id: item.path,
    title: item.meta?.title as string,
    path: item.path,
    icon: item.meta?.icon as string,
    children: item.children?.length ? getMenus(item.children) : undefined
  }))
}

const initData = async () => {
  table.data = getMenus(router.getRoutes().filter(item => item.children?.length))
}

initData()

// 表单
const form = reactive({
  ref: {},
  show: false,
  loading: false,
  title: '',
  items: [{ prop: 'name', label: '角色名称', type: 'input', attrs: { placeholder: '请输入角色名称' } }],
  rules: {
    name: { required: true, message: '请输入角色名称' }
  },
  model: {},
  errors: {}
})
// 打开表单抽屉
const openDrawer = (title: string, row = {}) => {
  form.title = title
  form.model = { ...row }
  form.errors = {}
  form.show = true
}
</script>

<template>
  <n-card :bordered="false" size="small">
    <TablePro
      :columns="table.columns"
      :data="table.data"
      :row-key="table.rowKey"
      @add="openDrawer('新增菜单')"
      @reload="initData"
    />

    <n-drawer v-model:show="form.show">
      <n-drawer-content :title="form.title" :native-scrollbar="false"> </n-drawer-content>
    </n-drawer>
  </n-card>
</template>
