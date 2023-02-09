<script setup lang="ts">
interface LoginModel {
  username: string
  password: string
}

const loginModel: LoginModel = {
  username: '',
  password: ''
}
</script>

<template>
  <div fixed w-full h-full flex justify-center items-center>
    <div class="w-240" flex shadow-2xl rounded>
      <div class="w-60%" flex-none bg-blue p-16>
        <img src="@/assets/bg_login.png" />
      </div>
      <div flex-1 p-8>
        <div text-3xl>登录</div>
        <n-form :model="loginModel">
          <n-form-item>
            <n-input v-model:value="loginModel.username" size="large" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item>
            <n-input v-model:value="loginModel.password" size="large" placeholder="请输入密码" type="password" />
          </n-form-item>
          <n-button type="primary" attr-type="submit" size="large" block>登录</n-button>
        </n-form>
      </div>
    </div>
  </div>
</template>
