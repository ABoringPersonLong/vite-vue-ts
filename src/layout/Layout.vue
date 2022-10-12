<template>
  <div class="layout-container">
    <el-container>
      <!-- 左侧导航 -->
      <el-aside class="scroll-bar" :width="isCollapse ? '64px' : '200px'">
        <Sidebar />
      </el-aside>
      <!-- 主体内容 -->
      <el-main class="scroll-bar">
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
const { isCollapse } = storeToRefs(layoutStore)
</script>

<style lang="scss" scoped>
.layout-container {
  .el-container {
    height: 100%;

    // 左侧导航
    .el-aside {
      position: relative;
      background-color: #304156;
      box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
      transition: all .3s;
      z-index: 200;
    }

    // 主体内容
    .el-main {
      padding: 0;
      background-color: #eaedf1;
    }
  }
}
</style>
