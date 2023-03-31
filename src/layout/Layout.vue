<script setup lang="ts">
import PageLogo from './components/PageLogo.vue'
import PageMenu from './components/PageMenu.vue'
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import ToolRefresh from './components/ToolRefresh.vue'
import ToolFullscreen from './components/ToolFullscreen.vue'
import ToolAvatar from './components/ToolAvatar.vue'

const collapsed = ref(false)
const headerFixed = ref(true)
const isRouterAlive = ref(true)

// 重新加载当前页面
const reload = () => {
  window.$loadingBar.start()
  setTimeout(() => {
    window.$loadingBar.finish()
  }, 300)
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
</script>

<template>
  <n-layout has-sider class="z-layout h-100vh">
    <n-layout-sider
      v-model:collapsed="collapsed"
      :width="210"
      :collapsed-width="64"
      collapse-mode="width"
      show-trigger
      class="shadow-lg z-2!"
    >
      <PageLogo :collapsed="collapsed" />
      <PageMenu :collapsed="collapsed" />
    </n-layout-sider>
    <n-layout :content-style="headerFixed ? 'display: flex; flex-direction: column;' : ''">
      <n-layout-header
        class="relative z-1 flex justify-between items-center h-$z-header-height px-1.6 shadow-sm"
        :class="{ 'flex-none': headerFixed }"
      >
        <div flex items-center>
          <Hamburger v-model="collapsed" />
          <Breadcrumb />
        </div>
        <div flex items-center>
          <ToolRefresh @click="reload" />
          <ToolAvatar />
          <ToolFullscreen />
        </div>
      </n-layout-header>
      <n-layout-content embedded content-style="padding: 12px; background: #f5f7f9">
        <router-view v-if="isRouterAlive" />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.z-layout {
  --z-header-height: 55px;
}
</style>
