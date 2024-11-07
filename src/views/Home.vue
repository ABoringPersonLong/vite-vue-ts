<template>
  <div class="home-container h-full">
    <el-card class="flex justify-center items-center h-full" :class="isDarkTheme ? 'dark-scroll-bar' : 'light-scroll-bar'">
      <HelloWorld />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'
import HelloWorld from '@/components/HelloWorld.vue'

const layoutStore = useLayoutStore()

// 全局状态
const { isDarkTheme } = storeToRefs(layoutStore)
</script>
