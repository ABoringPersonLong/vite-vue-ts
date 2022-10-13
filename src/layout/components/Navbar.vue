<template>
  <div class="navbar-container relative flex justify-between items-center px-[13px] h-[50px] z-10 bg-[#21252b] shadow-[0_1px_3px_rgb(0,0,0,0.4)]">
    <!-- 左侧 -->
    <div class="left flex items-center">
      <i class="iconfont mr-4 text-2xl cursor-pointer" :class="[isCollapse ? 'icon-indent' : 'icon-outdent']" @click="isCollapse = !isCollapse" />
      <Breadcrumb />
    </div>
    <!-- 右侧 -->
    <div class="right">
      <img src="@/assets/images/badminton300.png" alt="" class="rounded-[15px] w-[30px]">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '@/store/layout'
import Breadcrumb from './Breadcrumb.vue'

const layoutStore = useLayoutStore()
const { isCollapse } = storeToRefs(layoutStore)
</script>
