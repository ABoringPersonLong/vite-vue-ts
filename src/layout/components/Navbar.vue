<template>
  <div
    class="navbar-container relative flex justify-between items-center px-[13px] h-[50px] z-10 shadow-[0_2px_6px_rgb(0,0,0,0.4)] transition-all duration-300"
    :class="[isDarkTheme ? 'bg-[#21252b]' : 'bg-[#fff]']"
  >
    <!-- 左侧 -->
    <div class="left flex items-center">
      <i class="iconfont mr-4 text-2xl cursor-pointer" :class="[isCollapse ? 'icon-indent' : 'icon-outdent']" @click="isCollapse = !isCollapse" />
      <Breadcrumb />
    </div>
    <!-- 右侧 -->
    <div class="right flex items-center">
      <el-switch
        v-model="isDark"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        inline-prompt
        :style="{
          '--el-switch-on-color': '#2c2c2c',
          '--el-switch-off-color': '#f2f2f2',
          '--el-switch-border-color': isDarkTheme ? '#4c4d4f' : '#dcdfe6'
        }"
        class="mr-3"
        @change="handleChange"
      />
      <el-dropdown>
        <span class="el-dropdown-link flex items-center cursor-pointer">
          <img src="@/assets/images/badminton300.png" alt="" class="rounded-[15px] mr-2 w-[30px]">
          <span>LongYuhuan</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark } from '@vueuse/core'
import { useLayoutStore } from '@/store/layout'
import Breadcrumb from './Breadcrumb.vue'

const layoutStore = useLayoutStore()
const isDark = useDark()

// 全局状态
const { isCollapse, isDarkTheme, backgroundColor, color, daisyUITheme } = storeToRefs(layoutStore)

// 响应式状态
const elSwitchInnerColor = ref(isDarkTheme.value ? '#000' : '#fff') // 开关里面的圆点颜色
const elSwitchInnerIsShowColor = ref(isDarkTheme.value ? '#fff' : '#000') // 开关里面的图标颜色

// 处理函数
const handleChange = (val: boolean) => { // 处理切换主题开关改变
  if (val) {
    isDarkTheme.value = true
    elSwitchInnerColor.value = '#000'
    elSwitchInnerIsShowColor.value = '#fff'
  } else {
    isDarkTheme.value = false
    elSwitchInnerColor.value = '#fff'
    elSwitchInnerIsShowColor.value = '#000'
  }
  document.body.style.backgroundColor = backgroundColor.value
  document.body.style.color = color.value
  document.documentElement.dataset.theme = daisyUITheme.value
}
</script>

<style lang="scss" scoped>
.navbar-container {
  // 开关里面的圆点
  :deep(.el-switch__action) {
    display: none;
  }

  // 开关里面的图标
  :deep(.el-switch__inner) {
    border-radius: 50%;
    background-color: v-bind(elSwitchInnerColor);

    .is-show {
      color: v-bind(elSwitchInnerIsShowColor);
    }
  }
}
</style>
