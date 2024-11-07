<template>
  <div class="hello-world-container">
    <div class="flex items-center">
      <img src="@/assets/svg/vite.svg" alt="" class="w-[10vw] h-[10vw]">
      <i class="iconfont icon-plus text-[5vw]" :class="isDarkTheme ? 'text-white' : 'text-black'" />
      <img src="@/assets/svg/vue.svg" alt="" class="w-[10vw] h-[10vw]">
      <i class="iconfont icon-plus text-[5vw]" :class="isDarkTheme ? 'text-white' : 'text-black'" />
      <img src="@/assets/svg/pinia.svg" alt="" class="w-[10vw] h-[10vw]">
      <i class="iconfont icon-plus text-[5vw]" :class="isDarkTheme ? 'text-white' : 'text-black'" />
      <img src="@/assets/svg/tailwindcss.svg" alt="" class="w-[10vw] h-[10vw]">
      <i class="iconfont icon-plus text-[5vw]" :class="isDarkTheme ? 'text-white' : 'text-black'" />
      <img src="@/assets/svg/ts.svg" alt="" class="w-[10vw] h-[10vw]">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()

// 全局状态
const { isDarkTheme } = storeToRefs(layoutStore)
</script>
