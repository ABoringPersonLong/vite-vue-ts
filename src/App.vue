<template>
  <div class="app-container h-full">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'

const layoutStore = useLayoutStore()

// 全局状态
const { isDarkTheme, backgroundColor, color, daisyUITheme } = storeToRefs(layoutStore)

// 生命周期函数
onBeforeMount(() => {
  // 判断并设置主题
  isDarkTheme.value = localStorage.getItem('vueuse-color-scheme') === 'auto'
  document.body.style.backgroundColor = backgroundColor.value
  document.body.style.color = color.value
  document.documentElement.dataset.theme = daisyUITheme.value
})
</script>
