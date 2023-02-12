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
    <n-layout embedded>
      <n-layout-header class="flex justify-between items-center h-$header-height px-1.6 shadow-2xl">
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
