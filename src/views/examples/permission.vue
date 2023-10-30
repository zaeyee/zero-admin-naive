<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useAuth } from '@/composables/useAuth'

const userStore = useUserStore()

const changeRole = (role: string) => {
  userStore.roles = [role]
}

const checkAuth = (value: string | string[], every?: boolean) => {
  const auth = useAuth(value, every)
  if (auth) {
    window.$message.success('检测通过')
  } else {
    window.$message.error('检测不通过')
  }
}
</script>

<template>
  <n-card :bordered="false" size="small">
    <div class="text-lg mb-2">当前角色</div>
    <n-radio-group v-model:value="userStore.profile.username" @update-value="changeRole">
      <n-radio-button label="admin" value="admin" />
      <n-radio-button label="editor" value="editor" />
    </n-radio-group>

    <div class="text-lg mb-2 mt-4">当前角色</div>
    <div class="space-x-2">
      <n-tag v-for="item in userStore.roles" :key="item" type="primary" round>{{ item }}</n-tag>
    </div>

    <div class="text-lg mb-2 mt-4">鉴权指令（请对照代码查看）</div>
    <div class="space-x-2">
      <n-tag v-auth="'admin'" type="primary">你有 admin 角色</n-tag>
      <n-tag v-auth="'editor'" type="primary">你有 editor 角色</n-tag>
      <n-tag v-auth="['admin', 'editor']" type="primary">你有 admin 或 editor 角色</n-tag>
      <n-tag v-auth.every="['admin', 'editor']" type="primary">你同时有 admin 和 editor 角色</n-tag>
    </div>

    <div class="text-lg mb-2 mt-4">鉴权函数（请对照代码查看）</div>
    <div>
      <n-button-group>
        <n-button @click="checkAuth('admin')">检测 admin 角色</n-button>
        <n-button @click="checkAuth('editor')">检测 editor 角色</n-button>
      </n-button-group>
    </div>
    <div class="mt-2">
      <n-button-group>
        <n-button @click="checkAuth(['admin', 'editor'])">检测 admin 或 editor 角色</n-button>
        <n-button @click="checkAuth(['admin', 'editor'], true)">检测 admin 和 editor 角色</n-button>
      </n-button-group>
    </div>
  </n-card>
</template>
