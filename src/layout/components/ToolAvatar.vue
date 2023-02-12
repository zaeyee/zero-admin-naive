<script setup lang="ts">
import { useDialog } from 'naive-ui'

import { renderIcon } from '@/utils/index'
import { useUserStore } from '@/stores/user'

const dialog = useDialog()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const profile = userStore.profile

const userOptions = reactive([
  { key: 'space', label: '个人中心', icon: renderIcon('ant-design:user-outlined') },
  { key: 'logout', label: '退出登录', icon: renderIcon('ant-design:logout-outlined') }
])

const onUserSelect = (key: string) => {
  switch (key) {
    case 'space':
      break
    // 退出登录
    case 'logout':
      dialog.warning({
        title: '温馨提示',
        content: '是否确定退出登录？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          userStore.logout()
          router.push('/login?redirect=' + route.fullPath)
        }
      })
      break
  }
}
</script>

<template>
  <n-dropdown :options="userOptions" @select="onUserSelect">
    <div z-clickable flex items-center px-1.6 py-1 rounded>
      <n-avatar :src="profile.avatar" size="small" round>
        <SvgIcon name="ant-design:user-outlined" />
      </n-avatar>
      <span class="m-l-1.6">{{ profile.nickname || profile.username }}</span>
    </div>
  </n-dropdown>
</template>
