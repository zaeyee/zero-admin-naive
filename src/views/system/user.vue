<script setup lang="ts">
import type { UserModel, UserRow } from '@/types/user'
import { DataTableColumns, FormInst, FormRules, NTag, NSpace, NButton } from 'naive-ui'
import { fetchUsers, createUser, updateUser, deleteUser } from '@/api/user'

const message = useMessage()
const dialog = useDialog()

const statuses = ['禁用', '正常']

const table = reactive({
  loading: false,
  rowKey: (row: UserRow) => row._id,
  columns: [
    { type: 'selection', width: 50 },
    { key: '_id', title: 'ID' },
    { key: 'username', title: '用户名' },
    {
      key: 'status',
      title: '状态',
      render: (row: UserRow) =>
        h(NTag, { size: 'small', type: row.status === 1 ? 'primary' : 'info' }, () => statuses[row.status])
    },
    {
      key: 'operation',
      title: '操作',
      width: 110,
      fixed: 'right',
      render: (row: UserRow) =>
        h(NSpace, () => [
          h(
            NButton,
            { size: 'tiny', type: 'primary', secondary: true, 'on-click': () => showForm('编辑用户', row) },
            () => '编辑'
          ),
          h(
            NButton,
            { size: 'tiny', type: 'error', secondary: true, 'on-click': () => deleteItem(row._id) },
            () => '删除'
          )
        ])
    }
  ] as DataTableColumns,
  data: [] as UserRow[],
  page: 1,
  pageSize: 10,
  total: 0
})
const loadUsers = async () => {
  try {
    table.loading = true
    const { list, total } = await fetchUsers(table.page, table.pageSize)
    table.data = list
    table.total = total
  } finally {
    table.loading = false
  }
}

loadUsers()

const formRef = ref<FormInst>()
const form = reactive({
  show: false,
  loading: false,
  title: '',
  rules: {
    username: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
    password: { required: true, message: '请输入密码', trigger: ['blur', 'input'] }
  } as FormRules,
  model: {} as UserModel
})
const showForm = async (title: string, row?: UserRow) => {
  form.title = title
  form.model = row?._id ? { ...row } : ({ status: 1 } as UserModel)
  form.show = true
}
const submitForm = async () => {
  try {
    form.loading = true
    await formRef.value?.validate()
    if (form.model._id) {
      await updateUser(form.model._id, form.model)
    } else {
      await createUser(form.model)
    }
    message.success(form.title + '成功')
    form.show = false
    loadUsers()
  } finally {
    form.loading = false
  }
}

const deleteItem = (_id?: string) => {
  if (!_id) return
  const d = dialog.warning({
    title: '温馨提示',
    content: '是否确定删除该项？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        d.loading = true
        await deleteUser(_id)
        message.success('删除成功')
        loadUsers()
      } catch (error) {
        d.loading = false
        message.error('删除失败')
      }
    }
  })
}
</script>

<template>
  <n-card :bordered="false" size="small">
    <TablePro
      v-model:page="table.page"
      v-model:page-size="table.pageSize"
      :item-count="table.total"
      :columns="table.columns"
      :data="table.data"
      :row-key="table.rowKey"
      :loading="table.loading"
      @add="showForm('新增用户')"
      @reload="loadUsers"
    />

    <n-drawer v-model:show="form.show" width="420px">
      <n-drawer-content :title="form.title" :native-scrollbar="false" closable>
        <n-spin :show="form.loading">
          <n-form ref="formRef" :model="form.model" :rules="form.rules">
            <n-form-item label="用户名" path="username">
              <n-input v-model:value="form.model.username" placeholder="请输入用户名" />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input v-model:value="form.model.password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item label="昵称" path="nickname">
              <n-input v-model:value="form.model.nickname" placeholder="请输入昵称" />
            </n-form-item>
            <n-form-item label="状态" path="status">
              <n-switch v-model:value="form.model.status" :checked-value="1" :unchecked-value="0">
                <template #checked>正常</template>
                <template #unchecked>禁用</template>
              </n-switch>
            </n-form-item>
          </n-form>
        </n-spin>
        <template #footer>
          <n-space>
            <n-button :disabled="form.loading" @click="form.show = false">取消</n-button>
            <n-button type="primary" :disabled="form.loading" @click="submitForm">确定</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>
