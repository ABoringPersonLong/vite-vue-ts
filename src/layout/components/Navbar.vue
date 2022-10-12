<template>
  <div class="navbar-container">
    <!-- 左侧 -->
    <div class="left">
      <i :class="['iconfont', isCollapse ? 'icon-indent' : 'icon-outdent']" @click="isCollapse = !isCollapse" />
      <Breadcrumb />
    </div>
    <!-- 右侧 -->
    <div class="right">
      <img src="@/assets/images/badminton300.png" alt="">
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

<style lang="scss" scoped>
.navbar-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  height: 50px;
  z-index: 100;

  // 左侧
  .left {
    display: flex;
    align-items: center;

    i {
      margin-right: 20px;
      font-size: 24px;
      cursor: pointer;
    }
  }

  .right {
    img {
      border-radius: 15px;
      width: 30px;
    }
  }
}
</style>
