<script setup lang="ts">
import { FormInst, FormRules } from 'naive-ui'
import { useUserStore, LoginForm } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const redirect = computed(() => (route.query.redirect || '/') as string)
const formRef = ref<FormInst>()
const loading = ref(false)

const model = ref<LoginForm>({
  username: 'admin',
  password: '123456'
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

// 登录
const login = async () => {
  formRef.value?.validate(async errors => {
    if (errors) return
    try {
      loading.value = true
      await userStore.login(model.value)
      router.push(redirect.value)
    } finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div fixed w-full h-full flex justify-center items-center>
    <div w-210 flex shadow-2xl rounded>
      <div w-115 flex-none bg-blue p-16>
        <img src="@/assets/bg_login.png" />
      </div>
      <n-spin :show="loading" class="flex-1 p-8 b-t-4">
        <div text-3xl>登录</div>
        <n-form ref="formRef" :model="model" :rules="rules" class="mt-12">
          <n-form-item path="username" label="用户名">
            <n-input v-model:value="model.username" size="large" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input v-model:value="model.password" size="large" placeholder="请输入密码" type="password" />
          </n-form-item>
          <n-button type="primary" size="large" block class="mt-4!" @click="login">登录</n-button>
        </n-form>
      </n-spin>
    </div>
  </div>
</template>
