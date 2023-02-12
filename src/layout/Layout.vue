<script setup lang="ts">
import PageLogo from './components/PageLogo.vue'
import PageMenu from './components/PageMenu.vue'
import PageHeader from './components/PageHeader.vue'

const collapsed = ref(false)
</script>

<template>
  <n-layout has-sider class="z-layout h-100vh">
    <n-layout-sider
      bordered
      show-trigger
      width="210"
      collapse-mode="width"
      :collapsed-width="64"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <PageLogo :collapsed="collapsed" />
      <PageMenu :collapsed="collapsed" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <PageHeader />
      </n-layout-header>
      <n-layout-content content-style="padding: 15px;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.z-layout {
  --header-height: 55px;
}
</style>
