<script setup lang="ts">
import PageLogo from './components/PageLogo.vue'
import PageMenu from './components/PageMenu.vue'
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import ToolRefresh from './components/ToolRefresh.vue'
import ToolFullscreen from './components/ToolFullscreen.vue'
import ToolAvatar from './components/ToolAvatar.vue'
import ToolSetting from './components/ToolSetting.vue'

const collapsed = ref(false)
const headerFixed = ref(true)
</script>

<template>
  <n-layout has-sider class="z-layout h-100vh">
    <n-layout-sider
      show-trigger
      width="210"
      collapse-mode="width"
      class="shadow-lg z-2!"
      :collapsed-width="64"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <PageLogo :collapsed="collapsed" />
      <PageMenu :collapsed="collapsed" />
    </n-layout-sider>
    <n-layout :content-style="headerFixed && 'display: flex; flex-direction: column;'">
      <n-layout-header
        class="relative z-1 flex justify-between items-center h-$z-header-height px-1.6 shadow-sm"
        :class="{ 'flex-none': headerFixed }"
      >
        <div flex items-center>
          <Hamburger v-model="collapsed" />
          <Breadcrumb />
        </div>
        <div flex items-center>
          <ToolRefresh />
          <ToolFullscreen />
          <ToolAvatar />
          <ToolSetting />
        </div>
      </n-layout-header>
      <n-layout-content embedded content-style="padding: 12px; background: #f5f7f9">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.z-layout {
  --z-header-height: 55px;
}
</style>
