<template>
  <div class="layout-container h-full">
    <el-container class="h-full">
      <!-- 左侧导航 -->
      <el-aside
        class="relative shadow-[2px_0_6px_rgb(0,0,0,0.4)] transition-all duration-300 z-20"
        :class="[isDarkTheme ? 'dark-scroll-bar' : 'light-scroll-bar', isDarkTheme ? 'bg-[#21252b]' : '']"
        :width="isCollapse ? '64px' : '220px'"
      >
        <Sidebar />
      </el-aside>
      <!-- 主体内容 -->
      <el-main class="p-0 overflow-hidden">
        <Navbar />
        <AppMain />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'

const layoutStore = useLayoutStore()

// 全局状态
const { isCollapse, isDarkTheme } = storeToRefs(layoutStore)
</script>
