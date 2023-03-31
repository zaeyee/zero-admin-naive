<script setup lang="ts">
import { icon } from '@/utils/index'
import { useUserStore } from '@/stores/user'

const dialog = useDialog()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const profile = userStore.profile

const dropdownOptions = reactive([
  { key: 'space', label: '个人中心', icon: icon('ant-design:user-outlined') },
  { key: 'logout', label: '退出登录', icon: icon('ant-design:logout-outlined') }
])

const dropdownSelect = (key: string) => {
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
  <n-dropdown :options="dropdownOptions" @select="dropdownSelect">
    <div z-clickable flex items-center px-1.6 py-1 rounded>
      <n-avatar :src="profile.avatarUrl" size="small" round>
        <SvgIcon v-if="!profile.avatarUrl" name="ant-design:user-outlined" />
      </n-avatar>
      <span class="m-l-1.6">{{ profile.nickname || profile.username }}</span>
    </div>
  </n-dropdown>
</template>
