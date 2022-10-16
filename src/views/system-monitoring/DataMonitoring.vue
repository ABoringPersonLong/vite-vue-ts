<template>
  <div class="data-monitoring-container h-full">
    <el-card class="flex justify-center items-center h-full" :class="isDarkTheme ? 'dark-scroll-bar' : 'light-scroll-bar'">
      图表
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()

// 全局状态
const { isDarkTheme } = storeToRefs(layoutStore)
</script>
